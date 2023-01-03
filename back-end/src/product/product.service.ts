import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { get, set } from 'lodash';
import { FilesService } from 'src/files/files.service';
import { CreateModelDto } from 'src/model/dto/create-model.dto';
import { Model } from 'src/model/entities/model.entity';
import { ModelService } from 'src/model/model.service';
import { BaseService } from 'src/shared/services/base.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { TierModelService } from 'src/tier-model/tier-model.service';
import { UsersService } from 'src/users/users.service';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './entity/product.entity';
import { OrderTierModelDto } from 'src/orders/dto/create-order.dto';
import { OrderProducts } from 'src/orders/entity/order-products.entity';
import { GetTopSoldDto } from './dto/get-top-sold.dto';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(OrderProducts)
    private orderProduct: Repository<OrderProducts>,
    private modelService: ModelService,
    private tierModelService: TierModelService,
    private fileService: FilesService,
    private userService: UsersService,
  ) {
    super(productRepository, 'product');
  }

  async create(data: CreateProductDto): Promise<Product> {
    // create tier-model
    const { tierModels } = data;
    const status = {
      id: StatusEnum.active,
      name: 'Active',
    };
    // console.log('tierModels', tierModels);
    const tierModelsPromise = tierModels.map(async (tier) => {
      let tierModelEntity = new TierModel();
      tierModelEntity.name = tier.tierModel as string;
      tierModelEntity.status = status;

      try {
        const newTierModel = await this.tierModelService.create(
          tierModelEntity,
        );
        tierModelEntity = newTierModel;
      } catch (err) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: 'Create tier-model record failed!',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // create model
      const modelPromises: Promise<Model>[] = tier.models?.map(
        (modelDto: CreateModelDto) => {
          const model = {
            ...modelDto,
            price:
              modelDto.priceBeforeDiscount -
              Math.floor((modelDto.priceBeforeDiscount * data.discount) / 100),
            status,
          };
          return this.modelService.create(model);
        },
      );

      try {
        tierModelEntity.models = await Promise.all(modelPromises);
      } catch (err) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: 'Create model record failed!',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.tierModelService.create(tierModelEntity);
    });

    data.tierModels = await Promise.all(tierModelsPromise);
    // find images
    await Promise.all(
      data.images?.map((id) => {
        return this.fileService.findOne({ id });
      }),
    ).then((res) => {
      data.images = res;
    });
    return super.create(data);
  }

  async getOne(productId: number, userId: number): Promise<ProductResponseDto> {
    console.log('userId', userId);
    //* get product
    const product = await super.findOne({ id: productId });

    const viewCount = Number(product.viewCount) + 1;
    await this.productRepository.update(productId, {
      viewCount: viewCount,
    });

    return plainToClass(
      ProductResponseDto,
      { ...product, viewCount },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async searchHint(keyword: string): Promise<string[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.keywords ::text ILIKE ANY (ARRAY[:keyword::text])', {
        keyword: `%${keyword}%`,
      })
      .andWhere({ status: StatusEnum.active })
      .select('product.keywords')
      .getMany();
    if (!products) {
      return [];
    }
    let keywords: string[] = [];
    products.forEach((product) => {
      if (keywords.length === 10) return;
      keywords = [...new Set(keywords.concat(product.keywords))];
    });

    return keywords;
  }

  async searching(
    searchProductDto: SearchProductDto,
    paginationOptions: IPaginationOptions,
    fields?: string,
    wheres?: FindOptionsWhere<Product>,
    orders?: FindOptionsOrder<Product>,
    likes?: string[],
    isAdmin?: boolean,
  ) {
    const selects = [];
    if (fields) {
      fields.split(',').forEach((el) => {
        if (el) {
          selects.push(el);
        }
      });
      selects.push('id');
    }
    if (likes) {
      likes.forEach((el: string) => {
        if (wheres[el]) {
          wheres[el] = ILike(`%${wheres[el]}%`);
        }
      });
    }
    if (searchProductDto.categories) {
      set(wheres, 'categories', { id: searchProductDto.categories });
    }
    if (searchProductDto.brand) {
      set(wheres, 'brand', { id: searchProductDto.brand });
    }
    if (searchProductDto.fromPrice && searchProductDto.toPrice) {
      wheres.price = Between(
        searchProductDto.fromPrice,
        searchProductDto.toPrice,
      );
    }
    if (searchProductDto.keyword) {
      wheres.name = ILike(`%${searchProductDto.keyword}%`);
    }
    if (!isAdmin) {
      wheres.status = {
        id: 1,
      };
    }
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        select: selects,
        where: wheres,
        order: orders,
        cache: true,
        loadEagerRelations: false,
        relations: ['image', 'status'],
      }),
      totalPages,
      paginationOptions,
    );
  }

  async like(userId: number, productId: number) {
    const user = await this.userService.findOne({ id: userId });
    const product = await super.findOne({ id: productId }, ['likedUsers']);
    if (!product.likedUsers) {
      product.likedUsers = [];
    }
    if (product.likedUsers.find((user) => user.id === userId)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: `You already like this product with id = ${productId}!`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    product.likedUsers = [...product.likedUsers, user];
    product.likedCount += 1;
    await this.productRepository.save(product);
    return true;
  }

  async unlike(userId: number, productId: number) {
    const user = await this.userService.findOne({ id: userId });
    const product = await super.findOne({ id: productId }, ['likedUsers']);
    if (!product.likedUsers) {
      product.likedUsers = [];
    }
    if (!product.likedUsers.find((likeUser) => likeUser.id === user.id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            message: `You haven't liked this product with id = ${productId} yet!`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    product.likedUsers = product.likedUsers.filter(
      (likeUser) => likeUser.id !== user.id,
    );
    product.likedCount -= 1;
    await this.productRepository.save(product);
    return true;
  }

  async purchaseProduct(
    productId: number,
    quantity: number,
    tierModels: OrderTierModelDto[],
  ): Promise<void> {
    try {
      const product = await super.findOne({ id: productId });
      if (product.stock - quantity < 0) {
        throw new BadRequestException('Product sold out');
      }
      await this.productRepository.update(
        {
          id: productId,
        },
        {
          sold: () => `sold + ${quantity}`,
          stock: () => `stock - ${quantity}`,
        },
      );
      await this.tierModelService.purchaseProduct(quantity, tierModels);
    } catch (error) {}
  }

  async changeStatus(id: number): Promise<boolean> {
    const product = await super.findOne({ id });
    const newStatus = get(product, 'status.id') === 2 ? 1 : 2;
    const { affected } = await this.productRepository.update(
      {
        id,
      },
      {
        status: newStatus,
      },
    );
    return affected === 1 ? true : false;
  }

  async getTopSearch(paginationOptions: IPaginationOptions) {
    const wheres = {
      status: {
        id: 1,
      },
    };
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        where: wheres,
        select: [
          'id',
          'name',
          'price',
          'priceBeforeDiscount',
          'discount',
          'image',
          'viewCount',
          'sold',
          'params',
        ],
        order: {
          viewCount: 'DESC',
        },
        cache: true,
        loadEagerRelations: false,
        relations: ['image'],
      }),
      totalPages,
      paginationOptions,
    );
  }

  async getHintToday(paginationOptions: IPaginationOptions) {
    const wheres: Record<string, unknown> = {
      status: {
        id: 1,
      },
    };
    const recentlyOrderedProduct = await this.orderProduct.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    try {
      const product = await super.findOne({
        id: get(recentlyOrderedProduct, '[0].productId'),
      });
      const keywords = product.keywords;
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      wheres.name = ILike(`%${keyword}%`);
    } catch (error) {}
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        where: wheres,
        select: [
          'id',
          'name',
          'price',
          'priceBeforeDiscount',
          'discount',
          'image',
          'viewCount',
          'sold',
          'params',
        ],
        order: {
          viewCount: 'DESC',
        },
        cache: true,
        loadEagerRelations: false,
        relations: ['image'],
      }),
      totalPages,
      paginationOptions,
    );
  }

  async getTopSold(
    paginationOptions: IPaginationOptions,
    getTopSoldDto: GetTopSoldDto,
  ) {
    const { categoriesId } = getTopSoldDto;
    const wheres: Record<string, unknown> = {
      status: {
        id: 1,
      },
      categories: {
        id: categoriesId,
      },
    };
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        where: wheres,
        select: [
          'id',
          'name',
          'price',
          'priceBeforeDiscount',
          'discount',
          'image',
          'viewCount',
          'sold',
          'params',
        ],
        order: {
          sold: 'DESC',
        },
        cache: true,
        loadEagerRelations: false,
        relations: ['image'],
      }),
      totalPages,
      paginationOptions,
    );
  }
}
