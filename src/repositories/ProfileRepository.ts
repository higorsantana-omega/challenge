/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type PrismaClient, type ProfileSchema } from '@prisma/client'
import {
  Profile,
  type ProfileType
} from 'src/interactors/profile/entity/Profile'

import { type Repository } from './Repository'

export class ProfileRepository implements Repository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById<T>(id: string): Promise<T> {
    return (await this.prismaClient.profileSchema.findFirst({
      where: { id }
    })) as unknown as T
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
}
