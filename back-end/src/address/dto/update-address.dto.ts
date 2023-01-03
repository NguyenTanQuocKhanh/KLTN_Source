import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({
    required: true,
    example: 'Nguyen Tan Quoc Khanh',
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({
    required: true,
    example: '03463537438',
  })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: '77/7 Tan lap 2, Hiep Phu, Q9, TP.HCM',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;

  userId: number;
}
