import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ORDER_TYPE } from 'src/orders/orders.constant';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class PaymentTierModelDto {
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
  @ApiProperty({
    required: true,
    example: 21,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId: number;

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
  quantity: number;

  @ApiProperty({
    required: true,
    example: 24990000,
  })
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;

  @ApiProperty({
    example: 26,
  })
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: PaymentTierModelDto,
    isArray: true,
  })
  @IsOptional()
  tierModels: PaymentTierModelDto[];
}

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    example: 18490000,
  })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  userId: string;

  @ApiProperty({
    type: ProductDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  products: ProductDto[];

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Address', 'id'], {
    message: 'Address not exists',
  })
  address: number;

  status: ORDER_TYPE;

  paymentMethod: string;

  createdBy: string;
}
