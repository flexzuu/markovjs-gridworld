import 'babel-polyfill'
import markov from 'markovjs'
import * as memory from 'markovjs/memory'
import { egreedy, greedy } from 'markovjs/policies'
import { times, mean, min, max } from 'lodash'
import * as format from './format'
import * as state from './state'
import actions from './actions'
import reward from './reward'
import final from './final'
import act from './act'

const game = { actions, reward, final, act }
const initial = state.init()

const α = 0.01 // learning rate
const γ = 0.8 // discount factor
const ε = 0.9 // exploration rate

const trainedMaschine = markov()
  .memory(memory, memory.init(0.0))
  .policies(egreedy(ε), greedy)
  .game(game, initial)
  .train(500, α, γ)

const results = []

times(1000, () => {
  trainedMaschine.play(e => {
    results.push(format.result(e))
  })
})

// console.log(`results: ${results}`)
console.log(`Min: ${min(results)}`)
console.log(`Mean: ${mean(results)}`)
console.log(`Max: ${max(results)}`)
