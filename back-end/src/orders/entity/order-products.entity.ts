import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_products')
export class OrderProducts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  @BeforeUpdate()
  setPrice() {
    if (this.discount) {
      this.price =
        this.priceBeforeDiscount -
        Math.floor((this.priceBeforeDiscount * this.discount) / 100);
    } else {
      this.price = this.priceBeforeDiscount;
    }
  }

  @ApiProperty({ example: 1 })
  @Column()
  orderId: number;

  @ApiProperty({ example: 1 })
  @Column()
  productId: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column({ nullable: true })
  priceBeforeDiscount: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ nullable: true })
  discount: number;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  params: Record<string, unknown>;
}
