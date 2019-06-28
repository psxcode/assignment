import { Transform } from 'stream'
import { Vec2D, Segment } from './types'
import { parseNumCommands, parseStartPosition, parseCommand } from './parse'
import { getNextSegment, getPointsInSegment, isPointInsideSegment } from './vector'

export default () => {
  let lineIndex = 0
  let position: Vec2D
  let expectedNumCommands = 0
  let cleanedPoints = 0
  const cleanSegments: Segment[] = []

  return new Transform({
    transform (chunk: Buffer, encoding, cb) {

      // early exit
      if (lineIndex > expectedNumCommands + 2) {
        return cb()
      }

      const line = chunk.toString('utf8')

      switch (lineIndex++) {
      case 0:
        expectedNumCommands = parseNumCommands(line)
        break

      case 1:
        // move to position
        position = parseStartPosition(line)
        // clean starting point
        cleanSegments.push([position, position])
        ++cleanedPoints
        break

      default: {
        const { direction, length } = parseCommand(line)

        if (length === 0) {
          return cb()
        }

        const nextSegment = getNextSegment(position, direction, length)

        for (const point of getPointsInSegment(nextSegment)) {
          let shouldClean = true

          // move robot to position
          position = point

          // check if point was cleaned before
          for (const segment of cleanSegments) {
            if (isPointInsideSegment(segment, position)) {
              shouldClean = false
              break
            }
          }

          if (shouldClean) {
            // clean point
            ++cleanedPoints
          }
        }

        cleanSegments.push(nextSegment)
      }
      }

      cb()
    },
    flush (cb) {
      this.push(`=> Cleaned: ${cleanedPoints}\n`)
      cb()
    },
  })
}
