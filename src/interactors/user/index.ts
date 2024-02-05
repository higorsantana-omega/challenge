import { type UserRepository } from 'src/repositories/UserRepository'

import { type ShowUserDTO } from './entity/User'
import { Login, type LoginDTO } from './useCases/Login'
import { Signup, type SignupDTO } from './useCases/Signup'
import { BaseInteractor } from '../BaseInteractor'

export class UserInteractor extends BaseInteractor<UserRepository> {
  async signup(data: SignupDTO): Promise<ShowUserDTO> {
    const signup = new Signup(this.repository)
    return await signup.execute(data)
  }

  async login(data: LoginDTO): Promise<ShowUserDTO> {
    const login = new Login(this.repository)
    return await login.execute(data)
  }
}
