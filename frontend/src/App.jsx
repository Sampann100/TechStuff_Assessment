import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonList from './Component/PokemonList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PokemonList/>
    </>
  )
}

export default App
