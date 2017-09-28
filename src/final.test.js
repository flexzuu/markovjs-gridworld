import { List, Map } from 'immutable'
import final from './final'
import { init } from './state'

const initState = size => init({ size, startTiles: 0, random: () => {} })

describe('final', () => {
  test('detects if final', () => {
    let i = 0
    const state = initState(4).update('board', board =>
      board.map(row => row.map(tile => 2 ** (i += 1))),
    )
    const isFinal = final(state)
    expect(isFinal).toBe(true)
  })
  test('detects if final', () => {
    const state = Map({
      board: List([
        List([32, 2, 16, 8]),
        List([2, 32, 8, 4]),
        List([16, 8, 4, 2]),
        List([8, 4, 2, 4]),
      ]),
      score: 416,
    })
    const isFinal = final(state)
    expect(isFinal).toBe(true)
  })
  test('detects if not final', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const isFinal = final(state)
    expect(isFinal).toBe(false)
  })
  test('detects if not final', () => {
    const state = initState(4).update('board', board =>
      board.map((row, i) => row.map(() => (i === 0 ? 2 : null))),
    )
    const isFinal = final(state)
    expect(isFinal).toBe(false)
  })
})
