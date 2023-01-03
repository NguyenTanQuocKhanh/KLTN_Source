import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Buffer } from 'buffer';
import { get } from 'lodash';
import { OrdersService } from 'src/orders/orders.service';
import { sign } from 'src/utils/gen-signature';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class MomoService {
  constructor(
    private orderService: OrdersService,
    private configService: ConfigService,
  ) {}
  async checkout(data: CreatePaymentDto, callback?: (payUrl: string) => void) {
    console.log(callback);
    //* prepare data to call momo api
    const {
      url,
      partnerCode,
      accessKey,
      secretKey,
      redirectUrl,
      ipnUrl,
      requestType,
    } = this.getConfig();
    const { totalAmount } = data;
    const extraData = Buffer.from(JSON.stringify({ data })).toString('base64');
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'Thanh toán online';
    const dataRaw = `accessKey=${accessKey}&amount=${totalAmount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = sign(dataRaw, secretKey);

    //* call momo api
    return axios
      .post(`${url}/v2/gateway/api/create`, {
        accessKey,
        amount: totalAmount,
        extraData,
        ipnUrl,
        orderId,
        orderInfo,
        partnerCode,
        redirectUrl,
        requestId,
        requestType,
        lang: 'vi',
        signature,
      })
      .then((response) => {
        console.log('url', get(response, 'data.payUrl'));
        return get(response, 'data.payUrl');
      })
      .catch((error) => {
        throw new BadRequestException({ ...get(error, 'response.data') });
      });
  }

  getConfig() {
    return {
      url: this.configService.get('momo.url'),
      partnerCode: this.configService.get('momo.partnerCode'),
      accessKey: this.configService.get('momo.accessKey'),
      secretKey: this.configService.get('momo.secretKey'),
      redirectUrl: this.configService.get('momo.redirectUrl'),
      ipnUrl: this.configService.get('momo.ipnUrl'),
      requestType: this.configService.get('momo.requestType'),
    };
  }
}
