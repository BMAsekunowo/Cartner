import React from 'react'
import '../styles/Cart.css' // Assuming you have a Cart.css file for styles
import CartHeader from '../components/Cart/CartHeader'
import CartTable from '../components/Cart/CartTable'
import OrderSummary from '../components/Cart/OrderSummary'

const Cart = () => {
  return (
    <div className='cartp-wrap'>
      <CartHeader />
      <div className="main-cart">
        <CartTable />
        <OrderSummary />        
      </div>
     
        {/* <h1>Your Shopping Cart</h1>
        <p>Here you can manage your items, view prices, and proceed to checkout.</p>
        <ul>
            <li>Item 1 - $10.00</li>
            <li>Item 2 - $15.00</li>
            <li>Item 3 - $20.00</li>
        </ul>
        <p>Total: $45.00</p>
        <button>Checkout</button> */}
    </div>
  )
}

export default Cart
