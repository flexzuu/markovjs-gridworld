import { List, Map } from 'immutable'
import { availableActions, toActions, getFinalStates } from './actions'

test('should return all actions', () => {
  expect(availableActions).toEqual(['↓', '←', '→', '↑'])
})

describe('toActions', () => {
  test('should map to actions', () => {
    const actions = toActions(['↓', '←', '→', '↑'], [false, false, false, false])
    expect(actions).toEqual(['↓', '←', '→', '↑'])
  })
  test('should map to end actions', () => {
    const actions = toActions(['↓', '←', '→', '↑'], [true, true, true, true])
    expect(actions).toEqual(['END'])
  })
  test('should map to some actions', () => {
    const actions = toActions(['↓', '←', '→', '↑'], [true, false, true, false])
    expect(actions).toEqual(['←', '↑'])
  })
})

test('get all final states', () => {
  const state = Map({
    board: List([List([2, 2, 2, 2]), List([2, 2, 2, 2]), List([2, 2, 2, 2]), List([2, 2, 2, 2])]),
    score: 416,
  })
  const finalStates = getFinalStates(state)
  expect(finalStates).toEqual([false, false, false, false])
})
