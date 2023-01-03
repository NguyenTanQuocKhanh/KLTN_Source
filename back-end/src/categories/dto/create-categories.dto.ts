import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import {
  IsNotEmpty,
  Validate,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Banner } from 'src/banner/entities/banner.entity';

export class CreateCategoriesDto {
  @ApiProperty({
    required: true,
    example: 'Iphone',
  })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Categories'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'ID of file',
    example: 'a62cf20f-abe3-4de6-b486-1fd3982c52e9',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  logo: string;

  @ApiProperty({ type: Array<number>, example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  banners: Banner[] | number[];

  @ApiProperty({
    description: 'ID of status',
    example: 1,
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
