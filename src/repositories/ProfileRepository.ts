/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  type Prisma,
  type PrismaClient,
  type ProfileSchema
} from '@prisma/client'

import { type Repository } from './Repository'

import {
  Profile,
  type ProfileData,
  type ProfileType
} from '@/interactors/profile/entity/Profile'

type QueryableFields = Prisma.$ProfileSchemaPayload['scalars']

export class ProfileRepository implements Repository<Profile, QueryableFields> {
  private readonly model: PrismaClient['profileSchema']

  constructor(private readonly prismaClient: PrismaClient) {
    this.model = this.prismaClient.profileSchema
  }

  async findOnyBy(
    fields: Partial<QueryableFields>
  ): Promise<Profile | undefined> {
    const profile = await this.model.findFirst({
      where: fields
    })
    if (!profile) return

    return Profile.createFrom({
      ...profile,
      cnpj: profile.cnpj ? profile.cnpj : undefined
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
      profile = await this.model.findFirst({
        where: { type: 'JURIDICAL', cnpj: value }
      })
    }

    if (type === 'INDIVIDUAL') {
      profile = await this.model.findFirst({
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

  async save(entity: Profile): Promise<Profile> {
    const profile = await this.model.create({
      data: entity.serialize()
    })

    return Profile.createFrom({
      ...profile,
      cnpj: profile.cnpj ? profile.cnpj : undefined
    })
  }

  async delete(profileId: string): Promise<void> {
    await this.model.delete({
      where: { id: profileId }
    })
  }

  async update(
    profileId: string,
    entity: Partial<ProfileData>
  ): Promise<Profile> {
    const profile = await this.model.update({
      data: entity,
      where: { id: profileId }
    })

    return Profile.createFrom({
      ...profile,
      cnpj: profile.cnpj ? profile.cnpj : undefined
    })
  }
}
