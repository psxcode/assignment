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

const subtractSegment = (a: Segment, b: Segment): Segment[] => {
  const result: Segment[] = []

  return result
}

const main = () => {
  let lineIndex = 0
  let position: Point
  let cleanSegments: Segment[] = []

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
        const nextSegments: Segment[] = []

        for (const seg of cleanSegments) {
          nextSegments.push(...subtractSegment(seg, nextSegment))
        }

        nextSegments.push(nextSegment)
        cleanSegments = nextSegments
        position = nextSegment[1]
      }
      }

      ++lineIndex
    })
    .on('end', () => {
      console.log(cleanSegments.map(getSegmentLength))
    })
}

main()
