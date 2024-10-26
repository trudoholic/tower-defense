import {Edges} from "@react-three/drei"

export function TestBox() {
  return (
    <mesh
      name={"TestBox"}
      position={[3, 0, 3]}
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
