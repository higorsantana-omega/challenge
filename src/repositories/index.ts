import { PrismaClient } from '@prisma/client'

import { UserRepository } from './UserRepository'

export interface Repositories {
  account: UserRepository
}

export function createRepositories(): Repositories {
  const client = new PrismaClient()

  return {
    account: new UserRepository(client)
  }
}
