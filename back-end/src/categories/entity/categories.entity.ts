import { Banner } from 'src/banner/entities/banner.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from './../../files/entities/file.entity';
import { Status } from './../../statuses/entities/status.entity';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Categories extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  logo: FileEntity | string;

  @ManyToMany(() => Banner, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable({
    name: 'categories_banners',
  })
  banners: Banner[] | number[];

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | number;

  @Column({ nullable: true })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name?.split(' ').join('_')}_${new Date().getTime()}`;
  }
}
