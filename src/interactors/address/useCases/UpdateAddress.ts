import EntityNotFound from 'src/errors/EntityNotFound'
import { type AddressRepository } from 'src/repositories/AddressRepository'

import { type Address, type AddressData } from '../entity/Address'

export type UpdateAddressDTO = Partial<Omit<AddressData, 'id' | 'profileId'>>

export class UpdateAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(addressId: string, data: UpdateAddressDTO): Promise<Address> {
    const addressExists = await this.repository.findById(addressId)
    if (!addressExists) throw new EntityNotFound('Address')

    const address = await this.repository.update(addressId, data)
    return address
  }
}
