import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchProductDto {
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
