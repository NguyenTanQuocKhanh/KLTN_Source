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
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { Categories } from './entity/categories.entity';
@ApiTags('Categories')
@Controller({
  version: '1',
  path: 'categories',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getActivatedList(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoriesService.getAllCategories({
      page,
      limit,
    });
  }

  @Post()
  create(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.createWithBanners(createCategoriesDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterCategoriesDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.categoriesService.findManyWithPagination(
      {
        page,
        limit,
      },
      fields,
      { ...filters } as EntityCondition<Categories>,
      { [column]: sort },
      ['name'],
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    return this.categoriesService.updateWithBanners(id, updateCategoriesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.changeStatus(id);
  }
}
