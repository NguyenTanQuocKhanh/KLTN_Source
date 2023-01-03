import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { castArray, get, pick, set, unset } from 'lodash';
import { TierModelService } from 'src/tier-model/tier-model.service';
import { Repository } from 'typeorm';
import { AddProductRequestDto } from './dto/add-product-request.dto';
import { DeleteProductRequestDto } from './dto/delete-product-request.dto';
import { UpdateQuantityRequestDto } from './dto/update-quantity-request.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private tierModelService: TierModelService,
  ) {}

  async getCart(userId: number) {
    const cart = await this.cartRepository.find({
      where: {
        userId,
      },
    });
    const promises = cart?.map(async (el) => {
      const tierModels = castArray(get(el, 'product.tierModel'));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newTierModels = tierModels.map(async (tier: any) => {
        const tierModel = await this.tierModelService.findOne({
          id: tier.id,
        });
        console.log('tierModel', tierModel);
        const models = castArray(get(tierModel, 'models', [])).map((el) =>
          pick(el, ['id', 'name']),
        );
        set(tier, 'models', models);
        console.log('tier', tier);
        return tier;
      });
      set(el, 'product.tierModel', await Promise.all(newTierModels));
      unset(el, 'product.cartId');
      return el;
    });
    return await Promise.all(promises);
  }

  async addProduct(
    addProductRequestDto: AddProductRequestDto,
  ): Promise<unknown> {
    const { userId, product, tierModel } = addProductRequestDto;
    const tierModelIds = tierModel.map((tier) => ({
      id: tier.id,
      modelId: tier.currentModel.id,
    }));
    const cartId = this.genCartId(userId, product.id, tierModelIds);
    const existedCart = await this.findCart(userId, cartId);
    if (existedCart) {
      return await this.updateQuantity({
        userId,
        productId: product.id,
        tierModels: tierModelIds,
        quantity: +product.quantity + +get(existedCart, 'product.quantity'),
      });
    }
    const dataToSave = {
      userId,
      product: {
        ...product,
        cartId,
        tierModel: tierModel,
      },
    };
    return await this.cartRepository.save(
      this.cartRepository.create(dataToSave),
    );
  }

  async updateQuantity(
    updateQuantityRequestDto: UpdateQuantityRequestDto,
    cartId?: string,
  ): Promise<unknown> {
    const { userId, productId, tierModels, quantity } =
      updateQuantityRequestDto;
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (quantity === 0) {
      // delete product on cart
    }
    let generatedCardId = cartId;
    if (!generatedCardId) {
      generatedCardId = this.genCartId(
        userId,
        productId,
        tierModels as Record<string, unknown>[],
      );
    }

    await this.cartRepository
      .createQueryBuilder('cart')
      .update(Cart)
      .where({
        userId,
      })
      .set({
        product: () => `jsonb_set(product::jsonb, '{quantity}', '${quantity}')`,
      })
      .andWhere(`cart.product ->> 'cartId' =:cartId`, {
        cartId: generatedCardId,
      })
      .execute();
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where(`cart.product ->> 'cartId' =:cartId`, {
        cartId: generatedCardId,
      })
      .getOne();
  }

  async deleteProduct(dto: DeleteProductRequestDto) {
    const { userId, products } = dto;
    if (!products) {
      const { affected } = await this.cartRepository
        .createQueryBuilder('cart')
        .delete()
        .from(Cart)
        .where({
          userId,
        })
        .execute();
      return { deletedTotal: affected };
    }
    const deletedProductPromise = products?.map((product) => {
      const { productId, tierModels } = product;
      const cartId = this.genCartId(
        userId,
        productId,
        tierModels as Record<string, unknown>[],
      );
      return this.cartRepository
        .createQueryBuilder('cart')
        .delete()
        .from(Cart)
        .where({
          userId,
        })
        .andWhere(`cart.product ->> 'cartId' =:cartId`, {
          cartId,
        })
        .execute();
    });

    const [{ affected }] = await Promise.all(deletedProductPromise);
    return { deletedTotal: affected };
  }

  findCart(userId: number, cartId: string) {
    return this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where({
        userId,
      })
      .andWhere(`cart.product ->> 'cartId' =:cartId`, {
        cartId,
      })
      .getOne();
  }

  genCartId(
    userId: number,
    productId: number,
    tierModel: Record<string, unknown>[],
  ): string {
    const tierModelIds = tierModel.map(
      (tier) => `${get(tier, 'id', get(tier, 'tierModelId'))},${tier.modelId}`,
    );
    return tierModelIds
      .concat([`${productId}`, `${userId}`])
      .sort()
      .join(',');
  }
}
