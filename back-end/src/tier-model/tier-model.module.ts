import { Module } from '@nestjs/common';
import { TierModelService } from './tier-model.service';
import { TierModelController } from './tier-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierModel } from './entities/tier-model.entity';
import { Model } from 'src/model/entities/model.entity';
import { ModelModule } from 'src/model/model.module';

@Module({
  imports: [TypeOrmModule.forFeature([TierModel, Model]), ModelModule],
  controllers: [TierModelController],
  providers: [TierModelService],
  exports: [TierModelService],
})
export class TierModelModule {}
