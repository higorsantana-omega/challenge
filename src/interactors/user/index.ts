import { type UserRepository } from 'src/repositories/UserRepository'

import { type User } from './entity/User'
import { Signup, type SignupDTO } from './useCases/Signup'
import { BaseInteractor } from '../BaseInteractor'

export class UserInteractor extends BaseInteractor<UserRepository> {
  async signup(data: SignupDTO): Promise<User> {
    const signup = new Signup(this.repository)
    return await signup.execute(data)
  }
}
