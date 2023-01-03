import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RevenueStatisticsDto } from './dto/revennue-statistics.dto';
import { StatisticalService } from './statistical.service';

@ApiTags('Statistical')
@Controller({
  path: 'statistical',
  version: '1',
})
export class StatisticalController {
  constructor(private statisticalService: StatisticalService) {}

  @Post('revenue')
  @ApiBody({
    type: RevenueStatisticsDto,
  })
  async revenueStatistics(@Body() revenueStatisticsDto: RevenueStatisticsDto) {
    return await this.statisticalService.revenueStatistics(
      revenueStatisticsDto,
    );
  }

  @Post('number-of-orders')
  @ApiBody({
    type: RevenueStatisticsDto,
  })
  async numberOfOrderStatistics(
    @Body() revenueStatisticsDto: RevenueStatisticsDto,
  ) {
    return await this.statisticalService.numberOfOrderStatistics(
      revenueStatisticsDto,
    );
  }
}
