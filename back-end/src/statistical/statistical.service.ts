import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entity/orders.entity';
import { Between, Repository } from 'typeorm';
import { RevenueStatisticsDto } from './dto/revennue-statistics.dto';
import { castArray } from 'lodash';

@Injectable()
export class StatisticalService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  async revenueStatistics(
    revenueStatisticsDto: RevenueStatisticsDto,
  ): Promise<unknown> {
    const { byYear, byDate } = revenueStatisticsDto;
    let revennues;
    if (byYear) {
      revennues = await this.ordersRepository
        .createQueryBuilder('order')
        .select('SUM(order.totalAmount)', 'totalAmount')
        .addSelect('EXTRACT (MONTH FROM order.createdAt)', 'month')
        .where(`EXTRACT (YEAR FROM order.createdAt) = ${byYear}`)
        .andWhere({
          status: 'successful',
        })
        .groupBy('month')
        .execute();
    } else if (byDate) {
      const currentDate = new Date();
      const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      revennues = await this.ordersRepository
        .createQueryBuilder('order')
        .select('SUM(order.totalAmount)', 'totalAmount')
        .addSelect('EXTRACT (DAY FROM order.createdAt)', 'month')
        .where({
          createdAt: Between(sevenDaysAgo, currentDate),
        })
        .andWhere({
          status: 'successful',
        })
        .groupBy('month')
        .execute();
    }

    revennues = castArray(revennues).sort((a, b) => a.month - b.month);
    revennues = castArray(revennues).reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.month]: +currentValue.totalAmount,
      }),
      {},
    );
    return revennues;
  }

  async numberOfOrderStatistics(
    revenueStatisticsDto: RevenueStatisticsDto,
  ): Promise<unknown> {
    const { byYear, byDate } = revenueStatisticsDto;
    let revennues;
    if (byYear) {
      revennues = await this.ordersRepository
        .createQueryBuilder('order')
        .select('COUNT(*)', 'totalOrder')
        .addSelect('EXTRACT (MONTH FROM order.createdAt)', 'month')
        .where(`EXTRACT (YEAR FROM order.createdAt) = ${byYear}`)
        .andWhere({
          status: 'successful',
        })
        .groupBy('month')
        .execute();
    } else if (byDate) {
      const currentDate = new Date();
      const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      revennues = await this.ordersRepository
        .createQueryBuilder('order')
        .select('COUNT(*)', 'totalOrder')
        .addSelect('EXTRACT (DAY FROM order.createdAt)', 'month')
        .where({
          createdAt: Between(sevenDaysAgo, currentDate),
        })
        .andWhere({
          status: 'successful',
        })
        .groupBy('month')
        .execute();
    }
    revennues = castArray(revennues).sort((a, b) => a.month - b.month);
    revennues = castArray(revennues).reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.month]: +currentValue.totalOrder,
      }),
      {},
    );
    return revennues;
  }
}
