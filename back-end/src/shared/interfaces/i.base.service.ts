/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityId } from 'typeorm/repository/EntityId';
import { DeepPartial, DeleteResult, FindOptionsOrder } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export interface IBaseService<T> {
  findManyWithPagination(
    paginationOptions: IPaginationOptions,
    fields?: string,
    wheres?: EntityCondition<T>,
    orders?: FindOptionsOrder<T>,
    likes?: (keyof T)[],
  );

  findOne(fields: EntityCondition<T> | EntityCondition<T>[]): Promise<T>;

  create(data: DeepPartial<T>): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
