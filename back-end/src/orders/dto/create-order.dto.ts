import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { OrderProducts } from '../entity/order-products.entity';
import { ORDER_TYPE } from '../orders.constant';

export class OrderTierModelDto {
  @ApiProperty({
    example: '418f79b5-9c62-45ff-933a-08c0d3e17cb9',
  })
  @IsOptional()
  @IsString()
  tierModelId: string;

  @ApiProperty({
    required: true,
    example: 'Màu sắc',
  })
  @IsNotEmpty()
  tierModelName: string;

  @ApiProperty({
    example: '418f79b5-9c62-45ff-933a-08c0d3e17cb9',
  })
  @IsOptional()
  @IsString()
  modelId: string;

  @ApiProperty({
    required: true,
    example: 'Pink',
  })
  @IsOptional()
  modelName: string;
}

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    example: 'Apple iPhone 13 128GB',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: true,
    example:
      'localhost:3000/api/v1/files/23ac18ad-57d8-4960-a021-c2d80fc256f5.jpeg',
  })
  @IsNotEmpty()
  imagePath: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: OrderTierModelDto,
    isArray: true,
  })
  @IsOptional()
  tierModels: OrderTierModelDto[];
}
export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    type: [ProductDto],
  })
  @IsNotEmpty()
  @IsArray()
  products: ProductDto[] | OrderProducts[];

  userId: string;

  @ApiProperty()
  @IsOptional()
  address: number;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: string;

  status: ORDER_TYPE;

  createdBy: string;
}
