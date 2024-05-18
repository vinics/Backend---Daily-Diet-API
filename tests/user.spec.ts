import { afterAll, beforeAll, describe, expect, it, beforeEach } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'
import { execSync } from 'child_process'
import { knex } from '../src/database'

beforeAll(async () => {
  await app.ready()
})

beforeEach(() => {
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})

afterAll(async () => {
  await app.close()
})

const SAMPLE = {
  user1: {
    name: 'Vinics',
    email: 'vinics.dr@gmail.com',
    password: '123456',
  },
  userWithoutName: {
    email: 'vinics.dr@gmail.com',
    password: '123456',
  },
  userWithoutEmail: {
    name: 'Vinics',
    password: '123456',
  },
  userWithoutPassword: {
    name: 'Vinics',
    email: 'vinics.dr@gmail.com',
  },
  userEmpty: {},
}

describe(`USER test suit`, () => {
  it('should be able to create a user', async () => {
    await request(app.server).post('/users').send(SAMPLE.user1).expect(201)

    const createdUser = await knex('users').where({ email: SAMPLE.user1.email })
    expect(createdUser).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: SAMPLE.user1.name,
          email: SAMPLE.user1.email,
          password: SAMPLE.user1.password,
        }),
      ]),
    )
  })

  it('should NOT be able to create a user with incorrect body', async () => {
    await request(app.server).post('/users').send(SAMPLE.userEmpty).expect(400)
    await request(app.server)
      .post('/users')
      .send(SAMPLE.userWithoutEmail)
      .expect(400)
    await request(app.server)
      .post('/users')
      .send(SAMPLE.userWithoutName)
      .expect(400)
    await request(app.server)
      .post('/users')
      .send(SAMPLE.userWithoutPassword)
      .expect(400)
  })

  it('should be able to log a user in', async () => {
    await request(app.server).post('/users').send(SAMPLE.user1)

    const authResponse = await request(app.server)
      .post('/users/auth')
      .send({ email: SAMPLE.user1.email, password: SAMPLE.user1.password })
      .expect(201)

    const cookie = authResponse.get('Set-Cookie')

    expect(cookie).toBeDefined()
  })

  it('should NOT be able to log a user with the incorrect credentials', async () => {
    await request(app.server).post('/users/auth').send(SAMPLE.user1).expect(401)
  })
})
