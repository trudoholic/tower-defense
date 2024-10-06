import {useRef} from "react"
import * as THREE from "three"
import {useLoader, useFrame} from "@react-three/fiber"
import {orange} from "./colors"

export function Thing(props) {
  const texture = useLoader(THREE.TextureLoader as any, './assets/img/arrow.png')

  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshBasicMaterial
        color={orange[900]}
        map={texture}
        opacity={0.5}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  )
}
