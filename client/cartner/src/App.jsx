import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from './utils/auth';
import Navbar from './components/Navbar';

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
    </>
  )
}

export default App
