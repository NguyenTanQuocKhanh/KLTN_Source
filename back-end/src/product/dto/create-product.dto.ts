import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { Brand } from 'src/brand/entities/brand.entity';
import { Categories } from 'src/categories/entity/categories.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { CreateModelDto } from 'src/model/dto/create-model.dto';
import { Model } from 'src/model/entities/model.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

class TierModelDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  tierModel?: TierModel | string;

  @ApiProperty({ type: [CreateModelDto] })
  @IsNotEmpty()
  @IsArray()
  models: Model[] | CreateModelDto[];
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(IsNotExist, ['Product'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID of file',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  image: FileEntity | string;

  @ApiProperty({
    description: 'ID of file',
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  images: FileEntity[] | string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount?: number | null;

  @ApiProperty({ description: 'Id of categories', type: String })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'Categories not exists',
  })
  categories: Categories | number;

  @ApiProperty({ description: 'Id of brand', type: String })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Brand', 'id'], {
    message: 'Brand not exists',
  })
  brand: Brand | number;

  @ApiProperty({ type: [TierModelDto] })
  @IsNotEmpty()
  @IsArray()
  tierModels?: TierModelDto[] | TierModel[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  keywords: string[] | null;

  @ApiProperty({
    description: 'ID of status',
    type: Number,
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
