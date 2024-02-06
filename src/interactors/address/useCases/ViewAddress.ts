import { type AddressRepository } from 'src/repositories/AddressRepository'

import { type Address } from '../entity/Address'

export class ViewAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(profileId: string): Promise<Address | null> {
    const address = await this.repository.findByProfileId(profileId)
    return address
  }
}
