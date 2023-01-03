import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from './../shared/services/base.service';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService extends BaseService<Banner, Repository<Banner>> {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {
    super(bannerRepository, 'banner');
  }

  async create(data: DeepPartial<Banner>): Promise<Banner> {
    const maxOrderBanner = await this.findMaxByOrder();
    if (maxOrderBanner) {
      data.order = maxOrderBanner + 1;
    } else {
      data.order = 1;
    }
    return super.create(data);
  }

  async findMaxByOrder(): Promise<number> {
    const query = this.bannerRepository
      .createQueryBuilder()
      .select('MAX(Banner.order)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  async getAllBanners(paginationOptions: IPaginationOptions) {
    const wheres = {
      status: {
        id: 1,
      },
    };
    return await super.findManyWithPagination(paginationOptions, null, wheres);
  }

  async changeStatus(id: number): Promise<boolean> {
    const product = await super.findOne({ id });
    const newStatus = get(product, 'status.id') === 2 ? 1 : 2;
    const { affected } = await this.bannerRepository.update(
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
