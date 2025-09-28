import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SitesApp from './components/site'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SitesApp></SitesApp>
    </>
  )
}

export default App
