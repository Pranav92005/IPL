
import Dashboard from './pages/Dashboard'

import {  Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import Home from './pages/home'


import Product from './pages/Product'
import Teamchange from './pages/Teamchange'


function App() {
  

  return (
    <>
    <Routes>

    <Route path="/" element={<Dashboard />} />
    <Route path="/auth" element={<AuthPage/>} />





    <Route path="/home" element={<Home/>} />
    <Route path="/product" element={<Product/>} />
    
    <Route path="/teamchange" element={<Teamchange/>} />

    </Routes>
   

    
    
      
      
    </>
  )
}

export default App
