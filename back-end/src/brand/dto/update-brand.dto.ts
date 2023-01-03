import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'aws-sdk/clients/directconnect';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { Categories } from 'src/categories/entity/categories.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class UpdateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string | number;

  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['Brand'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsOptional()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  logo: string;

  @ApiProperty({
    description: 'ID of file',
  })
  @IsOptional()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  image: string;

  @ApiProperty()
  @IsOptional()
  categories: Categories[] | number[];

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty({
    example: 'ID of status',
  })
  @IsOptional()
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status | number;
}
