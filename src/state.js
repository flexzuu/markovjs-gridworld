// @flow
import type { State } from './types'
import { rollAll } from './dice'

const proto = {
  toString(): string {
    const { result: { one, two, three, four, five, six }, numberOfRolls, roll } = (this: State)
    return [one, two, three, four, five, six, numberOfRolls, ...roll].toString()
  },
}

const create = (state: State): State => (Object.assign(Object.create(proto), state): any)

const init = (): State =>
  create({
    numberOfRolls: 1,
    roll: rollAll(),
    result: {
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
    },
  })

export { init, create }
