// @flow
export type Action = '←' | '→' | '↓' | '↑'

export type Entity = '💀' | '⬚' | '💓' | '🤖'
export type State = {|
  robson: { r: number, c: number, dead: boolean },
  board: { rows: number, cols: number },
  hazards: Array<number>,
  goals: Array<number>,
|}
