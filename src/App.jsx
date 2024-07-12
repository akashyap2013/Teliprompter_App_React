import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ValueProvider } from './component/api'

import Container from './component/container'
import Telipropmter from './component/teliprompt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ValueProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/teliprompt' element={<Telipropmter />} />
        </Routes>
      </Router>
    </ValueProvider>
  )
}

export default App
