import { UpdateBannerDto } from './dto/update-banner.dto';
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
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { FilterBannerDto } from './dto/filter-banner.dto';
import { Banner } from './entities/banner.entity';

@ApiTags('Banners')
@Controller({
  path: 'banners',
  version: '1',
})
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getActivatedList(@Query('page') page: number, @Query('limit') limit: number) {
    return this.bannerService.getAllBanners({
      page,
      limit,
    });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() banner: CreateBannerDto) {
    return this.bannerService.create(banner);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterBannerDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.bannerService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      { ...filters } as EntityCondition<Banner>,
      { [column]: sort },
      ['title'],
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bannerService.changeStatus(id);
  }
}
