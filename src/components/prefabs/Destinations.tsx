import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {blue} from "../colors"
import {COLS, idx, offset, range, ROWS} from "../../hooks/utils"

function Destinations() {
  const {
    destinationList,
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
            !destinationList.includes(idx(row, col))? null:
              <Instance
                key={`R${row}C${col}`}
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
