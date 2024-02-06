import { type AddressRepository } from 'src/repositories/AddressRepository'

import { Address, type AddressData } from '../entity/Address'

export type CreateAddressDTO = Omit<AddressData, 'id'>

export class CreateAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(data: CreateAddressDTO): Promise<Address> {
    const address = new Address(data as AddressData)

    const addressCreated = await this.repository.save<AddressData>(
      address.toJSON() as AddressData
    )

    return new Address(addressCreated)
  }
}