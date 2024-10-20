import {useEffect, useMemo} from "react"
import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {idx, createTiles, updateTiles} from './utils.ts'

const initTiles = createTiles()

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    count,
    destinationList,
    spawnPointList,
    wallList,
  } = state as IState

  const tiles = useMemo(
    () => updateTiles(initTiles, destinationList, spawnPointList, wallList),
    [destinationList, spawnPointList, wallList]
  )

  const at = (row: number, col: number) => tiles[idx(row, col)]
  const getContent = (row: number, col: number) => at(row, col)?.content
  const getRotation = (row: number, col: number) => -Math.PI / 2 * at(row, col)?.direction

  const isEmpty = (row: number, col: number) => "Tile.Empty" === at(row, col)?.content
  const isDestination = (row: number, col: number) => "Tile.Destination" === at(row, col)?.content
  const isSpawnPoint = (row: number, col: number) => "Tile.SpawnPoint" === at(row, col)?.content
  const isWall = (row: number, col: number) => "Tile.Wall" === at(row, col)?.content

  //-----------------------------------------------------------------

  const incCount = (n: number) => {
    dispatch({type: Actions.SetCount, payload: count + n})
  }

  const decCount = (n: number) => {
    dispatch({type: Actions.SetCount, payload: count - n})
  }

  useEffect(() => {
    const onDocumentKey = (e) => {
      e.preventDefault()
      // console.log(e.key, e.code)
      switch(e.code) {
        case "ArrowUp": {
          incCount(1)
          break
        }
        case "ArrowDown": {
          decCount(1)
          break
        }
      }
    }
    document.addEventListener('keyup', onDocumentKey)
    return () => {
      document.removeEventListener('keyup', onDocumentKey)
    }
  }, [incCount, decCount])
  //-----------------------------------------------------------------

  const toggleDestination = (id: number) => {
    const content = tiles[id]?.content
    if ("Tile.Empty" === content || "Tile.Destination" === content) {
      dispatch({type: Actions.ToggleDestination, payload: id})
    }
  }

  const toggleSpawnPoint = (id: number) => {
    const content = tiles[id]?.content
    if ("Tile.Empty" === content || "Tile.SpawnPoint" === content) {
      dispatch({type: Actions.ToggleSpawnPoint, payload: id})
    }
  }

  const toggleWall = (id: number) => {
    const content = tiles[id]?.content
    if ("Tile.Empty" === content || "Tile.Wall" === content) {
      dispatch({type: Actions.ToggleWall, payload: id})
    }
  }

  //-----------------------------------------------------------------

  return {
    count,
    destinationList,
    tiles,
    wallList,

    incCount,
    decCount,
    getContent,
    getRotation,
    isEmpty,
    isDestination,
    isSpawnPoint,
    isWall,
    toggleDestination,
    toggleSpawnPoint,
    toggleWall,
  }
}

export default useGame
// import useGame from './useGame'
// const {
//   foo,
// } = useGame()
