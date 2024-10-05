import useGame from "../hooks/useGame"

import { CSSProperties } from "react"
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const Main = () => {
  const {
    count,
    incCount,
    decCount,
  } = useGame()

  const gl = {
    antialias: true,
  }

  const camera = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [8, 8, 8],
  }

  const canvasStyle = {
    width: "100vw", height: "100vh",
    // border: "3px solid #73AD21",
  }

  const divStyle: CSSProperties = {
    position: "fixed",
    left: "10vw", bottom: "10vh",
  }

  return (
    <>

      <Canvas style={canvasStyle} gl={gl} camera={camera}>
        {/*<color attach="background" args={['blue']} />*/}
        <axesHelper args={[5]} />
        {/*<gridHelper args={[16, 16, 0x999999, 0x333333]} />*/}
        <Experience />
      </Canvas>

      <div style={divStyle}>
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
