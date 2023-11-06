import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function create() {
  const user = await prisma.user.create({
    data: {
      email: 'email',
      last_name: 'last_name',
      name: 'name',
      password: 'XXXXXXXX',
    },
  })

  const project = await prisma.project.create({
    data: {
      deploy_url: 'teste',
      source_code: 'teste',
      title: 'teste',
      description: 'teste',
      user_id: user.id,
    },
  })

  await prisma.portfolio.create({
    data: {
      user_id: user.id,
      projects: {
        connect: {
          id: project.id,
        },
      },
    },
  })

  const portfolio = await prisma.portfolio.findFirst({
    where: {
      user_id: user.id,
    },
    include: {
      projects: true,
    },
  })

  if (portfolio) {
    console.log({
      portfolio,
      projects: portfolio.projects,
    })
  }
}

create()
