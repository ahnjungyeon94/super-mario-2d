export const TILE = 32
export const WORLD_WIDTH = 3200
export const WORLD_HEIGHT = 600
export const GROUND_TOP = 568

// Ground segments: {x, w} in pixels (left edge, width)
export const GROUND_SEGS = [
  { x: 0,         w: 22 * TILE },   // 0-703px
  { x: 24 * TILE, w: 76 * TILE },   // 768-3199px
]

// Platforms: {x, y, tiles} (x,y = top-left corner, tiles = tile count)
export const PLATFORMS = [
  { x: 5*TILE,  y: GROUND_TOP - 4*TILE, tiles: 3 },
  { x: 11*TILE, y: GROUND_TOP - 6*TILE, tiles: 2 },
  { x: 17*TILE, y: GROUND_TOP - 4*TILE, tiles: 4 },
  { x: 25*TILE, y: GROUND_TOP - 3*TILE, tiles: 3 },
  { x: 30*TILE, y: GROUND_TOP - 5*TILE, tiles: 2 },
  { x: 35*TILE, y: GROUND_TOP - 4*TILE, tiles: 5 },
  { x: 43*TILE, y: GROUND_TOP - 7*TILE, tiles: 2 },
  { x: 48*TILE, y: GROUND_TOP - 4*TILE, tiles: 3 },
  { x: 55*TILE, y: GROUND_TOP - 6*TILE, tiles: 4 },
  { x: 62*TILE, y: GROUND_TOP - 4*TILE, tiles: 3 },
  { x: 68*TILE, y: GROUND_TOP - 7*TILE, tiles: 5 },
  { x: 77*TILE, y: GROUND_TOP - 4*TILE, tiles: 3 },
  { x: 83*TILE, y: GROUND_TOP - 5*TILE, tiles: 4 },
  { x: 90*TILE, y: GROUND_TOP - 4*TILE, tiles: 5 },
]

// Question blocks: {x, y} (center position)
export const QUESTION_BLOCKS = [
  { x: 6*TILE+16,  y: GROUND_TOP - 9*TILE+16 },
  { x: 12*TILE+16, y: GROUND_TOP - 10*TILE+16 },
  { x: 22*TILE+16, y: GROUND_TOP - 7*TILE+16 },
  { x: 28*TILE+16, y: GROUND_TOP - 8*TILE+16 },
  { x: 31*TILE+16, y: GROUND_TOP - 9*TILE+16 },
  { x: 44*TILE+16, y: GROUND_TOP - 11*TILE+16 },
  { x: 56*TILE+16, y: GROUND_TOP - 10*TILE+16 },
  { x: 69*TILE+16, y: GROUND_TOP - 11*TILE+16 },
  { x: 84*TILE+16, y: GROUND_TOP - 9*TILE+16 },
]

// Coins: {x, y} (center positions)
export const COINS = [
  { x: 5*TILE+16,  y: GROUND_TOP - 6*TILE+16 },
  { x: 6*TILE+16,  y: GROUND_TOP - 6*TILE+16 },
  { x: 7*TILE+16,  y: GROUND_TOP - 6*TILE+16 },
  { x: 20*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 21*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 37*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 38*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 39*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 50*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 51*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 64*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 65*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 78*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 79*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 91*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 92*TILE+16, y: GROUND_TOP - 3*TILE+16 },
  { x: 93*TILE+16, y: GROUND_TOP - 3*TILE+16 },
]

// Goombas: {x, y} (center positions)
export const GOOMBAS = [
  { x: 13*TILE+16, y: GROUND_TOP - 14 },
  { x: 18*TILE+16, y: GROUND_TOP - 14 },
  { x: 20*TILE+16, y: GROUND_TOP - 14 },
  { x: 28*TILE+16, y: GROUND_TOP - 14 },
  { x: 36*TILE+16, y: GROUND_TOP - 14 },
  { x: 42*TILE+16, y: GROUND_TOP - 14 },
  { x: 50*TILE+16, y: GROUND_TOP - 14 },
  { x: 58*TILE+16, y: GROUND_TOP - 14 },
  { x: 65*TILE+16, y: GROUND_TOP - 14 },
  { x: 73*TILE+16, y: GROUND_TOP - 14 },
  { x: 80*TILE+16, y: GROUND_TOP - 14 },
  { x: 88*TILE+16, y: GROUND_TOP - 14 },
  { x: 94*TILE+16, y: GROUND_TOP - 14 },
]

// Flagpole base position
export const FLAGPOLE = { x: 97 * TILE, y: GROUND_TOP }
