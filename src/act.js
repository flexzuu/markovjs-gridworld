// @flow
import { List } from 'immutable'
import { random } from 'lodash'
import type { Action, State } from './types'
import { ACTIONS } from './constants'
import { placeRandomTilesFactory } from './state'

const placeRandomTile = state =>
  state.update('board', board => placeRandomTilesFactory(random)({ numberOfRandomTiles: 1, board }))

export const reverseRows = state => state.update('board', board => board.map(row => row.reverse()))

export const swapBoard = state =>
  state.update('board', board => {
    const firstRow = board.first()
    const restRows = board.rest()
    return firstRow.zip(...restRows).map(row => List(row))
  })

export const actRight = state => {
  let scoreForRound = 0
  const updateBoard = state.update('board', board =>
    board.map(row =>
      row
        .reverse()
        .reduce((res, tile) => {
          if (res.size < 1) return res.push(tile)
          const butLast = res.butLast()
          const last = res.last()
          if (last !== null && tile !== null && last === tile) {
            const newTile = last + tile
            scoreForRound += newTile
            return butLast.push(null, newTile)
          }
          return butLast.push(last, tile)
        }, List())
        .reverse()
        .sort((a, b) => {
          if (a === null) return -1
          if (b === null) return 1
          return 0
        }),
    ),
  )
  const updateScore = updateBoard.update('score', score => score + scoreForRound)
  return updateScore
}
export const actLeft = state => {
  const reversedRow = reverseRows(state)
  const acted = actRight(reversedRow)
  return reverseRows(acted)
}
export const actDown = state => {
  const swappedBoard = swapBoard(state)
  const acted = actRight(swappedBoard)
  return swapBoard(acted)
}
export const actUp = state => {
  const swappedBoard = swapBoard(state)
  const acted = actLeft(swappedBoard)
  return swapBoard(acted)
}
export default (state: State, action: Action): State => {
  let newState = null
  switch (action) {
    case ACTIONS.RIGHT:
      newState = actRight(state)
      break
    case ACTIONS.LEFT:
      newState = actLeft(state)
      break
    case ACTIONS.DOWN:
      newState = actDown(state)
      break
    case ACTIONS.UP:
      newState = actUp(state)
      break
    default:
      newState = state
      break
  }
  return placeRandomTile(newState)
}
