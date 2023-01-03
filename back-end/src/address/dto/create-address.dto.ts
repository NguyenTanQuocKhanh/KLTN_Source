import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    required: true,
    example: 'Nguyen Tan Quoc Khanh',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    required: true,
    example: '03463537438',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    required: true,
    example: '77/7 Tan lap 2, Hiep Phu, Q9, TP.HCM',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDefault: boolean;

  userId: number;
}
