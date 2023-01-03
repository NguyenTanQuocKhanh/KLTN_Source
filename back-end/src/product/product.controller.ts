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
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { GetTopSoldDto } from './dto/get-top-sold.dto';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('paging')
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() searchProductDto: SearchProductDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.productService.searching(
      searchProductDto,
      {
        page,
        limit,
      },
      fields,
      {},
      { [column]: sort },
      ['name'],
      true,
    );
  }

  @Post('searching')
  @HttpCode(HttpStatus.OK)
  searching(
    @Body() searchProductDto: SearchProductDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
    @Query('fields') fields?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.productService.searching(
      searchProductDto,
      {
        page,
        limit,
      },
      fields,
      {},
      { [column]: sort },
      ['name'],
      false,
    );
  }

  @Get('top-search')
  @HttpCode(HttpStatus.OK)
  topSearch(@Query('page') page: number, @Query('limit') limit: number) {
    if (limit > 50) {
      limit = 50;
    }
    return this.productService.getTopSearch({
      page,
      limit,
    });
  }

  @Get('hint-today')
  @HttpCode(HttpStatus.OK)
  hintToday(@Query('page') page: number, @Query('limit') limit: number) {
    if (limit > 50) {
      limit = 50;
    }
    return this.productService.getHintToday({
      page,
      limit,
    });
  }

  @Post('top-sold')
  @HttpCode(HttpStatus.OK)
  topSold(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Body() getTopSoldDto: GetTopSoldDto,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.productService.getTopSold(
      {
        page,
        limit,
      },
      getTopSoldDto,
    );
  }

  @Get('search-hint')
  @HttpCode(HttpStatus.OK)
  async searchHint(@Query('keyword') keyword: string) {
    return await this.productService.searchHint(keyword);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Request() request, @Param('id') id: number) {
    return this.productService.getOne(id, request?.user?.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.productService.changeStatus(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post(':id/like')
  like(@Request() request, @Param('id') id: number) {
    return this.productService.like(get(request, 'user.id'), id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post(':id/unlike')
  unlike(@Request() request, @Param('id') id: number) {
    return this.productService.unlike(get(request, 'user.id'), id);
  }
}
