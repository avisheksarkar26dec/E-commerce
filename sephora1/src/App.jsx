import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar/>}>
        <Route index element={<Home/>}/>
        <Route path='cart' element={<Cart/>}/>

        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
