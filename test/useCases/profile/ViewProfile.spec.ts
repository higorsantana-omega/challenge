import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

import { ProfileInteractor } from '@/interactors/profile'
import { type ProfileRepository } from '@/repositories/ProfileRepository'

describe('ViewProfile', () => {
  let profileInteractor: ProfileInteractor

  let repository: MockProxy<ProfileRepository>

  beforeAll(() => {
    repository = mock()
    profileInteractor = new ProfileInteractor(repository)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should view an profile', async () => {
    const data = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    }

    repository.findById.mockImplementation(
      async () => await Promise.resolve(data)
    )

    const profile = await profileInteractor.view(data.userId, data.id)

    expect(profile).toEqual(data)

    expect(repository.findById).toHaveBeenCalledTimes(1)
    expect(repository.findById).toHaveBeenCalledWith(data.id)
  })

  it('should throw error if profile not exists', async () => {
    const data = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    }

    repository.findById.mockImplementation(
      async () => null
    )

    const promise = profileInteractor.view(data.userId, 'not-exists')

    await expect(promise).rejects.toThrow('Profile not found')

    expect(repository.findById).toHaveBeenCalledTimes(1)
    expect(repository.findById).toHaveBeenCalledWith('not-exists')
  })

  it('should throw error if profile not same userId', async () => {
    const data = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    }

    repository.findById.mockImplementation(
      async () => await Promise.resolve(data)
    )

    const promise = profileInteractor.view('not-exists', data.id)

    await expect(promise).rejects.toThrow('Profile not found')

    expect(repository.findById).toHaveBeenCalledTimes(1)
    expect(repository.findById).toHaveBeenCalledWith(data.id)
  })
})
