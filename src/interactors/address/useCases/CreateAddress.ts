import { Address, type AddressData } from '../entity/Address'

import { type AddressRepository } from '@/repositories/AddressRepository'

export type CreateAddressDTO = Omit<AddressData, 'id'>

export class CreateAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(data: CreateAddressDTO): Promise<Address> {
    const address = await this.repository.save(new Address(data as AddressData))
    return address
  }
}
