type Content = "Tile.Empty" | "Tile.Destination" | "Tile.SpawnPoint" | "Tile.Wall"

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

  return tiles
}

export function updateTiles(
  initTiles: ITile[],
  destinationList: number[],
  spawnPointList: number[],
  wallList: number[],
): ITile[] {

  function growPath(dst: number, src: number, direction: number) {
    if (src < 0) return
    const tile = tiles[src]
    if (tile.distance < 0) {
      tile.direction = direction
      tile.distance = tiles[dst].distance + 1
      tile.next = dst
      if ("Tile.Wall" !== tile.content) queue.push(src)
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

  const tiles = initTiles.map(tile => ({...tile}))
  const queue: number[] = []

  destinationList.forEach(id => {
    tiles[id].content = "Tile.Destination"
    tiles[id].distance = 0
    tiles[id].next = -1
    queue.push(id)
  })

  spawnPointList.forEach(id => {
    tiles[id].content = "Tile.SpawnPoint"
  })

  wallList.forEach(id => {
    tiles[id].content = "Tile.Wall"
  })

  while (queue.length) {
    const id = queue.shift()
    if (id >= 0) step(+id)
  }

  console.clear()
  console.log(stateValid(tiles))
  printDistance(tiles)
  printDirection(tiles)
  return tiles
}

export function stateValid(tiles: ITile[]) {
  return tiles.every(tile => tile.distance >= 0)
}

export function printDistance(tiles: ITile[]) {
  console.log(
    range(ROWS).map((row) => (
      range(COLS).map((col) => {
        const tile = tiles[idx(row, col)]
        // const n = tile.id
        // return tile.direction >= 0? tile.direction: "^"
        return tile.distance >= 0? tile.distance: "^"
        // return tile.distance? ("   " + n).slice(-3): " --"
      }).join(' ')
    )).join('\r\n')
  )
}

export function printDirection(tiles: ITile[]) {
  const css = []
  console.log(
    range(ROWS).map((row) => (
      range(COLS).map((col) => {
        const tile = tiles[idx(row, col)]

        if ("Tile.Destination" === tile.content) {
          css.push("color: fuchsia")
          return "%c●"
        }
        else if ("Tile.SpawnPoint" === tile.content) {
          css.push("color: lime")
          return "%c●"
        }
        else if ("Tile.Wall" === tile.content) {
          css.push("color: yellow")
          return "%c□"
        }
        else if (tile.distance < 0) {
          css.push("color: red")
          return "%c×"
        }
        else {
          css.push("color: silver")
          return "%c" + "↑→↓←".charAt(tile.direction)
        }
      }).join(' ')

    )).join('\r\n'), ...css
  )
}
