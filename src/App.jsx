import { useState } from 'react'

import './App.css'
import pokeballLogo from './assets/pokeballLogo.png'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app-container">
   
      <div className='header'>
        
        
        <img
        src={pokeballLogo}
        alt="Pokeball logo"
        className="header-logo"
      />
        <h1>Pokemon Stats</h1>
      {/* Add the right logo here */}
      <img
        src={pokeballLogo}
        alt="Pokeball logo"
        className="header-logo"
      />
      </div>
    
    </div>
    </>
  )
}

export default App
