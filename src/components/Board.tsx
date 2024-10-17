import {Suspense} from "react"
import {green} from "./colors"
import {ROWS, COLS} from "../hooks/utils"
import Destinations from "./prefabs/Destinations"
import Tiles from "./prefabs/Tiles"
import Walls from "./prefabs/Walls"

export function Board() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[COLS, ROWS]} />
        <meshBasicMaterial color={ green[900] } />
      </mesh>

      <Suspense fallback={null}>
        <Tiles/>
        <Destinations/>
        <Walls/>
      </Suspense>
    </>
  )
}
