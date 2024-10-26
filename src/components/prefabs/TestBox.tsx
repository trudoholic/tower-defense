import {useState} from "react"
import {a, useSpring} from "@react-spring/three"
import {Edges} from "@react-three/drei"
import {offset} from "../../hooks/utils"

const initScale = .01, initState = { n: 0, x: 0, z: 0, scale: initScale }

export function TestBox() {
  const [state, setState] = useState({ ...initState, scale: 1 })

  const {x, z, scale} = useSpring({
    from: initState,
    to: state,
    config: {duration: 500},
    onRest: () => {
      // console.log('#', state.n)
      if (state.n < 10) setState(t => ({
        ...t, n: t.n + 1, x: t.x + (t.n % 2), z: t.z + ((t.n + 1) % 2)
      }))
      else if (state.scale === 1) setState(t => ({...t, scale: initScale}))
      else console.log('END')
    }
  })

  return (
    <group position={[3-offset.x, 0, 3-offset.y]}>
      <a.group
        position-x={x}
        position-y={0}
        position-z={z}

        scale-x={scale}
        scale-y={scale}
        scale-z={scale}
      >
        <mesh
          name={"TestBox"}
          scale={[.5, .5, .5]}
          castShadow={true}
          receiveShadow={true}
        >
          <boxGeometry />
          <meshStandardMaterial color={"orange"} fog={false} />
          <Edges color={"white"} linewidth={.5} />
        </mesh>
      </a.group>
    </group>
  )
}

export default TestBox
