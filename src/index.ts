import lineStream from './line-stream'
import { Segment, Vec2D } from './types'
import { parseStartPosition, parseCommand, parseNumCommands } from './parse'
import { getPointsInSegment, isPointInsideSegment, getNextSegment } from './vector'

const main = (inStream: NodeJS.ReadStream, outStream: NodeJS.WriteStream) => {
  let lineIndex = 0
  let position: Vec2D
  let expectedNumCommands = 0
  let cleanedPoints = 0
  const cleanSegments: Segment[] = []

  const printResults = () => {
    outStream.write(`=> Cleaned: ${cleanedPoints}\n`)
  }

  inStream
    .pipe(lineStream())
    .on('data', (chunk: Buffer) => {
      const line = chunk.toString('utf8')

      switch (lineIndex) {
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
          return
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

      ++lineIndex

      if (lineIndex > expectedNumCommands + 2) {
        printResults()
        process.exit(0)
      }
    })
    .on('end', () => {
      printResults()
    })
}

main(process.stdin, process.stdout)
