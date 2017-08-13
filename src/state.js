// @flow
import { random } from 'lodash'
import type { State } from './types'
import { ENEMY, EMPTY, ROBSON } from './constants'

const proto = {
  toString(): string {
    const { robson, enemy } = (this: State)
    return [robson, enemy].toString()
  },
}
// random(1) ? ENEMY : ROBSON
const create = (state: State): State => (Object.assign(Object.create(proto), state): any)

const init = ({ size }: { size: number }): State =>
  create({
    board: { rows: size, cols: size },
    turn: ROBSON,
    robson: [],
    enemy: [],
    winner: EMPTY,
  })
export { init, create }
