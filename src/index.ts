import lineStream from './line-stream'

type Point = [number, number]
type Segment = [Point, Point]

const parseStartPosition = (line: string) => {
  return line.split(' ').map((chunk) => parseInt(chunk, 10)) as Point
}

const parseCommand = (line: string): Point => {
  const [direction, lengthStr] = line.split(' ')
  const length = parseInt(lengthStr, 10)

  switch (direction) {
  case 'N':
    return [0, length]
  case 'E':
    return [length, 0]
  case 'S':
    return [0, -length]
  case 'W':
    return [-length, 0]
  default:
    throw new Error(`Unknown direction ${direction}`)
  }
}

const getSegmentLength = ([pt0, pt1]: Segment): number => {
  if (pt0[0] === pt1[0]) {
    return Math.abs(pt0[1] - pt1[1]) + 1
  } else {
    return Math.abs(pt0[0] - pt1[0]) + 1
  }
}

const addPoints = (pt0: Point, pt1: Point): Point => {
  return [pt0[0] + pt1[0], pt0[1] + pt1[1]]
}

const subtractTile = (segments: Segment[], subtract: Segment): Segment[] => {
  // const result: Segment[] = []

  // for (const segment of segments) {

  // }

  // return result

  return segments
}

const main = () => {
  let lineIndex = 0
  let position: Point
  let cleanTiles: Segment[] = []

  process.stdin
    .pipe(lineStream())
    .on('data', (chunk: Buffer) => {
      const line = chunk.toString('utf8')

      switch (lineIndex) {
      case 0:
        break
      case 1:
        position = parseStartPosition(line)
        break

      default: {
        const offset = parseCommand(line)
        const nextSegment: Segment = [position, addPoints(position, offset)]

        cleanTiles = subtractTile(cleanTiles, nextSegment)
        cleanTiles.push(nextSegment)

        position = nextSegment[1]
      }
      }

      ++lineIndex
    })
    .on('end', () => {
      console.log(cleanTiles.map(getSegmentLength))
    })
}

main()
