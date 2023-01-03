import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class SearchingReviewDto {
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

  product: Record<string, unknown>;
}
