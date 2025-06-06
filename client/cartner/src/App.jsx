import React, { useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate} from 'react-router-dom'
import { handleLogout } from './utils/auth';
import Navbar from './components/Navbar';
import Error404 from './pages/Error404'
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Sessions from './pages/Sessions'
import Profile from './pages/Profile';
import './styles/index.css'; // Importing global styles

function App() {
  //Checking token validity
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch('/api/auth/validate-token', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 401) {
        handleLogout(navigate); // Auto logout
      }
    };

    checkToken();
  }, [navigate]);
  
  // useEffect to fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:5005/api/conhealth')
    .then (res => console.log(res.data));
  }, []);
  

  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/cart" element={ <Cart />} />
          <Route path="/sessions" element={ <Sessions />} />
          <Route path="/profile" element={ <Profile />} />
          {/* Route for client side invalid path Error */}
          <Route path="*" element={ <Error404 />} />
      </Routes>
      {/* <Home /> */}
    </>
  )
}

export default App
