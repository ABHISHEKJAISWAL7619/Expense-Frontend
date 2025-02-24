
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Trial from './pages/Trial'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/trial' element={<Trial/>}/>

      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
