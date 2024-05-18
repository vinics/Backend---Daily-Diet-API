import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { usersRoutes } from './routes/usersRoutes'
import { UnauthorizedError } from './errors/UnauthorizedError'

export const app = fastify()

app.setErrorHandler((error, req, reply) => {
  // console.log('>> New Error: ', error.message)

  if (error instanceof ZodError) {
    return reply.status(400).send(error.message)
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(error.status).send(error.message)
  }

  reply.status(500).send({ message: 'Uncaught error' })
})

app.register(cookie)

app.register(usersRoutes, {
  prefix: 'users',
})
