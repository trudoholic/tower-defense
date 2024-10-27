import {useState} from "react"
import {a, useSpring} from "@react-spring/three"
import {Edges} from "@react-three/drei"
import {red} from "../colors"
import {offset, RC} from "../../hooks/utils"
import useGame from "../../hooks/useGame"

const initScale = .01, initState = { n: 0, x: 0, z: 0, scale: initScale }

export function TestBox(props) {
  const {modelScale, speed, tileId} = props
  const rc = RC(tileId)

  const {dropMob} = useGame()

  const [state, setState] = useState({ ...initState, scale: 1 })

  const {x, z, scale} = useSpring({
    from: initState,
    to: state,
    config: {duration: 1000 / speed},
    onRest: () => {
      // console.log('#', state.n)
      if (state.n < 10) setState(t => ({
        ...t, n: t.n + 1, x: t.x + (t.n % 2), z: t.z + ((t.n + 1) % 2)
      }))
      else if (state.scale === 1) setState(t => ({...t, scale: initScale}))
      else {
        dropMob(tileId)
        console.log('END: ' + tileId)
      }
    }
  })

  return (
    <group position={[rc[1] - offset.x, 0, rc[0] - offset.y]}>
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
          position-y={modelScale}
          rotation-x={-Math.PI / 2}
          scale={[modelScale, modelScale, modelScale]}
          castShadow={true}
          receiveShadow={true}
        >
          {/*<boxGeometry />*/}
          {/*<cylinderGeometry args={[1, 1, 2, 6]} />*/}
          <coneGeometry args={[1, 2, 6]} />

          <meshStandardMaterial color={red[900]} fog={false} />
          <Edges color={"white"} linewidth={.5} />
        </mesh>
      </a.group>
    </group>
  )
}

export default TestBox
