interface ITile {
  id: number
  idN: number
  idE: number
  idS: number
  idW: number

  distance: number
  next: number
}

const tiles: ITile[] = []

const size = { x: 8, y: 8} as const
const idx = (row: number, col: number) => row * size.x + col

const range = (n: number) => [...Array(n).keys()]

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
        distance: -1,
        next: -1,
      }
    })
  })
}

function clear(id: number) {
  tiles[id].distance = -1
  tiles[id].next = -1
}

function setDestination(id: number) {
  tiles[id].distance = 0
  tiles[id].next = -1
}

init()
setDestination(42)

export function print() {
  // console.log("←↑→↓□")

  const v = range(size.y).map((row) => (
    range(size.x).map((col) => {
      // `R${row}C${col}`
      const tile = tiles[idx(row, col)]
      const n = tile.id
      // const n = tile.idN
      return tile.distance? ("00" + n).slice(-2): "--"
    }).join(' ')
  )).join('\r\n')

  console.log(v)
  return 0
}
