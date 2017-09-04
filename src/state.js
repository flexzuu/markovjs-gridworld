// @flow
import type { State } from './types'
import { rollAll } from './dice'

const getDefault = x => x || 0
const proto = {
  toString(): string {
    const { result: { one, two, three, four, five, six }, numberOfRolls, roll } = (this: State)
    const memory = [
      getDefault(one),
      getDefault(two),
      getDefault(three),
      getDefault(four),
      getDefault(five),
      getDefault(six),
      numberOfRolls,
      ...roll,
    ].toString()
    // console.log(memory)
    return memory
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
