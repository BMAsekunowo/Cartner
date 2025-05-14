import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate} from 'react-router-dom'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { handleLogout } from './utils/auth';

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
      <ToastContainer />
      {/* <h1>Welcome to Cartner</h1> */}
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
    </>
  )
}

export default App
