type Content = "Tile.Empty" | "Tile.Destination" | "Tile.Wall"

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

export const ROWS = 11
export const COLS = 11
export const offset = { x: (COLS - 1) * .5, y: (ROWS - 1) * .5} as const
const startDestination = Math.floor(ROWS * COLS / 2)

export const idx = (row: number, col: number) => row * COLS + col
export const range = (n: number) => [...Array(n).keys()]
export const RC = n => [Math.floor(n / COLS), n % COLS]

export function createTiles(): ITile[] {
  const tiles: ITile[] = []

  range(ROWS).forEach((row) => {
    range(COLS).forEach((col) => {
      const id = idx(row, col)
      tiles[id] = {
        id,
        idN: row > 0? idx(row - 1, col): -1,
        idE: col < COLS - 1? idx(row, col + 1): -1,
        idS: row < ROWS - 1? idx(row + 1, col): -1,
        idW: col > 0? idx(row, col - 1): -1,

        direction: -1,
        distance: -1,
        next: -1,
        odd: (row + col) % 2,

        content: "Tile.Empty",
      }
    })
  })

  setDestination(tiles, startDestination)
  return updateTiles(tiles)

  // return tiles
}

function setDestination(tiles: ITile[], id: number) {
  tiles[id].content = "Tile.Destination"
  tiles[id].distance = 0
  tiles[id].next = -1
}

export function updateTiles(prevTiles: ITile[]): ITile[] {
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

  const tiles = prevTiles.map(tile => ({...tile}))
  const queue: number[] = []
  queue.push(startDestination)

  while (queue.length) {
    const id = queue.shift()
    if (id) step(id)
  }

  return tiles
}

export function printDistance(tiles: ITile[]) {
  console.log(
    range(ROWS).map((row) => (
      range(COLS).map((col) => {
        const tile = tiles[idx(row, col)]
        const n = tile.id
        return tile.distance? ("   " + n).slice(-3): " --"
      }).join(' ')
    )).join('\r\n')
  )
}

export function printDirection(tiles: ITile[]) {
  console.log(
    range(ROWS).map((row) => (
      range(COLS).map((col) => {
        const tile = tiles[idx(row, col)]
        return tile.direction < 0? "□": "↑→↓←".charAt(tile.direction)
      }).join(' ')
    )).join('\r\n')
  )
}
