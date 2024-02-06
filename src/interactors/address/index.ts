import { type Address } from './entity/Address'
import { CreateAddress, type CreateAddressDTO } from './useCases/CreateAddress'
import { UpdateAddress, type UpdateAddressDTO } from './useCases/UpdateAddress'
import { ViewAddress } from './useCases/ViewAddress'
import { BaseInteractor } from '../BaseInteractor'

import { type AddressRepository } from '@/repositories/AddressRepository'

export class AddressInteractor extends BaseInteractor<AddressRepository> {
  async create(data: CreateAddressDTO): Promise<Address> {
    const createAddress = new CreateAddress(this.repository)
    return await createAddress.execute(data)
  }

  async update(addressId: string, data: UpdateAddressDTO): Promise<Address> {
    const updateAddress = new UpdateAddress(this.repository)
    return await updateAddress.execute(addressId, data)
  }

  async viewByProfileId(profileId: string): Promise<Address | null> {
    const viewAddress = new ViewAddress(this.repository)
    return await viewAddress.execute(profileId)
  }
}
