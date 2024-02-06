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
    const userExists = await this.repository.findByEmail(data.email)
    if (userExists) throw new NotAllowed('Email already exists')

    const userData: Omit<UserData, 'id'> = {
      name: data.name,
      email: data.email,
      password: toolbox.encrypt(data.password)
    }

    const userCreated = await this.repository.save(userData)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = new User(userCreated as unknown as any)

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail()
    }
  }
}
