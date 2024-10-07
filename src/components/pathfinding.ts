interface ITile {
  id: number
  idN: number
  idE: number
  idS: number
  idW: number
}

const tiles: ITile[] = []

const range = (n: number) => [...Array(n).keys()]
const size = { x: 8, y: 8} as const
const idx = (row: number, col: number) => row * size.x + col

range(size.y).forEach((row) => {
  range(size.x).forEach((col) => {
    const id = idx(row, col)
    tiles[id] = {
      id,
      idN: row > 0? idx(row - 1, col): -1,
      idE: col < size.x - 1? idx(row, col + 1): -1,
      idS: row < size.y - 1? idx(row + 1, col): -1,
      idW: col > 0? idx(row, col - 1): -1,
    }
  })
})

export function test() {
  // console.log("←↑→↓□")

  const v = range(size.y).map((row) => (
    range(size.x).map((col) => (
      // `R${row}C${col}`
      // "□"
      tiles[idx(row, col)].id
    )).join(' ')
  )).join('\r\n')

  console.log(v)
  return 0
}
