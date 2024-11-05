import {useRef, useState} from "react"
import {a, useSpring} from "@react-spring/three"
import {Edges} from "@react-three/drei"
import {red} from "../colors"
import {offset, RC} from "../../hooks/utils"
import useGame from "../../hooks/useGame"

const initScale = .01
const initState = { done: false, x: 0, z: 0, scale: initScale }

export function TestBox(props) {
  const {modelScale, speed, tileId} = props
  const rc = RC(tileId)

  const {dropMob, next, tileAt} = useGame()
  const nextId = useRef(tileId)
  const rot = useRef(0)

  const [state, setState] = useState({ ...initState, scale: 1 })
  const getState = (direction: number) => ({
    done: direction < 0,
    x: state.x + (direction < 0? 0: [0,1,0,-1][direction]),
    z: state.z + (direction < 0? 0: [-1,0,1,0][direction]),
    scale: 1,
  })

  const {x, z, scale} = useSpring({
    from: initState,
    to: state,
    config: {duration: 1000 / speed},
    onRest: () => {
      const direction = tileAt(nextId.current).direction
      rot.current = -Math.PI / 2 * direction
      const nextState = getState(direction)
      if (!nextState.done) {
        setState(nextState)
        nextId.current = next(nextId.current)
      }
      else if (1 === state.scale) setState({...state, scale: initScale})
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
          rotation-z={rot.current}
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
