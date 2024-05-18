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

describe(`METRIC test suit`, () => {
  it.todo('should be able to get metrics from user')
})
