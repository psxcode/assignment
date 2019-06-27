import { Vec2D } from './types'

export const parseNumCommands = (line: string): number => {
  return parseInt(line, 10)
}

export const parseStartPosition = (line: string): Vec2D => {
  const [x, y] = line.split(' ')

  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  }
}

type Direction = 'N' | 'E' | 'S' | 'W'

const directions: { [k in Direction]: Vec2D } = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
}

export const parseCommand = (line: string) => {
  const [direction, lengthStr] = line.split(' ')
  const length = parseInt(lengthStr, 10)

  return {
    direction: directions[direction as Direction],
    length,
  }
}
