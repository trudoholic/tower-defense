import {a, config, useSpring} from "@react-spring/three"
import {Edges} from "@react-three/drei"
import {offset} from "../../hooks/utils"

export function TestBox() {
  return (
    <mesh
      name={"TestBox"}
      position={[3 - offset.x, 0, 3 - offset.y]}
      scale={[.75, 1.5, .75]}
      castShadow={true}
      receiveShadow={true}
    >
      <boxGeometry />
      <meshStandardMaterial color={"orange"} fog={false} />
      <Edges color={"white"} linewidth={.5} />
    </mesh>
  )
}

export default TestBox
