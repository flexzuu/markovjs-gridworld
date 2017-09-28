import { createBoard, placeRandomTilesFactory, init } from './state'
import { random } from 'lodash'
import { List } from 'immutable'

test('create empty board', () => {
  expect(createBoard({ size: 4 })).toMatchSnapshot()
})
describe('place random Tile', () => {
  test('place no tile', () => {
    const board = createBoard({ size: 4 })
    const pseudoRandom = (x, y, bool) => {
      if (x === 0 && y === 1 && bool) return 0.99
      return board.size
    }
    const placeRandomTiles = placeRandomTilesFactory(pseudoRandom)
    expect(placeRandomTiles({ board })).toMatchSnapshot()
  })
  test('place 1 tile with value 4 in bottom right', () => {
    const board = createBoard({ size: 4 })
    const pseudoRandom = (x, y, bool) => {
      if (x === 0 && y === 1 && bool) return 0.99
      return x
    }
    const placeRandomTiles = placeRandomTilesFactory(pseudoRandom)
    expect(placeRandomTiles({ board, numberOfRandomTiles: 1 })).toMatchSnapshot()
  })
  test('place 1 tile with value 2 in bottom right', () => {
    const board = createBoard({ size: 4 })
    const pseudoRandom = (x, y, bool) => {
      if (x === 0 && y === 1 && bool) return 0.1
      return x
    }
    const placeRandomTiles = placeRandomTilesFactory(pseudoRandom)
    expect(placeRandomTiles({ board, numberOfRandomTiles: 1 })).toMatchSnapshot()
  })
  test('place 1 tile with value 2 in top left', () => {
    const board = createBoard({ size: 4 })
    const pseudoRandom = (x, y, bool) => {
      if (x === 0 && y === 1 && bool) return 0.1
      return 0
    }
    const placeRandomTiles = placeRandomTilesFactory(pseudoRandom)
    expect(placeRandomTiles({ board, numberOfRandomTiles: 1 })).toMatchSnapshot()
  })
  test('place 3 tiles', () => {
    const board = createBoard({ size: 4 })
    const placeRandomTiles = placeRandomTilesFactory(random)
    expect(
      placeRandomTiles({ board, numberOfRandomTiles: 3 }).flatten().filter(tile => tile).size,
    ).toBe(3)
  })
  test('dont crash on full board', done => {
    const board = List([[2, 2], [2, 2]])
    const placeRandomTiles = placeRandomTilesFactory(random)
    placeRandomTiles({ board, numberOfRandomTiles: 1 })
    done()
  })
})

describe('init state', () => {
  test('with a board with 2 tiles', () => {
    const state = init({ size: 4, startTiles: 2, random })
    expect(state.get('board').flatten().filter(tile => tile).size).toBe(2)
  })
  test('with score of 0', () => {
    const state = init({ size: 4, startTiles: 2, random })
    expect(state.get('score')).toBe(0)
  })
  test('with a empty board', () => {
    expect(init({ size: 4, startTiles: 0, random })).toMatchSnapshot()
  })
})
