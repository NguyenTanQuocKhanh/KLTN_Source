import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PAYMENT_TYPE } from '../payment.constant';
import { ORDER_TYPE } from 'src/orders/orders.constant';
import { Orders } from 'src/orders/entity/orders.entity';

@Injectable()
export class CashService {
  constructor(private readonly orderService: OrdersService) {}

  async checkout(createPaymentDto: CreatePaymentDto): Promise<Orders> {
    //* prepare order data
    createPaymentDto.paymentMethod = PAYMENT_TYPE.CASH;
    createPaymentDto.status = ORDER_TYPE.PENDING;
    //* create pending order
    return await this.orderService.createOrder(createPaymentDto);
  }
}
