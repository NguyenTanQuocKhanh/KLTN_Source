import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class BrandCategoriesDto {
  @ApiProperty()
  @IsOptional()
  bannerIds?: number[];

  @ApiProperty()
  @IsOptional()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'Categories not exists',
  })
  categoriesId?: number;
}
