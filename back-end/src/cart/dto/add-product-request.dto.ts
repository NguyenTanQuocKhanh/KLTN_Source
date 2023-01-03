import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

class ModelRequestDto {
  @ApiProperty({
    required: true,
    example: '418f79b5-9c62-45ff-933a-08c0d3e17cb9',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Pink',
  })
  @IsNotEmpty()
  name: string;
}

class TierModelRequestDto {
  @ApiProperty({
    required: true,
    example: 'd6c5f97a-77e8-48db-9a64-cc3134febcb7',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    example: 'Màu sắc',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: ModelRequestDto,
  })
  @IsNotEmpty()
  currentModel: ModelRequestDto;

  models: Record<string, unknown>;
}

class ProductRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @Validate(IsExist, ['product', 'id'], {
    message: 'Product not exists',
  })
  id: number;

  @ApiProperty({
    required: true,
    example: 'Apple iPhone 13 128GB',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example:
      'localhost:3000/api/v1/files/23ac18ad-57d8-4960-a021-c2d80fc256f5.jpeg',
  })
  @IsNotEmpty()
  imagePath: string;

  @ApiProperty({
    required: true,
    example: 120000,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
    example: 150000,
  })
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;

  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class AddProductRequestDto {
  userId: number;

  @ApiProperty({
    required: true,
    type: ProductRequestDto,
  })
  @IsNotEmpty()
  product: ProductRequestDto;

  @ApiProperty({
    type: TierModelRequestDto,
    isArray: true,
  })
  @IsOptional()
  tierModel?: TierModelRequestDto[];
}
