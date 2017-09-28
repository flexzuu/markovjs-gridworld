import { padStart } from 'lodash'

export const board = state =>
  state.get('board').map(r => r.map(t => (t ? padStart(t, 4) : '    ')).join(' ')).join('\n')

export const episode = e =>
  [...e].map(e => {
    const data = {
      action: e.action,
      board: board(e.nextGameState),
      score: e.nextGameState.get('score'),
      reward: e.reward,
    }
    const log = `___________________
Action: ${data.action}
${data.board}

Score: ${data.score}
Reward: ${data.reward}`

    console.log(log)
  })
