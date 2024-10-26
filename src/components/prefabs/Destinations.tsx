import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {blue} from "../colors"
import {COLS, offset, range, ROWS} from "../../hooks/utils"

function Destinations() {
  const {
    isDestination,
  } = useGame()

  return (
    <Instances
      range={COLS * ROWS}
    >
      <boxGeometry />
      <meshLambertMaterial color={blue[800]} />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            !isDestination(row, col)? null:
              <Instance
                key={`D:R${row}C${col}`}
                position={[col - offset.x, .01, row - offset.y]}
                scale={[.8, .02, .8]}
              />
          ))
        ))
      }
    </Instances>
  )
}

export default Destinations
