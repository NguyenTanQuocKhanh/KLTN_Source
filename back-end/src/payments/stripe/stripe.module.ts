import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { MomoService } from '../momo/momo.service';
import { PaymentsController } from '../payments.controller';
import { StripeService } from './stripe.service';
import { CashService } from '../cash/cash.service';

@Module({
  imports: [OrdersModule],
  controllers: [PaymentsController],
  providers: [StripeService, MomoService, CashService],
  exports: [StripeService],
})
export class StripeModule {}
