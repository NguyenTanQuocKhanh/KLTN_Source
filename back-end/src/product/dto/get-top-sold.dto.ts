import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class GetTopSoldDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'Categories not exists',
  })
  categoriesId: number;
}
