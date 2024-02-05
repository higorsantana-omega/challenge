import { type Repositories } from 'src/repositories'

import { UserInteractor } from './user'

export type Interactors = ReturnType<typeof createInteractors>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createInteractors(repositories: Repositories) {
  return {
    user: new UserInteractor(repositories.account)
  }
}
