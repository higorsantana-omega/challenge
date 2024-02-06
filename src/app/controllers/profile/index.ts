import { CreateProfileController } from './CreateProfileController'
import { DeleteProfileController } from './DeleteProfileController'
import { UpdateProfileController } from './UpdateProfileController'
import { ViewProfileController } from './ViewProfileController'
import type Route from '../Route'

const profileRoutes: Route[] = [
  {
    url: '/profile',
    method: 'POST',
    Controller: CreateProfileController
  },
  {
    url: '/profile/:profileId',
    method: 'GET',
    Controller: ViewProfileController
  },
  {
    url: '/profile/:profileId',
    method: 'PATCH',
    Controller: UpdateProfileController
  },
  {
    url: '/profile/:profileId',
    method: 'DELETE',
    Controller: DeleteProfileController
  }
]

export default profileRoutes
