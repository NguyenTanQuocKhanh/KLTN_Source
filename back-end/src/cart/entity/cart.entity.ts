import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Cart extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  product: Record<string, unknown>;
}
