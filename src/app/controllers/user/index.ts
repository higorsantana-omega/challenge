import { SignupController } from './SignupController'
import type Route from '../Route'

const userRoutes: Route[] = [
  {
    url: '/signup',
    method: 'POST',
    Controller: SignupController
  }
]

export default userRoutes
