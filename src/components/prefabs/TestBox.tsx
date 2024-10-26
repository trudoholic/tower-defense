import {a, useSpring} from "@react-spring/three"
import {Edges} from "@react-three/drei"
import {offset} from "../../hooks/utils"

export function TestBox() {

  const myCallback = () => {
    console.log("animation complete");
  }
  const {x} = useSpring({
    from: { x: 0 },
    to: { x: 3 },
    config: {duration: 1500},
    onRest: myCallback
  })

  return (
    <a.group
      position-x={x}
    >
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
    </a.group>
  )
}

export default TestBox
