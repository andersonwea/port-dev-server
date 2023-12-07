import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let usersRepository: UsersRepository
  let authenticateUseCase: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'example@email.com',
      last_name: 'ronaldo',
      name: 'Cristiano',
      password: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'example@email.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Cristiano',
        last_name: 'ronaldo',
      })
    )
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'example@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'example@email.com',
      last_name: 'ronaldo',
      name: 'Cristiano',
      password: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'example@email.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
