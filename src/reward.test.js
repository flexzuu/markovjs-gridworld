import reward from './reward'
import { init } from './state'
import { actRight } from './act'

const initState = size => init({ size, startTiles: 0, random: () => {} })

describe('reward', () => {
  test('a full board of 2s gets transformed', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const nextState = actRight(state)
    const result = reward(nextState, state)
    expect(result).toEqual(31.99)
  })
  test('a single 2s gets transformed', () => {
    const state = initState(4).update('board', board =>
      board.map((row, rowIndex) =>
        row.map((tile, index) => (rowIndex === 0 && index === 0 ? 2 : null)),
      ),
    )
    const nextState = actRight(state)
    const result = reward(nextState, state)
    expect(result).toEqual(-0.01)
  })
})
