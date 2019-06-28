import lineStream from './line-stream'
import robot from './robot'

process.stdin
  .pipe(lineStream())
  .pipe(robot())
  .pipe(process.stdout)
