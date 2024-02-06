import { type ShowUserDTO } from '../entity/User'

import EntityNotFound from '@/errors/EntityNotFound'
import NotAuthorized from '@/errors/NotAuthorized'
import { type UserRepository } from '@/repositories/UserRepository'
import toolbox from '@/toolbox/toolbox'

export interface LoginDTO {
  email: string
  password: string
}

export class Login {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: LoginDTO): Promise<ShowUserDTO> {
    const user = await this.repository.findOnyBy({ email: data.email })
    if (!user) throw new EntityNotFound('User')

    const compareHash = toolbox.hashCompare(user.getPassword(), data.password)
    if (!compareHash) throw new NotAuthorized('Incorrect password')

    const showAccount: ShowUserDTO = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail()
    }

    return showAccount
  }
}
