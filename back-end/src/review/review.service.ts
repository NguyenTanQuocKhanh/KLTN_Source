/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectRepository } from '@nestjs/typeorm';
import { omit, pick, set } from 'lodash';
import { FilesService } from 'src/files/files.service';
import { ProductService } from 'src/product/product.service';
import { BaseService } from 'src/shared/services/base.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';

export class ReviewService extends BaseService<Review, Repository<Review>> {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private fileService: FilesService,
    private productService: ProductService,
  ) {
    super(reviewRepository, 'review');
  }

  async createMultipleReviews(
    user: Record<string, unknown>,
    dtos: CreateReviewDto[],
  ) {
    try {
      const promises = dtos?.map(async (data) => {
        const product = await this.productService.findOne({
          id: data.productId,
        });
        data.product = {
          ...pick(product, ['id', 'name']),
        };
        set(data, 'user', user);

        // find images
        await Promise.all(
          data.files?.map((id) => {
            return this.fileService.findOne({ id });
          }),
        )
          .then((res) => {
            data.files = res;
          })
          .catch((error) => {
            throw error;
          });
        data.status = {
          id: StatusEnum.inactive,
          name: 'Inactive',
        };
        const dataToSave = omit(data, ['productId', 'userId']);
        const result = await super.create(dataToSave);

        // statistics by rating
        const reviews = await this.statisticsByRatingAndProduct(product.id);
        const ratingTotal = reviews?.reduce((prev, cur) => {
          return prev + cur.rating * +cur.total;
        }, 0);
        const reviewTotal = reviews?.reduce((prev, cur) => {
          return prev + +cur.total;
        }, 0);
        await this.productService.update(product.id, {
          ...data,
          params: {
            ...product.params,
            reviewTotal,
            ratingAvg: Math.round((ratingTotal / reviewTotal) * 10) / 10,
            statisticReview: reviews,
          },
        });
        return result;
      });

      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }

  async search(
    paginationOptions: IPaginationOptions,
    wheres?: any,
  ): Promise<any> {
    wheres.status = 1;
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where({ ...omit(wheres, 'productId') })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy('review.createdAt', 'DESC');
    if (wheres.productId) {
      queryBuilder.andWhere(`review.product ->> 'id' =:productId`, {
        productId: wheres.productId,
      });
      delete wheres.productId;
    }

    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await queryBuilder.getMany(),
      totalPages,
      paginationOptions,
    );
  }

  async paging(
    paginationOptions: IPaginationOptions,
    wheres?: any,
    order?: any,
  ): Promise<any> {
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where({ ...omit(wheres, 'productId', 'userId') })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy(order.sort, 'ASC');
    if (wheres.productId) {
      queryBuilder.andWhere(`review.product ->> 'id' =:productId`, {
        productId: wheres.productId,
      });
      delete wheres.productId;
    }

    if (wheres.userId) {
      queryBuilder.andWhere(`review.user ->> 'id' =:userId`, {
        userId: wheres.userId,
      });
      delete wheres.userId;
    }
    let totalPages = 1;
    if (paginationOptions.limit) {
      const totalRows = await this.repository.count({
        where: wheres,
      });
      totalPages = Math.ceil(totalRows / paginationOptions.limit);
    }
    return infinityPagination(
      await queryBuilder.getMany(),
      totalPages,
      paginationOptions,
    );
  }

  async statisticsByRatingAndProduct(productId: number) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .select('COUNT(review.id)', 'total')
      .addSelect('review.rating', 'rating')
      .where(`review.product ->> 'id' =:productId`, {
        productId,
      })
      .groupBy('review.rating')
      .getRawMany();
    return reviews;
  }

  async changeStatus(id: number): Promise<boolean> {
    const review = await super.findOne({ id });
    const newStatus =
      review.status.id === 2
        ? {
            id: StatusEnum.active,
            name: 'Active',
          }
        : {
            id: StatusEnum.inactive,
            name: 'Inactive',
          };
    const { affected } = await this.reviewRepository.update(id, {
      status: newStatus,
    });
    return affected === 1 ? true : false;
  }
}
