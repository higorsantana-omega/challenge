import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

import { UserInteractor } from '../../../src/interactors/user'
import { User } from '../../../src/interactors/user/entity/User'
import { type SignupDTO } from '../../../src/interactors/user/useCases/Signup'
import { type UserRepository } from '../../../src/repositories/UserRepository'

describe('Signup', () => {
  let userInteractor: UserInteractor

  let repository: MockProxy<UserRepository>

  beforeAll(() => {
    repository = mock()
    userInteractor = new UserInteractor(repository)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create an account', async () => {
    repository.save.mockImplementation(
      async (value: any) =>
        await Promise.resolve({
          id: faker.string.uuid(),
          name: value.name,
          email: value.email,
          password: value.password,
          createdAt: new Date()
        })
    )

    const data: SignupDTO = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: 'test'
    }

    const user = await userInteractor.signup(data)

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(data.email)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith(data)

    expect(user).toBeInstanceOf(User)
  })
})
