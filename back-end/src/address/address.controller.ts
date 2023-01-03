import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Address')
@Controller({
  path: 'address',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post()
  create(@Request() request, @Body() createAddressDto: CreateAddressDto) {
    createAddressDto.userId = request.user.id;
    return this.addressService.createAddress(createAddressDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getActivatedList(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.addressService.getAllAddress(
      {
        page,
        limit,
      },
      {
        userId: request.user.id,
      },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Request() request,
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    updateAddressDto.userId = request.user.id;
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.delete(id);
  }
}
