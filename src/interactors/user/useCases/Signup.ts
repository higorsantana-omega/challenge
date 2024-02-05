import { type UserRepository } from 'src/repositories/UserRepository'

import NotAllowed from '../../../errors/NotAllowed'
import toolbox from '../../../toolbox/toolbox'
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
    if (userExists) throw new NotAllowed('Email already exists')

    const userData: Omit<UserData, 'id'> = {
      name: data.name,
      email: data.email,
      password: toolbox.encrypt(data.password)
    }

    const user = await this.repository.save(userData)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new User(user as unknown as any)
  }
}
