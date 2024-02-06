/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type PrismaClient, type ProfileSchema } from '@prisma/client'

import { type Repository } from './Repository'

import {
  Profile,
  type ProfileData,
  type ProfileType
} from '@/interactors/profile/entity/Profile'

export class ProfileRepository implements Repository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById<Profile>(id: string): Promise<Profile> {
    const profile = await this.prismaClient.profileSchema.findFirst({
      where: { id }
    })

    return (
      profile
        ? new Profile({
            id: profile.id,
            userId: profile.userId,
            name: profile.name,
            email: profile.email,
            cellphone: profile.cellphone,
            cpf: profile.cpf,
            phone: profile.phone,
            type: profile.type,
            cnpj: profile?.cnpj ? profile.cnpj : undefined
          })
        : null
    ) as Profile
  }

  async findByEmail(email: string) {
    return await this.prismaClient.profileSchema.findFirst({
      where: { email }
    })
  }

  async findByDocument({
    type,
    value
  }: {
    type: ProfileType
    value: string
  }): Promise<Profile | null> {
    let profile = {} as unknown as ProfileSchema | null

    if (type === 'JURIDICAL') {
      profile = await this.prismaClient.profileSchema.findFirst({
        where: { type: 'JURIDICAL', cnpj: value }
      })
    }

    if (type === 'INDIVIDUAL') {
      profile = await this.prismaClient.profileSchema.findFirst({
        where: { type: 'INDIVIDUAL', cpf: value }
      })
    }

    return profile
      ? new Profile({
          id: profile.id,
          userId: profile.userId,
          name: profile.name,
          email: profile.email,
          cellphone: profile.cellphone,
          cpf: profile.cpf,
          phone: profile.phone,
          type: profile.type,
          cnpj: profile?.cnpj ? profile.cnpj : undefined
        })
      : null
  }

  async save<T>(entity: T): Promise<T> {
    return (await this.prismaClient.profileSchema.create({
      data: entity as ProfileSchema
    })) as unknown as T
  }

  async delete(profileId: string): Promise<void> {
    await this.prismaClient.profileSchema.delete({
      where: { id: profileId }
    })
  }

  async update(
    profileId: string,
    entity: Partial<ProfileData>
  ): Promise<Profile> {
    const profile = await this.prismaClient.profileSchema.update({
      data: entity,
      where: { id: profileId }
    })
    return new Profile({
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      cellphone: profile.cellphone,
      cpf: profile.cpf,
      phone: profile.phone,
      type: profile.type,
      cnpj: profile?.cnpj ? profile.cnpj : undefined
    })
  }
}
