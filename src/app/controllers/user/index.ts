import { LoginController } from './LoginController'
import { SignupController } from './SignupController'
import type Route from '../Route'

const userRoutes: Route[] = [
  {
    url: '/signup',
    method: 'POST',
    Controller: SignupController
  },
  {
    url: '/login',
    method: 'POST',
    Controller: LoginController
  }
]

export default userRoutes
