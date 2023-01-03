import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MomoService } from './momo/momo.service';
import { StripeService } from './stripe/stripe.service';
import { CashService } from './cash/cash.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Payments')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(
    private stripeService: StripeService,
    private momoService: MomoService,
    private cashService: CashService,
  ) {}

  @Post('stripe')
  checkoutStripe() {
    try {
      return this.stripeService.checkout();
    } catch (error) {
      throw error;
    }
  }

  @Post('momo')
  async checkoutMomo(
    @Request() request,
    @Res({ passthrough: true }) res,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    createPaymentDto.userId = request.user.id;
    createPaymentDto.createdBy = request.user.email;
    try {
      return await this.momoService.checkout(
        createPaymentDto,
        (payUrl: string) => {
          return res.redirect(payUrl);
        },
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('cash')
  async checkoutCash(
    @Request() request,
    @Res({ passthrough: true }) res,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    createPaymentDto.userId = request.user.id;
    createPaymentDto.createdBy = request.user.email;
    return await this.cashService.checkout(createPaymentDto);
  }
}
