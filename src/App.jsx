import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<PrivateRoutes/>}>
        <Route path='/pokedex' element={<Pokedex />} />
        <Route path='/pokedex/:pokemonId' element={<PokemonDetail />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
