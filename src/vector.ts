import { Vec2D, Segment } from './types'

export const addVectors = (v0: Vec2D, v1: Vec2D): Vec2D => ({
  x: v0.x + v1.x,
  y: v0.y + v1.y,
})

export const multiplyVectorByScalar = (v0: Vec2D, scalar: number): Vec2D => ({
  x: v0.x * scalar,
  y: v0.y * scalar,
})

export const normalize = (v: Vec2D): Vec2D => ({
  x: v.x !== 0 ? Math.round(v.x / v.x) : 0,
  y: v.y !== 0 ? Math.round(v.y / v.y) : 0,
})

export function* getPointsInSegment ([v0, v1]: Segment) {
  const dx = v1.x - v0.x
  const dy = v1.y - v0.y
  const direction = normalize({ x: dx, y: dy })
  const length = dx > dy ? Math.abs(dx) : Math.abs(dy)

  for (let i = 0; i <= length; ++i) {
    yield addVectors(v0, multiplyVectorByScalar(direction, i))
  }
}

export const isPointInsideSegment = (segment: Segment, point: Vec2D): boolean => {
  return segment[0].x <= point.x && point.x <= segment[1].x &&
    segment[1].y <= point.y && point.y <= segment[1].y
}
