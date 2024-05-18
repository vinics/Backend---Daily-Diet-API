import { randomUUID } from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { UnauthorizedError } from '../errors/UnauthorizedError'

// prefix: 'users',
export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(req.body)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password,
    })

    return reply.status(201).send()
  })

  app.post('/auth', async (req, reply) => {
    const authUserBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = authUserBodySchema.parse(req.body)

    const targetUser = await knex('users').where({ email, password })

    if (!targetUser || targetUser.length === 0) {
      throw new UnauthorizedError(
        'Incorrect credentials, unable to authenticate',
      )
    }

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
    }

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    reply.status(201)
  })
}
