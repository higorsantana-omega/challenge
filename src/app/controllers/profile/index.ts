import { CreateProfileController } from './CreateProfileController'
import type Route from '../Route'

const profileRoutes: Route[] = [
  {
    url: '/profile',
    method: 'POST',
    Controller: CreateProfileController
  }
]

export default profileRoutes
