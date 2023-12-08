import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Get User Profile Use Case', () => {
  let usersRepository: UsersRepository
  let getUserProfileUseCase: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'example@email.com',
      last_name: 'ronaldo',
      name: 'Cristiano',
      password: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Cristiano',
        last_name: 'ronaldo',
      })
    )
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
