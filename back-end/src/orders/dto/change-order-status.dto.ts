import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class ChangeOrderStatusDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Orders', 'id'], {
    message: 'Order not exists',
  })
  orderId: number;

  @ApiProperty({
    required: true,
    example: 'cancel',
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    required: true,
    example: 'note',
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  user: Record<string, unknown>;
}
