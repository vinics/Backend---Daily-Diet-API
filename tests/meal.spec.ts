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

describe(`MEAL test suit`, () => {
  it.todo('should be able to register a new MEAL')
  it.todo('should NOT be able to register a MEAL with incorrect body')
  it.todo('should be able to update a MEAL')
  it.todo('should be able to remove a MEAL')
  it.todo('should be able to list all MEAL from a USER')
  it.todo('should be able to get a single MEAL')
  it.todo('should NOT be able to allow a MEAL change from a different USER')
})
