import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsOrder, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entity/address.entity';

@Injectable()
export class AddressService extends BaseService<Address, Repository<Address>> {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {
    super(addressRepository, 'Address');
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, isDefault } = createAddressDto;
    const existedAddress = await this.findDefaultAddress(userId);
    if (existedAddress && isDefault) {
      await super.update(existedAddress.id, {
        isDefault: false,
      });
    }
    return await super.create(createAddressDto);
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const { userId, isDefault } = updateAddressDto;
    const existedAddress = await this.findDefaultAddress(userId);
    if (isDefault && existedAddress && id !== existedAddress.id) {
      await super.update(existedAddress.id, {
        isDefault: false,
      });
    }
    return await super.update(id, updateAddressDto);
  }

  async getAllAddress(
    paginationOptions: IPaginationOptions,
    where: Record<string, unknown>,
  ) {
    const orders: FindOptionsOrder<Address> = {
      createdAt: 'ASC',
    };
    return await super.findManyWithPagination(
      paginationOptions,
      null,
      where,
      orders,
    );
  }

  async findDefaultAddress(userId: number): Promise<Address> {
    return await this.addressRepository.findOne({
      where: {
        userId,
        isDefault: true,
      },
    });
  }
}
