import React, { useState } from 'react'
import Logo from './Logo'
import '../styles/Navbar.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import Sessions from '../pages/Sessions'
import Profile from '../pages/Profile';
import { handleLogout } from '../utils/auth';




const Navbar = () => {
    // Simulate login state (getting this from context or auth state)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
        <ToastContainer />
        <nav>
            <div className="nav-container">
                <div className="logo-wrap">
                    <Logo />
                </div>

                <ul className="nav-links">
                    {isLoggedIn ? (
                    <>
                        <li><Link to="/" className='linkto'>Home</Link></li>
                        <li><Link to="/products" className='linkto'>Explore Marketplace</Link></li>
                        <li><Link to="/sessions" className='linkto'>Sessions</Link></li>
                        <li><Link to="/cart" className='linkto'>My Cart</Link></li>
                        <li><Link to="/profile" className='linkto'>Profile</Link></li>
                        <li><button onClick={() => {handleLogout; setIsLoggedIn(false);}}>Logout</button></li>
                    </>
                    ) : (
                    <>
                        <li><Link to="/" className='linkto'>Explore</Link></li>
                        <li><Link to="/login" className='linkto'>Login</Link></li>
                        <li><Link to="/register" className='linkto'>Become a cartner today</Link></li>
                    </>
                    )}
                </ul> 
            </div>
        </nav>
    </div>
  )
}

export default Navbar
