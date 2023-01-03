import { Role } from 'src/roles/entities/role.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FliterUserDto {
  @ApiProperty()
  @IsOptional()
  fullName?: string | null;

  @ApiProperty()
  @IsOptional()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  gender?: number;

  @ApiProperty()
  @IsOptional()
  role?: Role | null;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
