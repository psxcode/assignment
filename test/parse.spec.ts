import { describe, it } from 'mocha'
import { expect } from 'chai'
import { parseCommand, parseNumCommands, parseStartPosition } from '../src/parse'

describe('Parse Command', () => {
  it('should parse North', () => {
    expect(parseCommand('N 3')).deep.eq({
      direction: { x: 0, y: 1 },
      length: 3,
    })
  })

  it('should parse East', () => {
    expect(parseCommand('E 5')).deep.eq({
      direction: { x: 1, y: 0 },
      length: 5,
    })
  })

  it('should parse South', () => {
    expect(parseCommand('S 2')).deep.eq({
      direction: { x: 0, y: -1 },
      length: 2,
    })
  })

  it('should parse West', () => {
    expect(parseCommand('W 0')).deep.eq({
      direction: { x: -1, y: 0 },
      length: 0,
    })
  })
})

describe('Parse Number of Commands', () => {
  it('should parse number of commands', () => {
    expect(parseNumCommands('4')).eq(4)
  })
})

describe('Parse Start Position', () => {
  it('should parse start position', () => {
    expect(parseStartPosition('22, 10')).deep.eq({ x: 22, y: 10 })
  })
})
