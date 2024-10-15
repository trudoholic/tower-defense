import {Suspense} from 'react'
import * as THREE from "three"
import {ThreeEvent, useLoader} from "@react-three/fiber"
import {Instances, Instance} from "@react-three/drei"
import {green, orange} from "./colors"

import {
  isEmpty,
  offset,
  range,
  RC,
  rotation,
  size,
} from "./pathfinding"

export function Board() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[size.x, size.y]} />
        <meshBasicMaterial color={ green[900] } />
      </mesh>

      <Suspense fallback={null}>
        <Tiles/>
      </Suspense>
    </>
  )
}

function Tiles() {
  const texture = useLoader(THREE.TextureLoader as any, './assets/img/arrow.png')

  const handleClick = (e: ThreeEvent<MouseEvent>, rightClick: boolean) => {
    e.nativeEvent.preventDefault()
    const [row, col] = RC(e.instanceId)
    console.log(rightClick? "[R]": "[L]", "row:", row, "col:", col)
  }

  return (
    <Instances
      range={size.x * size.y}
      onClick={(e) => { handleClick(e, false) }}
      onContextMenu={(e) => { handleClick(e, true) }}
    >
      <planeGeometry />
      <meshBasicMaterial
        color={orange[300]}
        map={texture}
        opacity={1}
        side={THREE.DoubleSide}
        transparent={true}
      />
      {
        range(size.y).map((row) => (
          range(size.x).map((col) => (
              !isEmpty(row, col)? null:
              <Instance
                key={`R${row}C${col}`}
                position={[col - offset.x, .001, row - offset.y]}
                rotation-x={-Math.PI / 2}
                rotation-z={rotation(row, col)}
                scale={[.8, .8, .8]}
              />
          ))
        ))
      }
    </Instances>
  )
}
