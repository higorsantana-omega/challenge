import { type PrismaClient, type Prisma } from '@prisma/client'

import { type Repository } from './Repository'

import { User } from '@/interactors/user/entity/User'

type QueryableFields = Prisma.$UserSchemaPayload['scalars']
export class UserRepository implements Repository<User, QueryableFields> {
  private readonly model: PrismaClient['userSchema']

  constructor(private readonly prismaClient: PrismaClient) {
    this.model = this.prismaClient.userSchema
  }

  async findOnyBy(fields: Partial<QueryableFields>): Promise<User | undefined> {
    const user = await this.model.findFirst({
      where: fields
    })
    if (!user) return

    return User.createFrom(user)
  }

  async save(entity: User): Promise<User> {
    const user = await this.model.create({
      data: entity.serialize()
    })

    return User.createFrom(user)
  }
}
