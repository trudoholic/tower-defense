import * as THREE from "three"
import {useLoader} from "@react-three/fiber"
import {Instance, Instances} from "@react-three/drei"
import {orange} from "../colors"
import useGame from "../../hooks/useGame"
import {ROWS, COLS, offset, range} from "../../hooks/utils"

function Arrows() {
  const {
    getRotation,
    // isEmpty,
  } = useGame()

  const texture = useLoader(THREE.TextureLoader as any, './assets/img/arrow.png')

  return (
    <Instances
      range={COLS * ROWS}
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
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            // !isEmpty(row, col)? null:
            <Instance
              key={`R${row}C${col}`}
              position={[col - offset.x, .002, row - offset.y]}
              rotation-x={-Math.PI / 2}
              rotation-z={getRotation(row, col)}
              scale={[.8, .8, .8]}
            />
          ))
        ))
      }
    </Instances>
  )
}

export default Arrows
