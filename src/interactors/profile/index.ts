import { type Profile } from './entity/Profile'
import { CreateProfile, type CreateProfileDTO } from './useCases/CreateProfile'
import { UpdateProfile, type UpdateProfileDTO } from './useCases/UpdateProfile'
import { type ProfileRepository } from '../../repositories/ProfileRepository'
import { BaseInteractor } from '../BaseInteractor'

export class ProfileInteractor extends BaseInteractor<ProfileRepository> {
  async create(data: CreateProfileDTO): Promise<Profile> {
    const createProfile = new CreateProfile(this.repository)
    return await createProfile.execute(data)
  }

  async update(
    userId: string,
    profileId: string,
    data: UpdateProfileDTO
  ): Promise<Profile> {
    const updateProfile = new UpdateProfile(this.repository)
    return await updateProfile.execute(userId, profileId, data)
  }
}
