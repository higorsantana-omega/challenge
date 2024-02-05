import { type AddressRepository } from 'src/repositories/AddressRepository'

import { type Address } from './entity/Address'
import { CreateAddress, type CreateAddressDTO } from './useCases/CreateAddress'
import { UpdateAddress, type UpdateAddressDTO } from './useCases/UpdateAddress'
import { ViewAddress } from './useCases/ViewAddress'
import { BaseInteractor } from '../BaseInteractor'

export class AddressInteractor extends BaseInteractor<AddressRepository> {
  async create(data: CreateAddressDTO): Promise<Address> {
    const createAddress = new CreateAddress(this.repository)
    return await createAddress.execute(data)
  }

  async update(addressId: string, data: UpdateAddressDTO): Promise<Address> {
    const updateAddress = new UpdateAddress(this.repository)
    return await updateAddress.execute(addressId, data)
  }

  async view(addressId: string): Promise<Address> {
    const viewAddress = new ViewAddress(this.repository)
    return await viewAddress.execute(addressId)
  }
}
