import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { CircularProgress } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        Hello World
      </h1>
      <Button/>
      <CircularProgress/>
    </>
  )
}

export default App
