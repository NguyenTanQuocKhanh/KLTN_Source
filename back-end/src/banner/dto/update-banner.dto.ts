import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class UpdateBannerDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example:
      '1: main banner, 2: right banner, 3: simple big banner, 4: simple small banner, 5: left banner',
  })
  @IsOptional()
  @IsNotEmpty()
  type?: number;

  @ApiProperty()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Banner'], {
    message: 'Order already exists',
  })
  order?: number;

  @ApiProperty({ example: 'ID of file' })
  @IsOptional()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  photo: string;

  @ApiProperty({ example: 'ID of status' })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: number;
}
