import {Suspense} from "react"
import {green} from "./colors"
import {ROWS, COLS} from "../hooks/utils"
import Arrows from "./prefabs/Arrows"
import Destinations from "./prefabs/Destinations"
import Tiles from "./prefabs/Tiles"
import Walls from "./prefabs/Walls"

export function Board() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[COLS + .1, ROWS + .1]} />
        <meshBasicMaterial color={ green[900] } />
      </mesh>

      <Suspense fallback={null}>
        <Tiles/>
        <Arrows/>
        <Destinations/>
        <Walls/>
      </Suspense>
    </>
  )
}
