import { type ShowUserDTO, User, type UserData } from '../entity/User'

import NotAllowed from '@/errors/NotAllowed'
import { type UserRepository } from '@/repositories/UserRepository'
import toolbox from '@/toolbox/toolbox'

export interface SignupDTO {
  name: string
  email: string
  password: string
}

export class Signup {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: SignupDTO): Promise<ShowUserDTO> {
    const userExists = await this.repository.findOnyBy({ email: data.email })
    if (userExists) throw new NotAllowed('Email already exists')

    const userData: Omit<UserData, 'id'> = {
      name: data.name,
      email: data.email,
      password: toolbox.encrypt(data.password)
    }

    const user = await this.repository.save(new User(userData as UserData))

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail()
    }
  }
}
