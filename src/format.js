export const episode = e =>
  [...e].map(e => {
    const data = {
      action: e.action,
      board: e.nextGameState
        .get('board')
        .map(r => r.map(t => (t ? t.toString().padStart(4) : '    ')).join(' '))
        .join('\n'),
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
