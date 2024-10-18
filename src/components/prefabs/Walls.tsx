import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {brown} from "../colors"
import {COLS, idx, offset, range, ROWS} from "../../hooks/utils"

function Walls() {
  const {
    getContent,
    wallList,
  } = useGame()

  range(ROWS).map((row) => (
    range(COLS).map((col) => (
      wallList.includes(idx(row, col))? (
        console.log(`R${row}C${col}`, getContent(row, col))
      ): null
    ))
  ))

  return (
    <Instances
      range={COLS * ROWS}
    >
      <boxGeometry />
      <meshToonMaterial color={brown[700]} />
      {
        range(ROWS).map((row) => (
          range(COLS).map((col) => (
            !wallList.includes(idx(row, col))? null:
              <Instance
                key={`R${row}C${col}`}
                position={[col - offset.x, .25, row - offset.y]}
                scale={[.8, .5, .8]}
              />
          ))
        ))
      }
    </Instances>
  )
}

export default Walls
