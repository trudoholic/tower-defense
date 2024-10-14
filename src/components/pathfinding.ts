export enum Content {
  Empty = 'Empty',
  Destination = 'Destination',
  // Wall = 'Wall',
}

interface ITile {
  id: number
  idN: number
  idE: number
  idS: number
  idW: number

  direction: number
  distance: number
  next: number
  odd: number

  content: Content
}

const tiles: ITile[] = []
const queue: number[] = []

export const range = (n: number) => [...Array(n).keys()]
export const size = { x: 11, y: 11} as const
export const offset = { x: (size.x - 1) * .5, y: (size.y - 1) * .5} as const
export const RC = n => [Math.floor(n / size.x), n % size.x]
const idx = (row: number, col: number) => row * size.x + col
export const at = (row: number, col: number) => tiles[idx(row, col)]

export const rotation = (row: number, col: number) => {
  const tile = tiles[idx(row, col)]
  const direction = tile.direction
  return -Math.PI / 2 * direction
}

function init() {
  range(size.y).forEach((row) => {
    range(size.x).forEach((col) => {
      const id = idx(row, col)
      tiles[id] = {
        id,
        idN: row > 0? idx(row - 1, col): -1,
        idE: col < size.x - 1? idx(row, col + 1): -1,
        idS: row < size.y - 1? idx(row + 1, col): -1,
        idW: col > 0? idx(row, col - 1): -1,
        direction: -1,
        distance: -1,
        next: -1,
        odd: (row + col) % 2,
        content: Content.Empty,
      }
    })
  })
}

// function clear(id: number) {
//   tiles[id].content = Content.Empty
//   tiles[id].direction = -1
//   tiles[id].distance = -1
//   tiles[id].next = -1
// }

function setDestination(id: number) {
  tiles[id].content = Content.Destination
  tiles[id].distance = 0
  tiles[id].next = -1
  queue.push(id)
}

function growPath(dst: number, src: number, direction: number) {
  if (src < 0) return
  const tile = tiles[src]
  if (tile.distance < 0) {
    tile.direction = direction
    tile.distance = tiles[dst].distance + 1
    tile.next = dst
    queue.push(src)
  }
}

function step(id: number) {
  const tile = tiles[id]
  if (tile.odd) {
    growPath(id, tile.idN, 2)
    growPath(id, tile.idS, 0)
    growPath(id, tile.idE, 3)
    growPath(id, tile.idW, 1)
  } else {
    growPath(id, tile.idE, 3)
    growPath(id, tile.idW, 1)
    growPath(id, tile.idN, 2)
    growPath(id, tile.idS, 0)
  }
}

function print() {
  // console.log("←↑→↓□")

  const v1 = range(size.y).map((row) => (
    range(size.x).map((col) => {
      const tile = tiles[idx(row, col)]
      const n = tile.id
      return tile.distance? ("00" + n).slice(-2): "[]"
    }).join(' ')
  )).join('\r\n')
  console.log(v1)

  const v2 = range(size.y).map((row) => (
    range(size.x).map((col) => {
      const tile = tiles[idx(row, col)]
      return tile.direction < 0? "□": "↑→↓←".charAt(tile.direction)
    }).join(' ')
  )).join('\r\n')
  console.log(v2)

  return 0
}

//=====================================================

init()
setDestination(60)

while (queue.length) {
  const id = queue.shift()
  step(id)
}

print()
