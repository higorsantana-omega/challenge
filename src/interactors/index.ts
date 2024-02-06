import { AddressInteractor } from './address'
import { ProfileInteractor } from './profile'
import { UserInteractor } from './user'

import { type Repositories } from '@/repositories'

export type Interactors = ReturnType<typeof createInteractors>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInteractors(repositories: Repositories) {
  return {
    user: new UserInteractor(repositories.account),
    profile: new ProfileInteractor(repositories.profile),
    address: new AddressInteractor(repositories.address)
  }
}
