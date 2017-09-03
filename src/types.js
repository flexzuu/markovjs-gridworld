// @flow
export type Rating = 'one' | 'two' | 'three' | 'four' | 'five' | 'six'
export type ActionRate = {|
  type: 'rate',
  rate: Rating,
|}
export type ReRollOne = [1] | [2] | [3] | [4] | [5]
export type ReRollTwo =
  | [1, 2]
  | [1, 3]
  | [1, 4]
  | [1, 5]
  | [2, 3]
  | [2, 4]
  | [2, 5]
  | [3, 4]
  | [3, 5]
  | [4, 5]
export type ReRollThree =
  | [1, 2, 3]
  | [1, 2, 4]
  | [1, 2, 5]
  | [1, 3, 4]
  | [1, 3, 5]
  | [1, 4, 5]
  | [2, 3, 4]
  | [2, 3, 5]
  | [2, 4, 5]
  | [3, 4, 5]
export type ReRollFour = [1, 2, 3, 4] | [1, 2, 3, 5] | [1, 2, 4, 5] | [1, 3, 4, 5] | [2, 3, 4, 5]
export type ReRollFive = [1, 2, 3, 4, 5]
export type ReRoll = ReRollOne | ReRollTwo | ReRollThree | ReRollFour | ReRollFive
export type ActionReRoll = {|
  type: 'reroll',
  reroll: ReRoll,
|}
export type Action = ActionRate | ActionReRoll
export type Phase = 'dice' | 'select'
export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6
export type DicesRoll = [DiceRoll, DiceRoll, DiceRoll, DiceRoll, DiceRoll]
export type NumberOfRolls = 1 | 2 | 3
export type Point = number | null
export type Result = {|
  one: Point,
  two: Point,
  three: Point,
  four: Point,
  five: Point,
  six: Point,
|}
export type State = {|
  numberOfRolls: NumberOfRolls,
  roll: DicesRoll,
  result: Result,
|}
