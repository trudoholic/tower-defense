import useGame from "../../hooks/useGame"
import {Instance, Instances} from "@react-three/drei"
import {blue} from "../colors"
import {RC} from "../../hooks/utils"

function Mobs() {
  const {
    mobData,
    mobList,
  } = useGame()

  function getPosition(id: string) {
    const rc = RC(mobData.get(id).tileId)
    return [rc[1], .25, rc[0]]
  }

  return (
    <Instances
      range={mobList.length}
    >
      <boxGeometry />
      <meshLambertMaterial color={blue[900]} />
      {
        mobList.map((mob) => (
          <Instance
            key={`Mob${mob}`}
            position={getPosition(mob)}
            scale={[.5, .5, .5]}
          />
        ))
      }
    </Instances>
  )
}

export default Mobs
