import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { get } from 'lodash';
import { CategoriesService } from 'src/categories/categories.service';
import { BaseService } from 'src/shared/services/base.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandDetailReponseDto } from './dto/get-brand-response.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService extends BaseService<Brand, Repository<Brand>> {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private categoriesService: CategoriesService,
  ) {
    super(brandRepository, 'brand');
  }

  async createWithCategories(data: CreateBrandDto): Promise<Brand> {
    await Promise.all(
      data.categories?.map((id) => {
        return this.categoriesService.findOne({ id });
      }),
    ).then((res) => {
      data.categories = res;
    });

    return super.create(data as DeepPartial<Brand>);
  }

  async updateWithCategories(id: number, data: UpdateBrandDto): Promise<Brand> {
    await Promise.all(
      data.categories?.map((id) => {
        return this.categoriesService.findOne({ id });
      }),
    ).then((res) => {
      data.categories = res;
    });
    return await super.update(id, data, [
      'categories',
      'image',
      'logo',
      'status',
    ]);
  }

  async getOne(id: string): Promise<GetBrandDetailReponseDto> {
    const data = await super.findOne({ id }, [
      'logo',
      'status',
      'image',
      'categories',
    ]);
    console.log(data);
    return plainToClass(GetBrandDetailReponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async getAllBrands(paginationOptions: IPaginationOptions) {
    const wheres: FindOptionsWhere<Brand> = {
      status: {
        id: 1,
      },
    };
    return await super.findManyWithPagination(paginationOptions, '', wheres);
  }

  async changeStatus(id: string): Promise<boolean> {
    const product = await super.findOne({ id });
    const newStatus = get(product, 'status.id') === 2 ? 1 : 2;
    const { affected } = await this.brandRepository.update(
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
