import { type Profile, type ProfileData } from '../entity/Profile'

import EntityNotFound from '@/errors/EntityNotFound'
import NotAllowed from '@/errors/NotAllowed'
import { type ProfileRepository } from '@/repositories/ProfileRepository'

export type UpdateProfileDTO = Partial<Omit<ProfileData, 'id' | 'userId'>>

export class UpdateProfile {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(
    userId: string,
    profileId: string,
    data: UpdateProfileDTO
  ): Promise<Profile> {
    const profile = await this.repository.findById<Profile>(profileId)
    if (!profile) throw new EntityNotFound('Profile')

    if (userId !== profile.userId) {
      throw new EntityNotFound('Profile')
    }

    if (data.email && profile.email !== data.email) {
      const emailAlreadyExists = await this.repository.findByEmail(data.email)
      if (emailAlreadyExists) throw new NotAllowed('Email already exists')
    }

    const isIndividual = (data.type ?? profile.type) === 'INDIVIDUAL'
    const isJuridical = (data.type ?? profile.type) === 'JURIDICAL'

    if (data.cpf && isIndividual) {
      const documentAlreadyExists = await this.repository.findByDocument({
        type: 'INDIVIDUAL',
        value: data.cpf
      })
      if (documentAlreadyExists) throw new NotAllowed('CPF already exists')
    }

    if (data.cnpj && isJuridical) {
      const documentAlreadyExists = await this.repository.findByDocument({
        type: 'JURIDICAL',
        value: String(data.cnpj)
      })
      if (documentAlreadyExists) throw new NotAllowed('CNPJ already exists')
    }

    const profileUpdated = await this.repository.update(profileId, data)
    return profileUpdated
  }
}
