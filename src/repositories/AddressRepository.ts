/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type AddressSchema, type PrismaClient } from '@prisma/client'

import { type Repository } from './Repository'

import { Address, type AddressData } from '@/interactors/address/entity/Address'

export class AddressRepository implements Repository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById<T>(id: string): Promise<T> {
    return (await this.prismaClient.addressSchema.findFirst({
      where: { id }
    })) as unknown as T
  }

  async findByProfileId(profileId: string): Promise<Address | null> {
    const address = await this.prismaClient.addressSchema.findFirst({
      where: { profileId }
    })
    return address ? new Address(address as AddressData) : null
  }

  async save<T>(entity: T): Promise<T> {
    return (await this.prismaClient.addressSchema.create({
      data: entity as AddressSchema
    })) as unknown as T
  }

  async update(
    addressId: string,
    entity: Partial<AddressData>
  ): Promise<Address> {
    const address = await this.prismaClient.addressSchema.update({
      data: entity,
      where: { id: addressId }
    })
    return new Address({
      id: address.id,
      cep: address.cep,
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      profileId: address.profileId,
      state: address.state,
      street: address.street,
      complement: address.complement ? address.complement : undefined
    })
  }
}
