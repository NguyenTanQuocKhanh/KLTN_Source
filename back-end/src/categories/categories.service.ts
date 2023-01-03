import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { BannerService } from 'src/banner/banner.service';
import { BaseService } from 'src/shared/services/base.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { Categories } from './entity/categories.entity';

@Injectable()
export class CategoriesService extends BaseService<
  Categories,
  Repository<Categories>
> {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    private bannerService: BannerService,
  ) {
    super(categoriesRepository, 'categories');
  }

  async createWithBanners(data: CreateCategoriesDto): Promise<Categories> {
    console.log('data', data);
    if (data.banners) {
      await Promise.all(
        data.banners?.map((id) => {
          return this.bannerService.findOne({ id });
        }),
      )
        .then((res) => {
          console.log(res);
          data.banners = res;
        })
        .catch((err) => {
          delete data.banners;
          throw err;
        });
    }
    return super.create(data as DeepPartial<Categories>);
  }

  async updateWithBanners(
    id: EntityId,
    data: UpdateCategoriesDto,
  ): Promise<Categories> {
    if (data.banners) {
      await Promise.all(
        data.banners?.map((id) => {
          return this.bannerService.findOne({ id });
        }),
      )
        .then((res) => {
          console.log(res);
          data.banners = res;
        })
        .catch((err) => {
          delete data.banners;
          throw err;
        });
    }

    return super.update(id, data);
  }

  async getAllCategories(paginationOptions: IPaginationOptions) {
    const wheres = {
      status: {
        id: 1,
      },
    };
    return await super.findManyWithPagination(paginationOptions, null, wheres);
  }

  async changeStatus(id: string): Promise<boolean> {
    const product = await super.findOne({ id });
    const newStatus = get(product, 'status.id') === 2 ? 1 : 2;
    const { affected } = await this.categoriesRepository.update(
      {
        id,
      },
      {
        status: newStatus,
      },
    );
    return affected === 1 ? true : false;
  }
}
