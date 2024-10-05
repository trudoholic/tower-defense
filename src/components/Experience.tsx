import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import {blue, orange} from './colors'

import { Floor } from './Floor'

export default function Experience() {
  const sphere = useRef()

  const { position, visible, color } = useControls({
    position: { x: 2, y: 0, z: 0 },
    visible: true,
    color: { value: blue[900] },
  })

  return (
    <>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight />
      <directionalLight position={[3, 4, 5]} />

      <mesh
        ref={sphere}
        position={[position.x, position.y, position.z]}
        visible={visible}
      >
        <meshToonMaterial color={color} />
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      <Floor />
      <Thing position-y={1} />
    </>
  )
}

function Thing(props) {
  const ref = useRef<Mesh>(null!)
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <meshToonMaterial color={orange[900]} />
    </mesh>
  )
}
