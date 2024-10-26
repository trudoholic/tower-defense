import {Suspense} from "react"
import {useControls} from 'leva'
import {green} from "./colors"
import {ROWS, COLS} from "../hooks/utils"

import Arrows from "./prefabs/Arrows"
import Destinations from "./prefabs/Destinations"
import Mobs from "./prefabs/Mobs"
import SpawnPoints from "./prefabs/SpawnPoints"
import Tiles from "./prefabs/Tiles"
import Walls from "./prefabs/Walls"

export function Board() {
  const { showPaths } = useControls({
    showPaths: true,
  })

  const offset = { x: (COLS - 1) * .5, y: (ROWS - 1) * .5} as const

  return (
    <group position={[-offset.x, 0, -offset.y]}>
      <mesh
        position={[offset.x, 0, offset.y]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[COLS + .1, ROWS + .1]} />
        <meshBasicMaterial color={ green[900] } />
      </mesh>

      <Suspense fallback={null}>
        <Tiles/>
        {showPaths && <Arrows/>}
        <Destinations/>
        <SpawnPoints/>
        <Walls/>
        <Mobs/>
      </Suspense>
    </group>
  )
}
