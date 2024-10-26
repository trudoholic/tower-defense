import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {brown} from "../colors"
import {ROWS, COLS, range} from "../../hooks/utils"

function Walls() {
  const {
    isWall,
  } = useGame()

  return (
    <Instances
      range={COLS * ROWS}
    >
      <boxGeometry />
      <meshLambertMaterial color={brown[600]} />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            !isWall(row, col)? null:
              <Instance
                key={`R${row}C${col}`}
                position={[col, .25, row]}
                scale={[.95, .5, .95]}
              />
          ))
        ))
      }
    </Instances>
  )
}

export default Walls
