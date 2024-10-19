import {ROWS, COLS} from "../hooks/utils"

export interface IState {
  count: number
  destinationList: number[]
  spawnPointList: number[]
  wallList: number[]
}

export const defaultState: IState = {
  count: 0,
  destinationList: [Math.floor(ROWS * COLS / 2)],
  spawnPointList: [],
  wallList: [],
}
