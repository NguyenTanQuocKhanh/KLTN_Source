import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { Categories } from 'src/categories/entity/categories.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsNotExistSub } from 'src/utils/validators/is-not-exsist-sub.validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Brand'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  @Validate(IsNotExistSub, ['Brand', 'id'], {
    message: 'This logo is already use for another brand',
  })
  logo: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  @Validate(IsNotExistSub, ['Brand', 'id'], {
    message: 'This image is already use for another brand',
  })
  image: string;

  @ApiProperty()
  @IsOptional()
  // @Validate(IsExist, ['Categories', 'id'], {
  //   message: 'Image not exists',
  // })
  categories: Categories[] | number[];

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty({
    example: 'ID of status',
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
