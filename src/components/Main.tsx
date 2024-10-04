import useGame from "../hooks/useGame"

const Main = () => {
  const {
    count,
    incCount,
    decCount,
  } = useGame()

  return (
    <>
      <div className="card">
        <button onClick={() => incCount(1)}>
          +
        </button>
        <button onClick={() => decCount(1)}>
          -
        </button>
        <p>
          count is {count}
        </p>
      </div>
    </>
  )
}

export default Main
