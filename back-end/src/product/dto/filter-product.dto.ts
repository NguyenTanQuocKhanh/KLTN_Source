import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class FilterProductDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categories?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  brand?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  fromPrice?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  toPrice?: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating: number | null;

  @ApiProperty()
  @IsOptional()
  keyword: string | null;
}
