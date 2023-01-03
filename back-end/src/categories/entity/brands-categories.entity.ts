import { Brand } from 'src/brand/entities/brand.entity';
import { Entity, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
import { Categories } from './categories.entity';

@Entity('brands_categories')
export class BrandsCategories {
  @PrimaryColumn({ type: 'int' })
  brandId?: number;

  @PrimaryColumn({ type: 'int' })
  categoriesId?: number;

  @OneToOne(() => Brand)
  @JoinTable()
  brand: Brand | number;

  @OneToOne(() => Categories)
  @JoinTable()
  categories: Categories | number;

  // @Column({ default: 0 })
  // totalProduct?: number;
}
