import { type Address } from '../entity/Address'

import { type AddressRepository } from '@/repositories/AddressRepository'

export class ViewAddress {
  constructor(private readonly repository: AddressRepository) {}

  async execute(profileId: string): Promise<Address | null> {
    const address = await this.repository.findOnyBy({ profileId })
    return address ?? null
  }
}
