import {ThreeEvent} from "@react-three/fiber"
import {Instance, Instances} from "@react-three/drei"
import {useControls} from 'leva'
import useGame from "../../hooks/useGame"
import {ROWS, COLS, offset, range, RC} from "../../hooks/utils"

function Tiles() {
  const { showGrid } = useControls({
    showGrid: true,
  })

  const {
    toggleDestination,
    toggleSpawnPoint,
    toggleWall,
  } = useGame()

  const handleClick = (e: ThreeEvent<MouseEvent>, rightClick: boolean) => {
    e.nativeEvent.preventDefault()
    const [row, col] = RC(e.instanceId)
    console.log(`R${row}C${col}`)
    if (e.nativeEvent.ctrlKey) {
      if (rightClick) {
        toggleDestination(+e.instanceId)
      } else {
        toggleWall(+e.instanceId)
      }
    }
    else if (e.nativeEvent.shiftKey) {
      if (rightClick) {
        toggleSpawnPoint(+e.instanceId)
      }
    }
  }

  return (
    <Instances
      range={COLS * ROWS}
      onClick={(e) => { handleClick(e, false) }}
      onContextMenu={(e) => { handleClick(e, true) }}
    >
      <planeGeometry />
      <meshBasicMaterial
        color={"white"}
        opacity={showGrid? .1: 0}
        transparent={true}
      />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            <Instance
              key={`R${row}C${col}`}
              position={[col - offset.x, .001, row - offset.y]}
              rotation-x={-Math.PI / 2}
              scale={[.9, .9, .9]}
            />
          ))
        ))
      }
    </Instances>
  )
}

export default Tiles
