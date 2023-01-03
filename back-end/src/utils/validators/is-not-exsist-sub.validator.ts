import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'IsNotExistSub', async: true })
export class IsNotExistSub implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async validate(value: string, validationArguments: ValidationArguments) {
    console.log(value, validationArguments);
    const repository = validationArguments.constraints[0] as string;
    const subField = validationArguments.constraints[1] as string;
    const entity = await this.dataSource.getRepository(repository).findOne({
      where: {
        [validationArguments.property]: {
          [subField]: value,
        },
      },
      loadEagerRelations: false,
    });

    if (entity?.id === value) {
      return true;
    }

    return !entity;
  }
}
