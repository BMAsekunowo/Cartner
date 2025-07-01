import React from 'react'
import '../../styles/ProfileSide.css' 
import { Link } from 'react-router-dom'
const ProfileSide = () => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    const orders = [
        {
          id: 'ORD001',
          item: 'Bluetooth Speaker',
          status: 'Delivered',
          date: '2025-06-20',
        },
        {
          id: 'ORD002',
          item: 'Wireless Earbuds',
          status: 'Shipped',
          date: '2025-06-25',
        },
        {
          id: 'ORD003',
          item: 'Smartwatch',
          status: 'Processing',
          date: '2025-06-27',
        },
      ]

  return (
    <div>
      <aside className="profile-sidebar">
        <div className="pimg-wrap">
            <img src="/avatar.png" alt="User Avatar" className="p-avatar" />
            <Link to="/products" className="linkto">Update Photo</Link>
        </div>

        <div className="verification">
          <p>148 sessions joined</p>
          <span className="verified">✔ Verified</span>
          <span className="email-add">{user.email}</span>
        </div>

        <div className="provided-info">
          <p>{user.name} provided</p>
          <ul>
            <li>Government ID</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Work email</li>
          </ul>
        </div>

        <div className="your-orders">
          <p>Your Orders</p>
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <span className="order-id">#{order.id}</span>
                <span className="order-name">{order.item}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <span className="order-date">{order.date}</span>
                <span className='view-more'>
                  <Link to="/" className='linkto'>View Order</Link>
                </span>
              </li>
            ))}
            <li className='view-more'>
              <Link to="/" className='linkto'>View more</Link>
            </li>
            
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default ProfileSide
