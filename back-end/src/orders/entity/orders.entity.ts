import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ORDER_TYPE } from '../orders.constant';
import { Address } from 'src/address/entity/address.entity';

@Entity('orders')
export class Orders extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  totalAmount: number;

  @ApiProperty()
  @Column({ nullable: true })
  totalAmountBeforeDiscount: number;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ORDER_TYPE, default: ORDER_TYPE.DELIVERING })
  status: ORDER_TYPE;

  @ApiProperty()
  @ManyToOne(() => Address, {
    eager: false,
  })
  address: Address | number;

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true })
  params: Record<string, unknown>;

  @ApiProperty()
  @Column()
  paymentMethod: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  updatedBy: string;
}
