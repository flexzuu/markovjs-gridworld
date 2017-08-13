// @flow
export type Position = number
export type Action = Position
export type Enemy = '💀'
export type Empty = '⬚'
export type Robson = '🤖'
export type Player = Enemy | Robson
export type Entity = Player | Empty
export type State = {|
  board: { rows: number, cols: number },
  robson: Array<Position>,
  enemy: Array<Position>,
  turn: Player,
  winner: Entity,
|}
