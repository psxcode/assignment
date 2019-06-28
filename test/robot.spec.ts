import { expect } from 'chai'
import { describe, it } from 'mocha'
import debug from 'debug'
import fn from 'test-fn'
import { readable, writable } from 'node-stream-test'
import { waitTimePromise } from '@psxcode/wait'
import { onceAllPromise } from 'node-on'
import robot from '../src/robot'

const readableLog = debug('robot:readable')
const writableLog = debug('robot:writable')

const finished = async (...emitters: NodeJS.EventEmitter[]) => {
  await onceAllPromise('end', 'finish', 'close')(...emitters)
  await waitTimePromise(10)
}

describe('[ Robot ]', () => {
  it('should work', async () => {
    const data = [
      '2',
      '10 22',
      'E 2',
      'N 1',
    ]
    const spy = fn()
    const r = readable({ eager: true, delayMs: 0, log: readableLog })({ objectMode: false })(data)
    const w = writable({ log: writableLog })({ objectMode: false })(spy)
    const t = robot()

    r.pipe(t).pipe(w)

    await finished(w)

    expect(spy.calls).deep.eq([
      [Buffer.from('=> Cleaned: 4\n')],
    ])
  })
})
