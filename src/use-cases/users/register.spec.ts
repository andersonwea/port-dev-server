import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepository } from '../../repositories/users-repository'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcrypt'
import { EmailAlreadyExistsError } from '../errors/email-aready-exists-error'

describe('Register Use Case', () => {
  let usersRepository: UsersRepository
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      email: 'example@email.com',
      lastName: 'ronaldo',
      name: 'Cristiano',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register user', async () => {
    const { user } = await registerUseCase.execute({
      email: 'example@email.com',
      lastName: 'ronaldo',
      name: 'Cristiano',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Cristiano',
        last_name: 'ronaldo',
      })
    )
  })

  it('should not be able register twice with same email.', async () => {
    await registerUseCase.execute({
      email: 'example@email.com',
      lastName: 'ronaldo',
      name: 'Cristiano',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        email: 'example@email.com',
        lastName: 'ronaldo',
        name: 'Cristiano',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
