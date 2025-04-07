
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>

      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
