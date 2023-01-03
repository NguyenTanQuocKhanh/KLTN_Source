import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsController } from '../payments.controller';
import { StripeService } from '../stripe/stripe.service';
import { MomoService } from './momo.service';
import { CashService } from '../cash/cash.service';

@Module({
  imports: [OrdersModule],
  providers: [MomoService, StripeService, CashService],
  exports: [MomoService],
  controllers: [PaymentsController],
})
export class MomoModule {}
