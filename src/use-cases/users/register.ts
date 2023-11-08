import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { EmailAlreadyExistsError } from '../errors/email-aready-exists-error'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  lastName: string
  email: string
  password: string
  avatarUrl?: string
  tellphone?: string
  jobLevel?: 'estagiario' | 'trainee' | 'junior' | 'pleno' | 'senior'
  aboutMe?: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    lastName,
    email,
    password,
    avatarUrl,
    tellphone,
    jobLevel,
    aboutMe,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      email,
      last_name: lastName,
      name,
      avatar_url: avatarUrl,
      tellphone,
      job_level: jobLevel,
      about_me: aboutMe,
      password: passwordHash,
    })

    return {
      user,
    }
  }
}
