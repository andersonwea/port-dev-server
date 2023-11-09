import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '../../../use-cases/factories/users/make-register-use-case'
import { EmailAlreadyExistsError } from '../../../use-cases/errors/email-aready-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    avatarUrl: z.string().optional(),
    tellphone: z.string().optional(),
    jobLevel: z
      .enum(['estagiario', 'trainee', 'junior', 'pleno', 'senior'])
      .optional(),
    aboutMe: z.string().optional(),
  })

  const {
    aboutMe,
    avatarUrl,
    email,
    jobLevel,
    lastName,
    name,
    password,
    tellphone,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      aboutMe,
      avatarUrl,
      email,
      jobLevel,
      lastName,
      name,
      password,
      tellphone,
    })

    return reply.status(201).send({
      user: {
        ...user,
        password: undefined,
      },
    })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
