import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  addVectors,
  multiplyVectorByScalar,
  normalizeVector,
  isPointInsideSegment,
  getPointsInSegment,
  getNextSegment,
} from '../src/vector'
import { Vec2D, Segment } from '../src/types'

describe('Add Vectors', () => {
  it('should add two vectors', () => {
    const v0: Vec2D = { x: 0,y: 3 }
    const v1: Vec2D = { x: 2, y: -1 }

    expect(addVectors(v0, v1)).deep.eq({ x: 2, y: 2 })
  })
})

describe('Multiply Vector by Scalar', () => {
  it('should multiply vector by scalar', () => {
    const v0: Vec2D = { x: 2, y: 3 }
    const scalar = 3

    expect(multiplyVectorByScalar(v0, scalar)).deep.eq({ x: 6, y: 9 })
  })
})

describe('Normalize Vector', () => {
  it('should normalize vector', () => {
    const v0: Vec2D = { x: 0, y: 7 }

    expect(normalizeVector(v0)).deep.eq({ x: 0, y: 1 })
  })

  it('should handle negative values', () => {
    const v0: Vec2D = { x: -4, y: 0 }

    expect(normalizeVector(v0)).deep.eq({ x: -1, y: 0 })
  })
})

describe('Is Point Inside Segment', () => {
  it('should report point inside', () => {
    const segment: Segment = [{ x: 0, y: 0 }, { x: 5, y: 0 }]
    const point: Vec2D = { x: 2, y: 0 }

    expect(isPointInsideSegment(segment, point)).eq(true)
  })

  it('should report point inside, inverse order', () => {
    const segment: Segment = [{ x: 3, y: 0 }, { x: -5, y: 0 }]
    const point: Vec2D = { x: -2, y: 0 }

    expect(isPointInsideSegment(segment, point)).eq(true)
  })

  it('should report point outside', () => {
    const segment: Segment = [{ x: 0, y: 0 }, { x: 5, y: 0 }]
    const point: Vec2D = { x: 2, y: 1 }

    expect(isPointInsideSegment(segment, point)).eq(false)
  })

  it('should report point on edge', () => {
    const segment: Segment = [{ x: 0, y: 3 }, { x: 0, y: -6 }]
    const point: Vec2D = { x: 0, y: -6 }

    expect(isPointInsideSegment(segment, point)).eq(true)
  })
})

describe('Get Points Inside Segment', () => {
  it('should return all point inside segment', () => {
    const segment: Segment = [{ x: 0, y: 0 }, { x: 5, y: 0 }]
    const points = Array.from(getPointsInSegment(segment))

    expect(points).deep.eq([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ])
  })

  it('should handler negative values', () => {
    const segment: Segment = [{ x: 3, y: 2 }, { x: 3, y: -3 }]
    const points = Array.from(getPointsInSegment(segment))

    expect(points).deep.eq([
      { x: 3, y: 2 },
      { x: 3, y: 1 },
      { x: 3, y: 0 },
      { x: 3, y: -1 },
      { x: 3, y: -2 },
      { x: 3, y: -3 },
    ])
  })

  it('should handler single point segment', () => {
    const segment: Segment = [{ x: 3, y: 2 }, { x: 3, y: 2 }]
    const points = Array.from(getPointsInSegment(segment))

    expect(points).deep.eq([
      { x: 3, y: 2 },
    ])
  })
})

describe('Get Next Segment', () => {
  it('should get next segment', () => {
    const position = { x: 22, y: 10 }
    const direction = { x: -1, y: 0 }
    const length = 5

    expect(getNextSegment(position, direction, length)).deep.eq([
      { x: 21, y: 10 },
      { x: 17, y: 10 },
    ])
  })

  it('should get next segment', () => {
    const position = { x: 3, y: 10 }
    const direction = { x: 0, y: 1 }
    const length = 1

    expect(getNextSegment(position, direction, length)).deep.eq([
      { x: 3, y: 11 },
      { x: 3, y: 11 },
    ])
  })
})
