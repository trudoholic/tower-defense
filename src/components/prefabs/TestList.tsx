import useGame from "../../hooks/useGame"
import TestBox from "./TestBox"

export function TestList() {
  const {
    // mobData,
    mobList,
  } = useGame()
  console.log(mobList)

  return (
    <>
      {
        mobList.map(id => (
          <TestBox
            key={id}
            modelScale={.25}
            speed={2}
            tileId={id}
          />
        ))
      }
    </>
  )
}

export default TestList
