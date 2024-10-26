import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {amber} from "../colors"
import {ROWS, COLS, range} from "../../hooks/utils"

function SpawnPoints() {
  const {
    isSpawnPoint,
  } = useGame()

  return (
    <Instances
      range={COLS * ROWS}
    >
      <boxGeometry />
      <meshLambertMaterial color={amber[800]} />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            !isSpawnPoint(row, col)? null:
              <Instance
                key={`D:R${row}C${col}`}
                position={[col, .01, row]}
                scale={[.8, .02, .8]}
              />
          ))
        ))
      }
    </Instances>
  )
}

export default SpawnPoints
