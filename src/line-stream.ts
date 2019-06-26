import { Transform } from 'stream'

export default () => {
  const delim = Buffer.from('\n')
  let lastLine = Buffer.from('')

  return new Transform({
    transform (chunk, encoding, cb) {
      let delimIndex = -1
      let offset = 0

      chunk = Buffer.concat([lastLine, chunk])

      while ((delimIndex = chunk.indexOf(delim, offset)) >= 0) {
        this.push(chunk.slice(offset, delimIndex).toString('utf8'))
        offset = delimIndex + delim.length
      }

      lastLine = chunk.slice(offset)
      cb()
    },

    flush (cb) {
      if (lastLine.length) {
        this.push(lastLine.toString('utf8'))
      }

      cb()
    },
  })
}
