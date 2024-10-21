import {ROWS, COLS} from "../hooks/utils"

export interface IMob {
  tileId: number
}

export interface IState {
  count: number
  destinationList: number[]
  spawnPointList: number[]
  wallList: number[]

  mobData: Map<string, IMob>
  mobList: string[]
}

export const defaultState: IState = {
  count: 0,
  destinationList: [Math.floor(ROWS * COLS / 2)],
  spawnPointList: [],
  wallList: [],

  mobData: new Map<string, IMob>(),
  mobList: [],
}
