import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddProductRequestDto } from './dto/add-product-request.dto';
import { DeleteProductRequestDto } from './dto/delete-product-request.dto';
import { UpdateQuantityRequestDto } from './dto/update-quantity-request.dto';

@ApiTags('Carts')
@Controller({
  path: 'carts',
  version: '1',
})
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addProduct(
    @Request() request,
    @Body() addProductRequestDto: AddProductRequestDto,
  ): Promise<unknown> {
    addProductRequestDto.userId = request.user.id;
    return await this.cartService.addProduct(addProductRequestDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('update-quantity')
  async updateQuantity(
    @Request() request,
    @Body() updateQuantityRequestDto: UpdateQuantityRequestDto,
  ): Promise<unknown> {
    updateQuantityRequestDto.userId = request.user.id;
    return await this.cartService.updateQuantity(updateQuantityRequestDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('delete-product')
  async deleteProduct(
    @Request() request,
    @Body() deleteProductRequestDto: DeleteProductRequestDto,
  ): Promise<unknown> {
    deleteProductRequestDto.userId = request.user.id;
    return await this.cartService.deleteProduct(deleteProductRequestDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('me')
  async getCart(@Request() request): Promise<unknown> {
    return await this.cartService.getCart(request.user.id);
  }
}
