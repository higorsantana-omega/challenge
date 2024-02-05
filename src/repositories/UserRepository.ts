import { type PrismaClient, type UserSchema } from '@prisma/client'

import { type Repository } from './Repository'

export class UserRepository implements Repository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById(id: string) {
    return await this.prismaClient.userSchema.findFirst({
      where: { id }
    })
  }

  async findByEmail(email: string) {
    return await this.prismaClient.userSchema.findFirst({
      where: { email }
    })
  }

  async save<T>(entity: T) {
    return await this.prismaClient.userSchema.create({
      data: entity as UserSchema
    })
  }
}
