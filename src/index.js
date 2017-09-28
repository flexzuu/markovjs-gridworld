import 'babel-polyfill'
import markov from 'markovjs'
import * as memory from 'markovjs-immutable'
import { egreedy, greedy } from 'markovjs/policies'
import { random, sample } from 'lodash'

import * as format from './format'
import * as state from './state'
import actions from './actions'
import reward from './reward'
import final from './final'
import act from './act'

const game = { actions, reward, final, act }
const initial = state.init({
  size: 4,
  startTiles: 2,
  random,
})

const α = 0.2 // learning rate
const γ = 0.2 // discount factor
const ε = 0.1 // exploration rate

markov()
  .memory(memory, memory.init(0.0, a => a))
  .policies(sample, greedy) // egreedy(ε)
  .game(game, initial)
  .train(1000, α, γ)
  .play((
    e, // eslint-disable-next-line no-console
  ) => format.episode(e))
