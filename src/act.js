// @flow
import { question } from 'readline-sync'
import { chain } from 'lodash'

import type { Action, State } from './types'
import { ENEMY, ROBSON, EMPTY } from './constants'
import { create } from './state'
import { state as stateToString } from './format'

export default (state: State, action: Action): State => {
  console.log(state)
  const { turn, board, robson, enemy } = state
  const nextTurn = turn === ROBSON ? ENEMY : ROBSON
  let nextRobson = [...robson]
  let nextEnemy = [...enemy]
  if (action !== 9999 && turn === ROBSON) {
    console.log('robis action', action)
    nextRobson = [...nextRobson, action]
  }

  if (action !== 9999 && turn === ENEMY) {
    console.log(stateToString(state))
    console.log(
      chain(state.board.cols * state.board.rows)
        .range()
        .chunk(state.board.cols)
        .map(row => row.join(' '))
        .join('\n')
        .value(),
    )
    const enemyAction = parseInt(question('Your action? \n'), 10)
    nextEnemy = [...nextEnemy, enemyAction]
  }
  const nextState = {
    board,
    robson: nextRobson,
    enemy: nextEnemy,
    turn: nextTurn,
  }
  let nextWinner = state.winner
  if (nextRobson.length >= 4 || nextEnemy.length >= 4) {
    console.log(stateToString(nextState))
    const answer = question('Winner? r/e/N \n')
    nextWinner = answer === 'r' ? ROBSON : answer === 'e' ? ENEMY : EMPTY
  }

  return create(Object.assign({}, nextState, { winner: nextWinner }))
}
