/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Prisma, type PrismaClient } from '@prisma/client'

import { type Repository } from './Repository'

import { Address, type AddressData } from '@/interactors/address/entity/Address'

type QueryableFields = Prisma.$AddressSchemaPayload['scalars']

export class AddressRepository implements Repository<Address, QueryableFields> {
  private readonly model: PrismaClient['addressSchema']

  constructor(private readonly prismaClient: PrismaClient) {
    this.model = prismaClient.addressSchema
  }

  async findOnyBy(
    fields: Partial<QueryableFields>
  ): Promise<Address | undefined> {
    const address = await this.model.findFirst({
      where: fields
    })
    if (!address) return

    return Address.createFrom({
      ...address,
      complement: address.complement ? address.complement : undefined
    })
  }

  async save(entity: Address): Promise<Address> {
    const address = await this.model.create({
      data: entity.serialize()
    })

    return Address.createFrom({
      ...address,
      complement: address.complement ? address.complement : undefined
    })
  }

  async update(
    addressId: string,
    entity: Partial<AddressData>
  ): Promise<Address> {
    const address = await this.model.update({
      data: entity,
      where: { id: addressId }
    })

    return Address.createFrom({
      ...address,
      complement: address.complement ? address.complement : undefined
    })
  }
}
