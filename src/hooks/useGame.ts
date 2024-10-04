import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    count,
  } = state as IState

  const incCount = (n: number) => {
    dispatch({type: Actions.SetCount, payload: count + n})
  }

  const decCount = (n: number) => {
    dispatch({type: Actions.SetCount, payload: count - n})
  }

  return {
    count,
    incCount,
    decCount,
  }
}

export default useGame
