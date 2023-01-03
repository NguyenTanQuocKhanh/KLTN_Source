import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelService extends BaseService<Model, Repository<Model>> {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {
    super(modelRepository, 'model');
  }
}
