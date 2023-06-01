import fastify from 'fastify'
import knex from 'knex'
import { ZodError, z } from 'zod'
import { env } from './config/env'
import { randomUUID } from 'crypto'

export const app = fastify()

app.post('/user/register', async (request, reply) => {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = createUserBodySchema.parse(request.body)

  const userAlreadyExists = await knex('users').where('email', email).select()

  if (userAlreadyExists) {
    return reply.status(409).send({
      message: 'User already registered on database',
    })
  }

  await knex('users').insert({
    id: randomUUID(),
    email,
    password_hash,
  })

  return reply.status(201).send()
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
