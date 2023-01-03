/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from '../interfaces/i.base.service';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  private TName: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(repository: R, name: string) {
    this.repository = repository;
    this.TName = name;
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    fields?: string,
    wheres?: FindOptionsWhere<T>,
    orders?: FindOptionsOrder<T>,
    likes?: (keyof T)[],
    relations?: string[],
  ) {
    const selects: (keyof T)[] = [];
    if (fields) {
      fields.split(',').forEach((el) => {
        if (el as keyof T) {
          selects.push(el as keyof T);
        }
      });
      selects.push('id' as keyof T);
    }
    if (likes) {
      likes.forEach((el: any) => {
        if (wheres[el]) {
          wheres[el] = ILike(`%${wheres[el]}%`);
        }
      });
    }
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await this.repository.find({
        ...(paginationOptions.page &&
          paginationOptions.limit && {
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
          }),
        ...(paginationOptions.limit && { take: paginationOptions.limit }),
        select: selects,
        where: wheres,
        order: orders,
        cache: true,
        ...(!relations
          ? { loadEagerRelations: true }
          : {
              loadEagerRelations: false,
              relations,
            }),
      }),
      totalPages,
      paginationOptions,
    );
  }

  async findOne(fields: EntityCondition<T>, relations?: string[]): Promise<T> {
    // const isSlug = isNaN(+get(fields, 'id'));
    // const where = !isSlug
    //   ? ({
    //       id: get(fields, 'id'),
    //     } as EntityCondition<T>)
    //   : ({
    //       slug: get(fields, 'id'),
    //     } as EntityCondition<T>);
    // const where = {
    //   id: get(fields, 'id'),
    // } as EntityCondition<T>;
    const entity = await this.repository.findOne({
      where: fields,
      ...(!relations
        ? { loadEagerRelations: true }
        : {
            loadEagerRelations: false,
            relations,
          }),
    });

    let error = 'with ';
    Object.keys(fields).forEach((key) => {
      error += `${key} = ${fields[key]}`;
    });
    // if (isSlug) {
    //   error = error?.replace(' id = ', ' slug = ');
    // }
    if (!entity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: `Entity ${this.TName} ${error} not found`,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(this.repository.create(data));
  }

  async update(id: EntityId, data: any, relations?: string[]): Promise<T> {
    try {
      await this.repository.save(
        this.repository.create({ id, ...data }) as any,
      );
      return this.findOne({ id } as unknown as EntityCondition<T>, relations);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            message: `Entity with id ${id} not found`,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
