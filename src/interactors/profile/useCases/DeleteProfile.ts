import { type ProfileData } from '../entity/Profile'

import EntityNotFound from '@/errors/EntityNotFound'
import { type ProfileRepository } from '@/repositories/ProfileRepository'

export interface CreateProfileDTO extends ProfileData {}

export class DeleteProfile {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(userId: string, profileId: string): Promise<void> {
    const profile = await this.repository.findOnyBy({ id: profileId })
    if (!profile) throw new EntityNotFound('Profile')

    if (profile.userId !== userId) {
      throw new EntityNotFound('Profile')
    }

    await this.repository.delete(profileId)
  }
}
