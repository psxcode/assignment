import lineStream from './line-stream'
import { Segment, Vec2D } from './types'
import { parseStartPosition, parseCommand, parseNumCommands } from './parse'
import { getPointsInSegment, isPointInsideSegment, getNextSegment } from './vector'

const main = () => {
  let lineIndex = 0
  let position: Vec2D
  let expectedNumCommands = 0
  let cleanedPoints = 0
  const allSegments: Segment[] = []

  process.stdin
    .pipe(lineStream())
    .on('data', (chunk: Buffer) => {
      const line = chunk.toString('utf8')

      switch (lineIndex) {
      case 0:
        expectedNumCommands = parseNumCommands(line)
        break
      case 1:
        position = parseStartPosition(line)
        allSegments.push([position, position])
        break

      default: {
        const { direction, length } = parseCommand(line)

        if (length === 0) {
          return
        }

        const nextSegment = getNextSegment(position, direction, length)

        for (const point of getPointsInSegment(nextSegment)) {
          for (const segment of allSegments) {
            if (!isPointInsideSegment(segment, point)) {
              // clean point
              ++cleanedPoints
            }
          }
        }

        allSegments.push(nextSegment)
        position = nextSegment[1]
      }
      }

      ++lineIndex

      if (lineIndex > expectedNumCommands + 3) {
        console.log('end of commands')
        console.log('=> Cleaned:', cleanedPoints)
        process.exit(0)
      }
    })
    .on('end', () => {
      console.log('=> Cleaned:', cleanedPoints)
    })
}

main()
