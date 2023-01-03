import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from './../../utils/validators/is-not-exists.validator';

export class CreateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Banner'], {
    message: 'Title already exists',
  })
  title: string;

  @ApiProperty({
    example:
      '1: main banner, 2: right banner, 3: simple big banner, 4: simple small banner, 5: left banner ...',
  })
  @IsNotEmpty()
  type: number;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  photo: string;

  @ApiProperty({
    example: 'ID of status',
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: number;
}
