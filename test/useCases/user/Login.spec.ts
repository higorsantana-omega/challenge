import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

import { UserInteractor } from '@/interactors/user'
import { User, type UserData } from '@/interactors/user/entity/User'
import { type LoginDTO } from '@/interactors/user/useCases/Login'
import { type UserRepository } from '@/repositories/UserRepository'
import toolbox from '@/toolbox/toolbox'

describe('Login', () => {
  let userInteractor: UserInteractor

  let repository: MockProxy<UserRepository>

  const user: UserData = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password: toolbox.encrypt('test')
  }

  beforeAll(() => {
    repository = mock()
    userInteractor = new UserInteractor(repository)
  })

  beforeEach(() => {
    jest.clearAllMocks()

    repository.findOnyBy.mockImplementation(
      async () => await Promise.resolve(new User({ ...user }))
    )
  })

  it('should login in an account', async () => {
    const data: LoginDTO = {
      email: user.email,
      password: 'test'
    }

    const showUser = await userInteractor.login(data)

    expect(showUser).toEqual({
      id: user.id,
      name: user.name,
      email: user.email
    })

    expect(repository.findOnyBy).toHaveBeenCalledTimes(1)
    expect(repository.findOnyBy).toHaveBeenCalledWith({ email: user.email })
  })

  it('should throw error user not exists', async () => {
    const data: LoginDTO = {
      email: user.email,
      password: 'test2'
    }

    repository.findOnyBy.mockImplementation()

    const promise = userInteractor.login(data)

    await expect(promise).rejects.toThrow('User not found')

    expect(repository.findOnyBy).toHaveBeenCalledTimes(1)
    expect(repository.findOnyBy).toHaveBeenCalledWith({ email: user.email })
  })

  it('should throw error if password is not same', async () => {
    const data: LoginDTO = {
      email: user.email,
      password: 'test2'
    }

    const promise = userInteractor.login(data)

    await expect(promise).rejects.toThrow('Incorrect password')

    expect(repository.findOnyBy).toHaveBeenCalledTimes(1)
    expect(repository.findOnyBy).toHaveBeenCalledWith({ email: user.email })
  })
})
