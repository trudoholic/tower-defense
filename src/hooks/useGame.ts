import {useEffect} from "react"
import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

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

    incCount,
    decCount,
    toggleDestination,
  }
}

export default useGame
// import useGame from './useGame'
// const {
//   foo,
// } = useGame()
