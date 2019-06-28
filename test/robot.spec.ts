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
  it('should go and clean the floors', async () => {
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

  it('should find the answer while cleaning', async () => {
    const data = [
      '4',
      '42 42',
      'E 11',
      'N 10',
      'W 11',
      'S 10',
    ]
    const spy = fn()
    const r = readable({ eager: true, delayMs: 0, log: readableLog })({ objectMode: false })(data)
    const w = writable({ log: writableLog })({ objectMode: false })(spy)
    const t = robot()

    r.pipe(t).pipe(w)

    await finished(w)

    expect(spy.calls).deep.eq([
      [Buffer.from('=> Cleaned: 42\n')],
    ])
  })

  it('should not clean where is clean', async () => {
    const data = [
      '5',
      '255 255',
      'E 10',
      'W 10',
      'E 10',
      'W 10',
      'E 10',
    ]
    const spy = fn()
    const r = readable({ eager: true, delayMs: 0, log: readableLog })({ objectMode: false })(data)
    const w = writable({ log: writableLog })({ objectMode: false })(spy)
    const t = robot()

    r.pipe(t).pipe(w)

    await finished(w)

    expect(spy.calls).deep.eq([
      [Buffer.from('=> Cleaned: 11\n')],
    ])
  })

  it('should clean one very dirty tile', async () => {
    const data = [
      '4',
      '666 666',
      'E 0',
      'N 0',
      'W 0',
      'S 0',
    ]
    const spy = fn()
    const r = readable({ eager: true, delayMs: 0, log: readableLog })({ objectMode: false })(data)
    const w = writable({ log: writableLog })({ objectMode: false })(spy)
    const t = robot()

    r.pipe(t).pipe(w)

    await finished(w)

    expect(spy.calls).deep.eq([
      [Buffer.from('=> Cleaned: 1\n')],
    ])
  })
})
