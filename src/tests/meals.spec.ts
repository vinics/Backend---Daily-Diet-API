import { describe, it } from 'vitest'

describe('Meals tests', () => {
  it.todo(
    'should be able to register a MEAL with "name", "description", "datetime", "isOnDiet?"',
  )

  it.todo(
    'should be able to edit a MEAL ("name", "description", "dateTime", "isOnDiet?")',
  )

  it.todo('should NOT be able to edit a MEAL without a logged USER')

  it.todo('should NOT be able to register a MEAL without a logged USER')

  it.todo('should be able to delete a MEAL')

  it.todo('should NOT be able to delete a MEAL without a logged USER')

  it.todo('should be able to list all MEALS from logged user')

  it.todo('should NOT be able to list a MEAL from another USER')
})
