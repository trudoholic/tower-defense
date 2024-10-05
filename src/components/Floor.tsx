import {green} from "./colors"

export function Floor() {
  return (
    <mesh scale={[8, 8, 8]} rotation-x={-Math.PI / 2}>
      <planeGeometry />
      <meshStandardMaterial color={ green[900] } />
    </mesh>
  )
}
