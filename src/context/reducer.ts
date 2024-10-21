import {IMob, IState} from "./state"

export enum Actions {
  CreateMob,
  DropMob,
  SetCount,
  ToggleDestination,
  ToggleSpawnPoint,
  ToggleWall,
}

export type TAction =
  | { type: Actions.CreateMob, payload: { id: string, data: IMob } }
  | { type: Actions.DropMob, payload: string }
  | { type: Actions.SetCount, payload: number }
  | { type: Actions.ToggleDestination, payload: number }
  | { type: Actions.ToggleSpawnPoint, payload: number }
  | { type: Actions.ToggleWall, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.CreateMob: {
      return {
        ...state,
        mobData: (new Map(state.mobData)).set(action.payload.id, action.payload.data),
        mobList: [...state.mobList, action.payload.id],
      }
    }

    case Actions.DropMob: {
      const data = new Map(state.mobData); data.delete(action.payload)
      return {
        ...state, mobData: data,
        mobList: state.mobList.filter(id => id !== action.payload),
      }
    }

    case Actions.SetCount: {
      return { ...state, count: action.payload }
    }

    case Actions.ToggleDestination: {
      return { ...state, destinationList: toggle(action.payload, state.destinationList) }
    }

    case Actions.ToggleSpawnPoint: {
      return { ...state, spawnPointList: toggle(action.payload, state.spawnPointList) }
    }

    case Actions.ToggleWall: {
      return { ...state, wallList: toggle(action.payload, state.wallList) }
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
