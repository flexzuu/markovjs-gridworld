// @flow
import type { Entity, Empty, Robson, Enemy } from './types'

const EMPTY: Empty = '⬚'
const ENEMY: Enemy = '💀'
const ROBSON: Robson = '🤖'
const ENTITIES: { [string]: Entity } = {
  EMPTY,
  ENEMY,
  ROBSON,
}
export { ENTITIES, EMPTY, ROBSON, ENEMY }
