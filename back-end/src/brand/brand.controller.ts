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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { FilterBrandDto } from './dto/filter-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@ApiTags('Brands')
@Controller({
  version: '1',
  path: 'brands',
})
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    console.log(createBrandDto);
    return this.brandService.createWithCategories(createBrandDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterBrandDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.brandService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      { ...filters } as EntityCondition<Brand>,
      { [column]: sort },
      ['name'],
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getActivatedList(@Query('page') page: number, @Query('limit') limit: number) {
    return this.brandService.getAllBrands({
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.brandService.getOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateBannerDto: UpdateBrandDto) {
    return this.brandService.updateWithCategories(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.changeStatus(id);
  }
}
