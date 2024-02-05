import NotAllowed from '../../../errors/NotAllowed'
import { type ProfileRepository } from '../../../repositories/ProfileRepository'
import { Profile, type ProfileData } from '../entity/Profile'

export interface CreateProfileDTO extends ProfileData {}

export class CreateProfile {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(data: CreateProfileDTO): Promise<Profile> {
    const emailAlreadyExists = await this.repository.findByEmail(data.email)
    if (emailAlreadyExists) throw new NotAllowed('Email already exists')

    const profile = new Profile(data)

    if (profile.isJuridical()) {
      const documentAlreadyExists = await this.repository.findByDocument({
        type: 'JURIDICAL',
        value: String(data.cnpj)
      })
      if (documentAlreadyExists) throw new NotAllowed('CNPJ already exists')
    }

    if (profile.isIndividual()) {
      const documentAlreadyExists = await this.repository.findByDocument({
        type: 'INDIVIDUAL',
        value: data.cpf
      })
      if (documentAlreadyExists) throw new NotAllowed('CPF already exists')
    }

    const profileCreated = await this.repository.save(profile.toJSON())
    return profileCreated
  }
}
