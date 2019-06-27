import { Vec2D, Segment } from './types'

export const addVectors = (v0: Vec2D, v1: Vec2D): Vec2D => ({
  x: v0.x + v1.x,
  y: v0.y + v1.y,
})

export const multiplyVectorByScalar = (v0: Vec2D, scalar: number): Vec2D => ({
  x: v0.x * scalar,
  y: v0.y * scalar,
})

const normalizeInteger = (value: number): number => {
  return value !== 0 ? Math.round(value / Math.abs(value)) : 0
}

export const normalizeVector = (v: Vec2D): Vec2D => ({
  x: normalizeInteger(v.x),
  y: normalizeInteger(v.y),
})

export function* getPointsInSegment ([v0, v1]: Segment) {
  const dx = v1.x - v0.x
  const dy = v1.y - v0.y
  const direction = normalizeVector({ x: dx, y: dy })
  const length = Math.max(Math.abs(dx), Math.abs(dy))

  for (let i = 0; i <= length; ++i) {
    yield addVectors(v0, multiplyVectorByScalar(direction, i))
  }
}

export const isPointInsideSegment = (segment: Segment, point: Vec2D): boolean => {
  if (segment[0].x > segment[1].x || segment[0].y > segment[1].y) {
    return segment[1].x <= point.x && point.x <= segment[0].x &&
            segment[1].y <= point.y && point.y <= segment[0].y
  }

  return segment[0].x <= point.x && point.x <= segment[1].x &&
          segment[0].y <= point.y && point.y <= segment[1].y
}

export const getNextSegment = (position: Vec2D, direction: Vec2D, length: number): Segment => {
  return [
    addVectors(position, direction),
    addVectors(position, multiplyVectorByScalar(direction, length)),
  ]
}
