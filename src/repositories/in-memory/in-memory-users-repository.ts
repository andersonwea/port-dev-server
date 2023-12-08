import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-01',
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      avatar_url: data.avatar_url ?? null,
      job_level: data.job_level ?? null,
      tellphone: data.tellphone ?? null,
      about_me: data.about_me ?? null,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
