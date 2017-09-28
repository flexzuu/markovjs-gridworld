import { Map, List } from 'immutable'
import { reverseRows, swapBoard, actRight, actLeft, actDown, actUp } from './act'
import { init } from './state'

const initState = size => init({ size, startTiles: 0, random: () => {} })
describe('act right ->', () => {
  test('small field test', () => {
    const state = initState(2).update('board', board => board.map(row => row.map(tile => 2)))
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [[null, 4], [null, 4]],
      final: false,
      score: 8,
    })
  })
  test('a full board of 2s gets transformed', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, 4, 4], [null, null, 4, 4], [null, null, 4, 4], [null, null, 4, 4]],
      final: false,
      score: 32,
    })
  })
  test(`2    2    4    4
                             2    2
`, () => {
    const state = initState(4).update('board', board =>
      List([
        List([2, 2, 4, 4]),
        List([null, null, 2, 2]),
        List([null, null, null, null]),
        List([null, null, null, null]),
      ]),
    )
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [
        [null, null, 4, 8],
        [null, null, null, 4],
        [null, null, null, null],
        [null, null, null, null],
      ],
      final: false,
      score: 16,
    })
  })
  test('move a single 2', () => {
    const state = initState(4).update('board', board =>
      board.map((row, rowIndex) =>
        row.map((tile, index) => (rowIndex === 0 && index === 0 ? 2 : null)),
      ),
    )
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [
        [null, null, null, 2],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      final: false,
      score: 0,
    })
  })
  test('a empty row does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map((row, index) => {
        if (index === 0) return row
        return row.map(() => 2)
      }),
    )
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [null, null, 4, 4], [null, null, 4, 4], [null, null, 4, 4]],
      final: false,
      score: 24,
    })
  })
  test('a empty column does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === 0 ? null : 2))),
    )
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, 2, 4], [null, null, 2, 4], [null, null, 2, 4], [null, null, 2, 4]],
      final: false,
      score: 16,
    })
  })
  test('all values flow right', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === board.size - 1 ? null : 2))),
    )
    const newState = actRight(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, 2, 4], [null, null, 2, 4], [null, null, 2, 4], [null, null, 2, 4]],
      final: false,
      score: 16,
    })
  })
  test('a full field with different Values does not get transformed', () => {
    let i = 0
    const state = initState(4).update('board', board =>
      board.map(row => row.map(tile => 2 ** (i += 1))),
    )
    const newState = actRight(state)
    expect(newState).toEqual(state)
  })
})

describe('act left <-', () => {
  test('small field test', () => {
    const state = initState(2).update('board', board => board.map(row => row.map(tile => 2)))
    const newState = actLeft(state)
    expect(newState.toJS()).toEqual({
      board: [[4, null], [4, null]],
      final: false,
      score: 8,
    })
  })
  test('full board of 2s gets transformed', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const newState = actLeft(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 4, null, null], [4, 4, null, null], [4, 4, null, null], [4, 4, null, null]],
      final: false,
      score: 32,
    })
  })
  test('a empty row does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map((row, index) => {
        if (index === 0) return row
        return row.map(() => 2)
      }),
    )
    const newState = actLeft(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [4, 4, null, null], [4, 4, null, null], [4, 4, null, null]],
      final: false,
      score: 24,
    })
  })
  test('all values flow left', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === 0 ? null : 2))),
    )
    const newState = actLeft(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 2, null, null], [4, 2, null, null], [4, 2, null, null], [4, 2, null, null]],
      final: false,
      score: 16,
    })
  })
  test('a empty column does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === board.size - 1 ? null : 2))),
    )
    const newState = actLeft(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 2, null, null], [4, 2, null, null], [4, 2, null, null], [4, 2, null, null]],
      final: false,
      score: 16,
    })
  })
  test('a full field with different Values does not get transformed', () => {
    let i = 0
    const state = initState(4).update('board', board =>
      board.map(row => row.map(tile => 2 ** (i += 1))),
    )
    const newState = actLeft(state)
    expect(newState).toEqual(state)
  })
})

describe('act down', () => {
  test('small field test', () => {
    const state = initState(2).update('board', board => board.map(row => row.map(tile => 2)))
    const newState = actDown(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null], [4, 4]],
      final: false,
      score: 8,
    })
  })
  test('full board of 2s gets transformed', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const newState = actDown(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [null, null, null, null], [4, 4, 4, 4], [4, 4, 4, 4]],
      final: false,
      score: 32,
    })
  })
  test('a empty row does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map((row, index) => {
        if (index === 0) return row
        return row.map(() => 2)
      }),
    )
    const newState = actDown(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [null, null, null, null], [2, 2, 2, 2], [4, 4, 4, 4]],
      final: false,
      score: 16,
    })
  })
  test('all values flow down', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === 0 ? null : 2))),
    )
    const newState = actDown(state)
    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [null, null, null, null], [null, 4, 4, 4], [null, 4, 4, 4]],
      final: false,
      score: 24,
    })
  })
  test('a empty column does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === board.size - 1 ? null : 2))),
    )
    const newState = actDown(state)

    expect(newState.toJS()).toEqual({
      board: [[null, null, null, null], [null, null, null, null], [4, 4, 4, null], [4, 4, 4, null]],
      final: false,
      score: 24,
    })
  })
  test('a full field with different Values does not get transformed', () => {
    let i = 0
    const state = initState(4).update('board', board =>
      board.map(row => row.map(tile => 2 ** (i += 1))),
    )
    const newState = actDown(state)
    expect(newState).toEqual(state)
  })
})

describe('act up', () => {
  test('small field test', () => {
    const state = initState(2).update('board', board => board.map(row => row.map(tile => 2)))
    const newState = actUp(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 4], [null, null]],
      final: false,
      score: 8,
    })
  })
  test('full board of 2s gets transformed', () => {
    const state = initState(4).update('board', board => board.map(row => row.map(() => 2)))
    const newState = actUp(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 4, 4, 4], [4, 4, 4, 4], [null, null, null, null], [null, null, null, null]],
      final: false,
      score: 32,
    })
  })
  test('a empty row does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map((row, index) => {
        if (index === 0) return row
        return row.map(() => 2)
      }),
    )
    const newState = actUp(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 4, 4, 4], [2, 2, 2, 2], [null, null, null, null], [null, null, null, null]],
      final: false,
      score: 16,
    })
  })
  test('all values flow up', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === 0 ? null : 2))),
    )
    const newState = actUp(state)
    expect(newState.toJS()).toEqual({
      board: [[null, 4, 4, 4], [null, 4, 4, 4], [null, null, null, null], [null, null, null, null]],
      final: false,
      score: 24,
    })
  })
  test('a empty column does not get transformed', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((_, i) => (i === board.size - 1 ? null : 2))),
    )
    const newState = actUp(state)
    expect(newState.toJS()).toEqual({
      board: [[4, 4, 4, null], [4, 4, 4, null], [null, null, null, null], [null, null, null, null]],
      final: false,
      score: 24,
    })
  })
  test('a full field with different Values does not get transformed', () => {
    let i = 0
    const state = initState(4).update('board', board =>
      board.map(row => row.map(tile => 2 ** (i += 1))),
    )
    const newState = actUp(state)
    expect(newState).toEqual(state)
  })
})

describe('transform board rows', () => {
  test('reverse rows', () => {
    const state = initState(2).update('board', board =>
      board.map(row => row.map((tile, index) => 2 ** (index + 1))),
    )
    const newState = reverseRows(state)
    expect(newState.toJS().board).toEqual([[4, 2], [4, 2]])
  })
  test('a double reverse gets the initial state', () => {
    const state = initState(4).update('board', board =>
      board.map(row => row.map((tile, index) => 2 ** (index + 1))),
    )
    expect(reverseRows(reverseRows(state))).toEqual(state)
  })

  test('swap rows and columns', () => {
    let i = 0
    const state = initState(2).update('board', board => board.map(row => row.map(() => (i += 1))))
    const newState = swapBoard(state)
    expect(newState.toJS()).toEqual({
      board: [[1, 3], [2, 4]],
      final: false,
      score: 0,
    })
  })
  test('a double swap gets the initial state', () => {
    let i = 0
    const state = initState(2).update('board', board => board.map(row => row.map(() => (i += 1))))

    expect(swapBoard(swapBoard(state))).toEqual(state)
  })
})
