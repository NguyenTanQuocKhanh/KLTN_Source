import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class FilterReviewDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['User', 'id'], {
    message: 'userNotExists',
  })
  userId?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['Product', 'id'], {
    message: 'Product not exists',
  })
  productId?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating: number | null;

  @ApiProperty({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: number | null;

  product: Record<string, unknown>;

  user: Record<string, unknown>;
}
