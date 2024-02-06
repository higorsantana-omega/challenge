import { faker } from '@faker-js/faker'
import { mock, type MockProxy } from 'jest-mock-extended'

import { ProfileInteractor } from '@/interactors/profile'
import { Profile } from '@/interactors/profile/entity/Profile'
import { type CreateProfileDTO } from '@/interactors/profile/useCases/CreateProfile'
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

  it('should create an profile', async () => {
    const id = faker.string.uuid()
    const data = {
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    } as unknown as CreateProfileDTO

    repository.findByEmail.mockImplementation(
      async () => await Promise.resolve(null)
    )
    repository.findByDocument.mockImplementation(
      async () => await Promise.resolve(null)
    )
    repository.save.mockImplementation(
      async () => await Promise.resolve({ ...data, id })
    )

    const profile = await profileInteractor.create(data)

    expect(profile).toEqual({ ...data, id })

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(data.email)

    expect(repository.findByDocument).toHaveBeenCalledTimes(1)
    expect(repository.findByDocument).toHaveBeenCalledWith({
      type: 'JURIDICAL',
      value: data.cnpj
    })

    expect(repository.save).toHaveBeenCalledTimes(1)
  })

  it('should return an error if email already exists', async () => {
    const id = faker.string.uuid()
    const data = {
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    } as unknown as CreateProfileDTO

    repository.findByEmail.mockImplementation(
      async () =>
        await Promise.resolve({
          cellphone: data.cellphone,
          cnpj: data.cnpj!,
          cpf: data.cpf,
          createdAt: new Date(),
          email: data.email,
          id,
          name: data.name,
          phone: data.phone,
          type: data.type,
          userId: data.userId
        })
    )

    const promise = profileInteractor.create(data)

    await expect(promise).rejects.toThrow('Email already exists')

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(data.email)

    expect(repository.findByDocument).toHaveBeenCalledTimes(0)
    expect(repository.save).toHaveBeenCalledTimes(0)
  })

  it('should return an error if profile judicial already exists', async () => {
    const id = faker.string.uuid()
    const data = {
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cnpj: '68481958000185',
      cpf: '57536858469',
      type: 'JURIDICAL'
    } as unknown as CreateProfileDTO

    repository.findByEmail.mockImplementation(
      async () => await Promise.resolve(null)
    )

    repository.findByDocument.mockImplementation(
      async () =>
        await Promise.resolve(
          new Profile({
            cellphone: data.cellphone,
            cnpj: data.cnpj!,
            cpf: data.cpf,
            email: data.email,
            id,
            name: data.name,
            phone: data.phone,
            type: data.type,
            userId: data.userId
          })
        )
    )

    const promise = profileInteractor.create(data)

    await expect(promise).rejects.toThrow('CNPJ already exists')

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(data.email)

    expect(repository.findByDocument).toHaveBeenCalledTimes(1)
    expect(repository.findByDocument).toHaveBeenCalledWith({
      type: 'JURIDICAL',
      value: data.cnpj
    })

    expect(repository.save).toHaveBeenCalledTimes(0)
  })

  it('should return an error if profile individual already exists', async () => {
    const id = faker.string.uuid()
    const data = {
      userId: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cellphone: '(11) 3344-6360',
      phone: '(11) 3344-6360',
      cpf: '57536858469',
      type: 'INDIVIDUAL'
    } as unknown as CreateProfileDTO

    repository.findByEmail.mockImplementation(
      async () => await Promise.resolve(null)
    )

    repository.findByDocument.mockImplementation(
      async () =>
        await Promise.resolve(
          new Profile({
            cellphone: data.cellphone,
            cpf: data.cpf,
            email: data.email,
            id,
            name: data.name,
            phone: data.phone,
            type: data.type,
            userId: data.userId
          })
        )
    )

    const promise = profileInteractor.create(data)

    await expect(promise).rejects.toThrow('CPF already exists')

    expect(repository.findByEmail).toHaveBeenCalledTimes(1)
    expect(repository.findByEmail).toHaveBeenCalledWith(data.email)

    expect(repository.findByDocument).toHaveBeenCalledTimes(1)
    expect(repository.findByDocument).toHaveBeenCalledWith({
      type: 'INDIVIDUAL',
      value: data.cpf
    })

    expect(repository.save).toHaveBeenCalledTimes(0)
  })
})
