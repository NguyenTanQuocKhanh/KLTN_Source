import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class Review extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'jsonb' })
  @IsNotEmpty()
  user: Record<string, unknown>;

  @ApiProperty()
  @Column({ type: 'jsonb' })
  @IsNotEmpty()
  product: Record<string, unknown>;

  @ApiProperty()
  @Column()
  rating: number;

  @ApiProperty()
  @Column({ nullable: true })
  productQuality: string;

  @ApiProperty()
  @Column({ nullable: true })
  trueToDescription: string;

  @ApiProperty()
  @Column({ nullable: true })
  review: string;

  @ApiProperty()
  @ManyToMany(() => FileEntity)
  @JoinTable()
  files: FileEntity[] | string[];

  @ApiProperty()
  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status;

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
