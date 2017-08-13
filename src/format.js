import { ENTITIES } from './constants'

const stateTokenizer = ({ enemy, board: { rows, cols }, robson }) =>
  [...Array(rows).keys()].map((row: number) =>
    [...Array(cols).keys()].map(
      (col: number) =>
        enemy.includes(row * cols + col)
          ? ENTITIES.ENEMY
          : robson.includes(row * cols + col) ? ENTITIES.ROBSON : ENTITIES.EMPTY,
    ),
  )

const transitionTokenizer = ({ action, gameState: { robson: { r, c } }, nextGameState }) => {
  const tokens = stateTokenizer(nextGameState)
  tokens[r][c] = action
  return tokens
}

const state = s => stateTokenizer(s).map(a => a.join(' ')).join('\n')
const transition = t => transitionTokenizer(t).map(a => a.join(' ')).join('\n')
const episode = e => [...e].map(t => transition(t)).join('\n\n')

export { state, transition, episode }
