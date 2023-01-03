import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brand/entities/brand.entity';
import { Categories } from 'src/categories/entity/categories.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { TierModel } from 'src/tier-model/entities/tier-model.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from './../../files/entities/file.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Product extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name?.split(' ').join('_')}_${new Date().getTime()}`;
  }

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

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | string;

  @ApiProperty()
  @ManyToMany(() => FileEntity, {
    eager: true,
  })
  @JoinTable()
  images: FileEntity[] | string[];

  @ApiProperty()
  @Column({ default: 0 })
  likedCount?: number;

  @ApiProperty()
  @Column()
  discount?: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  stock?: number;

  @ApiProperty()
  @Column()
  price?: number;

  @ApiProperty()
  @Column()
  priceBeforeDiscount: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  sold?: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  viewCount?: number | null;

  @ApiProperty()
  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status | number;

  @ApiProperty()
  @ManyToOne(() => Categories, {
    eager: true,
  })
  categories: Categories | number;

  @ApiProperty()
  @ManyToOne(() => Brand, {
    eager: true,
  })
  brand: Brand | number;

  @ManyToMany(() => TierModel, {
    eager: true,
  })
  @JoinTable({
    name: 'product_tierModel',
  })
  tierModels: TierModel[] | string[];

  @ManyToMany(() => User, { eager: false })
  @JoinTable({
    name: 'likes',
  })
  likedUsers: User[];

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  keywords?: string[] | null;

  @ApiProperty()
  @Column({ nullable: true, default: {}, name: 'params', type: 'jsonb' })
  params?: Record<string, unknown>;

  @ApiProperty()
  @Column({ nullable: true })
  slug?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
