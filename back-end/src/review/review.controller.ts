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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { pick } from 'lodash';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';
import { SearchingReviewDto } from './dto/searching-review.dto';
import { Review } from './entity/review.entity';
import { ReviewService } from './review.service';

@ApiTags('Review')
@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateReviewDto,
    isArray: true,
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Request() request, @Body() createReviewDtos: CreateReviewDto[]) {
    const user = {
      ...pick(request.user, ['id', 'email', 'fullName', 'photo']),
    };
    return this.reviewService.createMultipleReviews(user, createReviewDtos);
  }

  @Post('searching')
  @HttpCode(HttpStatus.OK)
  searching(
    @Body() filters: SearchingReviewDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return this.reviewService.search(
      {
        page,
        limit,
      },
      { ...filters } as EntityCondition<Review>,
    );
  }

  @Post('paging')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  paging(
    @Body() filters: FilterReviewDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', new DefaultValuePipe(1), ParseIntPipe) sort?: number,
    @Query('column', new DefaultValuePipe('id')) column?: string,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return this.reviewService.paging(
      {
        page,
        limit,
      },
      { ...filters } as EntityCondition<Review>,
      { sort: column, order: sort },
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne({ id });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.reviewService.changeStatus(id);
  }
}
