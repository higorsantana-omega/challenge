import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

import { UserInteractor } from '../../../src/interactors/user'
import { type UserData } from '../../../src/interactors/user/entity/User'
import { type LoginDTO } from '../../../src/interactors/user/useCases/Login'
import { type UserRepository } from '../../../src/repositories/UserRepository'
import toolbox from '../../../src/toolbox/toolbox'

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

    repository.findByEmail.mockImplementation(
      async () => await Promise.resolve({ ...user, createdAt: new Date() })
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

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(user.email)
  })

  it('should throw error user not exists', async () => {
    const data: LoginDTO = {
      email: user.email,
      password: 'test2'
    }

    repository.findByEmail.mockImplementation(
      async () => await Promise.resolve(null)
    )

    const promise = userInteractor.login(data)

    await expect(promise).rejects.toThrow('User not found')

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(user.email)
  })

  it('should throw error if password is not same', async () => {
    const data: LoginDTO = {
      email: user.email,
      password: 'test2'
    }

    const promise = userInteractor.login(data)

    await expect(promise).rejects.toThrow('Incorrect password')

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(user.email)
  })
})
