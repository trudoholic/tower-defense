import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {brown} from "../colors"
import {COLS, offset, range, ROWS} from "../../hooks/utils"

function Walls() {
  const {
    isWall,
  } = useGame()

  return (
    <Instances
      range={COLS * ROWS}
    >
      <boxGeometry />
      <meshToonMaterial color={brown[700]} />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            !isWall(row, col)? null:
              <Instance
                key={`R${row}C${col}`}
                position={[col - offset.x, .25, row - offset.y]}
                scale={[.95, .5, .95]}
              />
          ))
        ))
      }
    </Instances>
  )
}

export default Walls
