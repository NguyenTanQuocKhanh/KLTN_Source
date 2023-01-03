import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  Validate,
} from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';

export class AuthUpdateDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'Email already exists',
  })
  email: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  photo?: FileEntity;

  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'userName already exists',
  })
  username?: string | null;

  @ApiProperty({ example: 'Nguyen Tuan Hung' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  fullName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('VN')
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;
}
