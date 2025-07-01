import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaGlobe, FaBriefcase } from 'react-icons/fa'
import '../../styles/ProfileMain.css'

const ProfileMain = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))

  const mockCarts = [
    { id: 1, title: 'Grocery Run', items: 8, status: 'Active' },
    { id: 2, title: 'Birthday Surprise', items: 15, status: 'Draft' },
    { id: 3, title: 'Black Friday Picks', items: 27, status: 'Active' },
    { id: 4, title: 'Baby Essentials', items: 12, status: 'Active' },
    { id: 5, title: 'Home Office Setup', items: 10, status: 'Draft' },
    { id: 6, title: 'Holiday Gifts', items: 20, status: 'Active' },
    { id: 7, title: 'Pet Supplies', items: 5, status: 'Draft' },
    { id: 8, title: 'Fitness Gear', items: 9, status: 'Active' },
    { id: 9, title: 'Travel Essentials', items: 6, status: 'Draft' },
    { id: 10, title: 'Kitchen Appliances', items: 4, status: 'Active' },
    { id: 11, title: 'Fashion Finds', items: 11, status: 'Draft' },
    { id: 12, title: 'Tech Gadgets', items: 7, status: 'Active' }
  ]

  return (
    <div>
       <main className="profile-main">
        <div className="profile-header">
            <span className='name-wrap'>
                <h1>Welcome Back {user.name}!</h1>
                <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                    ☰
                </button>
                {showMenu && (
                    <ul className="menu-dropdown">
                    <li>Edit Profile</li>
                    <li>My Orders</li>
                    <li>My Sessions</li>
                    <li>FAQs</li>
                    <li>Contact Support</li>
                    <li>Logout</li>
                    </ul>
                )}
            </span>
          
          <p>Joined in 2024 <span className="edit-profile"> <Link to="/profile" className="linkto">Edit profile</Link></span></p>
        </div>

        <div className="profile-bio">
          <div className='apos'> “</div>
          <blockquote>
            I'm a passionate tech-savvy guy building Cartner to make shopping more collaborative. I love working across finance and tech, and this platform reflects that.
          </blockquote>

          <ul className="profile-details">
            <li><FaMapMarkerAlt className="icon" /> Lives in Welland, Canada</li>
            <li><FaGlobe className="icon" /> Speaks English, Yoruba</li>
            <li><FaBriefcase className="icon" /> Freelance Web Developer</li>
          </ul>
        </div>

        <div className="cart-section">
          <h2>My Carts</h2>
          <div className="cart-scroll">
            {mockCarts.map(cart => (
              <div className="cart-card" key={cart.id}>
                <h3>{cart.title}</h3>
                <p>{cart.items} items</p>
                <span className={`status ${cart.status.toLowerCase()}`}>{cart.status}</span>
                <span>
                  <Link to="/cart" className="linkto" style={{textAlign:"right",}}>View More</Link>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="product-section">
          <h2>Boluwatife’s Products</h2>
          <div className="product-cards coming-soon">
            <p>🔧 This feature is <strong>Coming Soon</strong></p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfileMain
