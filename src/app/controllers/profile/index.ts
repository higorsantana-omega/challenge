import { CreateProfileController } from './CreateProfileController'
import { UpdateProfileController } from './UpdateProfileController'
import type Route from '../Route'

const profileRoutes: Route[] = [
  {
    url: '/profile',
    method: 'POST',
    Controller: CreateProfileController
  },
  {
    url: '/profile/:profileId',
    method: 'PATCH',
    Controller: UpdateProfileController
  }
]

export default profileRoutes
