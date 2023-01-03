import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { IsNotExistSub } from 'src/utils/validators/is-not-exsist-sub.validator';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), CategoriesModule],
  controllers: [BrandController],
  providers: [BrandService, IsNotExistSub],
})
export class BrandModule {}
