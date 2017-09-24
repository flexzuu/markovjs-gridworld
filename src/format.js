import { last, reduce } from 'lodash'

const state = s => `STATE: ${JSON.stringify(s, null, 2)}`
const transition = t => `TRANSITION: ${JSON.stringify(t, null, 2)}`
const episode = e => [...e].map(t => transition(t)).join('\n\n')
const getResult = s => reduce(s.result, (prev, curr) => prev + (curr || 0), 0)
const result = e => getResult(last([...e]).nextGameState)
export { state, transition, episode, result }
