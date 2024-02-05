import EntityNotFound from 'src/errors/EntityNotFound'
import { type AddressRepository } from 'src/repositories/AddressRepository'

import { Address, type AddressData } from '../entity/Address'

export class ViewAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(addressId: string): Promise<Address> {
    const address = await this.repository.findById<AddressData>(addressId)
    if (!address) throw new EntityNotFound('Address')

    return new Address(address)
  }
}
