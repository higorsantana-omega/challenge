import EntityNotFound from '../../../errors/EntityNotFound'
import { type ProfileRepository } from '../../../repositories/ProfileRepository'
import { type Profile, type ProfileData } from '../entity/Profile'

export interface CreateProfileDTO extends ProfileData {}

export class DeleteProfile {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(userId: string, profileId: string): Promise<void> {
    const profile = await this.repository.findById<Profile>(profileId)
    if (!profile) throw new EntityNotFound('Profile')

    if (profile.userId !== userId) {
      throw new EntityNotFound('Profile')
    }

    await this.repository.delete(profileId)
  }
}
