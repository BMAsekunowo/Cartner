import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  
  // useEffect to fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:5005/api/conhealth')
    .then (res => console.log(res.data));
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> 
        </nav>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          {/* Route for client side invalid path Error */}
          <Route path="*" element={ <Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
