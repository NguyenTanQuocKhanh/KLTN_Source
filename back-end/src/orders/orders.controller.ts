import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@ApiTags('Orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('momo-redirect')
  handleMomoRedirect(
    @Res({ passthrough: true }) res,
    @Query('extraData') extraData: string,
  ): Promise<void> {
    return this.orderService.handleMomoRedirect(extraData, (orderId: number) =>
      res.redirect(`${process.env.CLIENT_REDIRECT_URL}?orderId=${orderId}`),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getOrderByMe(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.orderService.getOrdersByMe(
      {
        page,
        limit,
      },
      {
        userId: request.user.id,
      },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/change-status')
  changeStatus(
    @Request() request,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    changeOrderStatusDto.user = request.user;
    return this.orderService.changeStatus(changeOrderStatusDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.orderService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      {},
      { [column]: sort },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.orderService.getOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
