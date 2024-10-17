import {useEffect} from "react"
import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {createTiles, idx, printDistance, printDirection} from './utils.ts'

const tiles = createTiles()
printDistance(tiles)
printDirection(tiles)

export const getRotation = (row: number, col: number) => {
  const tile = tiles[idx(row, col)]
  return -Math.PI / 2 * tile.direction
}

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    count,
    destinationList,
  } = state as IState

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
  //-----------------------------------------------------------------

  return {
    count,
    destinationList,
    tiles,

    incCount,
    decCount,
    getRotation,
    toggleDestination,
  }
}

export default useGame
// import useGame from './useGame'
// const {
//   foo,
// } = useGame()
