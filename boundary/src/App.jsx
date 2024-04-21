import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { CircularProgress } from '@chakra-ui/react'


import LogInPage from "./Pages/LoginPage";

import displayList from "."

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Router path="/login" element={<LogInPage />} />
      </Routes>
    </Router>
  )
}

export default App
