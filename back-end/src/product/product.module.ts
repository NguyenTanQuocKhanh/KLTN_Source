import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from 'src/banner/banner.module';
import { FilesModule } from 'src/files/files.module';
import { ModelModule } from 'src/model/model.module';
import { TierModelModule } from 'src/tier-model/tier-model.module';
import { UsersModule } from 'src/users/users.module';
import { Product } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { OrderProducts } from 'src/orders/entity/order-products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, OrderProducts]),
    BannerModule,
    TierModelModule,
    ModelModule,
    FilesModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
