import { PrismaClient } from '@prisma/client'

import { AddressRepository } from './AddressRepository'
import { ProfileRepository } from './ProfileRepository'
import { UserRepository } from './UserRepository'

export interface Repositories {
  account: UserRepository
  profile: ProfileRepository
  address: AddressRepository
}

export function createRepositories(): Repositories {
  const client = new PrismaClient()

  return {
    account: new UserRepository(client),
    profile: new ProfileRepository(client),
    address: new AddressRepository(client)
  }
}
