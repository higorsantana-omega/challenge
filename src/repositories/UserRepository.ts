/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type PrismaClient, type UserSchema } from '@prisma/client'

import { type Repository } from './Repository'

export class UserRepository implements Repository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById<T>(id: string): Promise<T> {
    return (await this.prismaClient.userSchema.findFirst({
      where: { id }
    })) as unknown as T
  }

  async findByEmail(email: string) {
    return await this.prismaClient.userSchema.findFirst({
      where: { email }
    })
  }

  async save<T>(entity: T): Promise<T> {
    return (await this.prismaClient.userSchema.create({
      data: entity as UserSchema
    })) as unknown as T
  }
}
