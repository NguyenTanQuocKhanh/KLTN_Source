import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entity/orders.entity';
import { StatisticalController } from './statistical.controller';
import { StatisticalService } from './statistical.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  exports: [StatisticalService],
  providers: [StatisticalService],
  controllers: [StatisticalController],
})
export class StatisticalModule {}
