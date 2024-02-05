import { type UserRepository } from 'src/repositories/UserRepository'

import { User, type UserData } from '../entity/User'

export interface SignupDTO {
  name: string
  email: string
  password: string
}

export class Signup {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: SignupDTO): Promise<User> {
    const userExists = await this.repository.findByEmail(data.email)
    if (userExists) throw new Error('Email already exists')

    const userData: Omit<UserData, 'id'> = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    const user = await this.repository.save(userData)

    return new User(user)
  }
}
