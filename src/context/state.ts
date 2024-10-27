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
  spawnPointList: [0, COLS - 1, (ROWS - 1) * COLS, ROWS * COLS - 1],
  wallList: [],

  mobData: new Map<string, IMob>(),
  mobList: [],
}
