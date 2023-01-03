import { Categories } from 'src/categories/entity/categories.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './../../files/entities/file.entity';
import { Status } from './../../statuses/entities/status.entity';

@Entity()
export class Brand extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  logo: FileEntity | string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | string;

  @ManyToMany(() => Categories, {
    cascade: true,
  })
  @JoinTable({
    name: 'brands_categories',
    joinColumn: { name: 'brandId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoriesId', referencedColumnName: 'id' },
  })
  categories: Categories[] | number[];

  @Column()
  description?: string | null;

  @Column('int', { default: 0 })
  totalProduct: number;

  @Column({ nullable: true })
  slug?: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | number;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name.split(' ').join('_')}_${new Date().getTime()}`;
  }
}
