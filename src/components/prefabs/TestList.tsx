import useGame from "../../hooks/useGame"
import TestBox from "./TestBox"

export function TestList() {
  const {
    mobData,
    mobList,
  } = useGame()

  // console.log(mobData)
  // console.log(mobList)
  // mobList.forEach((mobId, idx) => console.log(idx, mobId, mobData.get(mobId).tileId))

  return (
    <>
      {
        mobList.map(mobId => (
          <TestBox
            key={mobId}
            modelScale={.25}
            speed={2}
            tileId={mobData.get(mobId).tileId}
          />
        ))
      }
    </>
  )
}

export default TestList
