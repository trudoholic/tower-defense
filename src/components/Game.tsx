import {Suspense} from 'react'
import {OrbitControls} from '@react-three/drei'
import {useControls} from 'leva'
import {blue} from './colors'

import {Board} from './Board'
import {Thing} from './Thing'

export default function Game() {
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
      <ambientLight intensity={.9} />
      <directionalLight position={[3, 4, 5]} />
      {/*<fog attach='fog' args={['#191920', 0, 55]} />*/}

      <mesh
        position={[position.x, position.y, position.z]}
        visible={visible}
      >
        <meshToonMaterial color={color} />
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>

      <Board />
      <Suspense fallback={null}>
        <Thing position-y={1} />
      </Suspense>
    </>
  )
}
