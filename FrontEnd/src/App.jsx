import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PromptPalDashboard from './pages/PromptPalDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PromptPalDashboard />
 

  )
}

export default App
