import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../statuses/entities/status.entity';
import { IsOptional } from 'class-validator';

export class FilterBannerDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example:
      '1: main banner, 2: right banner, 3: simple big banner, 4: simple small banner, 5: left banner',
  })
  @IsOptional()
  type?: number;

  @ApiProperty()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
