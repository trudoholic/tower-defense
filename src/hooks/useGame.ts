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
    wallList,
  } = state as IState

  const tiles = useMemo(
    () => updateTiles(initTiles, destinationList),
    [destinationList]
  )

  const getRotation = (row: number, col: number) => {
    const tile = tiles[idx(row, col)]
    return -Math.PI / 2 * tile.direction
  }

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

  const toggleDestination = (n: number) => {
    dispatch({type: Actions.ToggleDestination, payload: n})
  }

  const toggleWall = (n: number) => {
    dispatch({type: Actions.ToggleWall, payload: n})
  }
  //-----------------------------------------------------------------

  return {
    count,
    destinationList,
    tiles,
    wallList,

    incCount,
    decCount,
    getRotation,
    toggleDestination,
    toggleWall,
  }
}

export default useGame
// import useGame from './useGame'
// const {
//   foo,
// } = useGame()
