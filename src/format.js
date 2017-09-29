import { padStart } from 'lodash'

export const board = state =>
  state.get('board').map(r => r.map(t => (t ? padStart(t, 4) : '    ')).join(' ')).join('\n')
export const toData = e =>
  [...e].map(e => ({
    action: e.action,
    board: board(e.nextGameState),
    score: e.nextGameState.get('score'),
    reward: e.reward,
  }))

export default episodes =>
  episodes.forEach(data => {
    console.log(`____________________
    Action: ${data.action}
    ${data.board}
    
    Score: ${data.score}
    Reward: ${data.reward}`)
  })
