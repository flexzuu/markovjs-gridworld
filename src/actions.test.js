import actions from './actions'

test('should return all actions', () => {
  const actionsArray = actions()
  expect(actionsArray).toEqual(['↓', '←', '→', '↑'])
})
