// @flow
import { Map, List } from 'immutable'
import type { State } from './types'

export const createBoard = ({ size }) =>
  List().setSize(size).map(() => List().setSize(size).map(() => null))

export const placeRandomTilesFactory = random => ({ numberOfRandomTiles = 0, board }) => {
  if (numberOfRandomTiles === 0 || board.flatten().filter(tile => !tile).size === 0) {
    return board
  }
  // place one random tile
  // we place a 2 or 4
  const decider = random(0, 1, true)
  const value = decider < 0.9 ? 2 : 4
  const randomPosition = [random(board.size - 1), random(board.size - 1)]
  const canPlaceTile = board.getIn(randomPosition) === null
  // we need to place more tiles
  if (canPlaceTile) {
    const boardWithRandomTile = board.setIn(randomPosition, value)
    return placeRandomTilesFactory(random)({
      numberOfRandomTiles: numberOfRandomTiles - 1,
      board: boardWithRandomTile,
    })
  }
  // we cant place a tile here so we simply try again
  return placeRandomTilesFactory(random)({ numberOfRandomTiles, board })
}

export const init = ({ size, startTiles, random }): State => {
  const emptyBoard = createBoard({ size })
  const placeRandomTiles = placeRandomTilesFactory(random)
  const board = placeRandomTiles({ numberOfRandomTiles: startTiles, board: emptyBoard })
  return Map({
    board,
    score: 0,
    final: false,
  })
}
