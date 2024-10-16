import { IState } from "./state"

export enum Actions {
  SetCount,
  ToggleDestination,
}

export type TAction =
  | { type: Actions.SetCount, payload: number }
  | { type: Actions.ToggleDestination, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetCount: {
      return { ...state, count: action.payload }
    }

    case Actions.ToggleDestination: {
      return { ...state, destinationList: toggle(action.payload, state.destinationList) }
    }

    default: {
      return state
    }

  }
}

function toggle(n: number, srcList: number[]) {
  const list = [...srcList]
  const idx = list.indexOf(n)
  if (idx < 0) {
    list.push(n)
  } else {
    list.splice(idx, 1)
  }
  return list
}
