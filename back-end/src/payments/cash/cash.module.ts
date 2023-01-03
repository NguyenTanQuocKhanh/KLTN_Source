import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { CashService } from './cash.service';
import { PaymentsController } from '../payments.controller';
import { StripeService } from '../stripe/stripe.service';
import { MomoService } from '../momo/momo.service';

@Module({
  controllers: [PaymentsController],
  imports: [OrdersModule],
  providers: [CashService, StripeService, MomoService],
  exports: [CashService],
})
export class CashModule {}
