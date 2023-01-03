import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/statuses/entities/status.entity';
import { IsOptional } from 'class-validator';

export class FilterCategoriesDto {
  @ApiProperty({
    example: 'Iphone',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  status?: Status;
}
