import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class RevenueStatisticsDto {
  @ApiProperty({
    example: 2022,
  })
  @IsOptional()
  @IsNumber()
  byYear: number;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  @IsOptional()
  byDate: boolean;
}
