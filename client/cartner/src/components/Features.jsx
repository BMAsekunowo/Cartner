import React from 'react'
import CollabImage from '../assets/group-collab.png'
import SmartCartImage from '../assets/smart-cart.png'
import SessionBasedImage from '../assets/session-based.png'
import DeviceSyncImage from '../assets/device-sync.png'
import '../styles/Features.css'

const Features = () => {
  return (
    <>
      <div className="features-container">
        <div className="feature-wrap">
          <div className="feature-icon">
            <img src={CollabImage} alt="Group Collab Img"/>
          </div>
          <h3>Real-Time Collab Shopping</h3>
          <p>Shop together with friends, partners or family, essentially anyone can be your cartner - 
            see updates in real time, share opinions, and make decisions together.
          </p>
        </div>
        <div className="feature-wrap">
          <div className="feature-icon">
            <img src={SmartCartImage} alt="Smart Cart Splitting Img" />
          </div>
          <h3>Smart Cart Splitting</h3>
          <p>
            Automatically split the bill with your cartners by participant count,budget contributions,
            or custom percentages. No more manual calculations or awkward moments at checkout.
          </p>
        </div>
        <div className="feature-wrap">
          <div className="feature-icon">
            <img src={SessionBasedImage} alt="Session Based Planning Img" />
          </div>
          <h3>Session-Based Planning</h3>
          <p>
            Create unique sessions rooms with passcodes and names and it's own unique cart. Perfect for
            any shopping objectives, whether it's a birthday party, wedding planning, or just a casual shopping spree.
          </p>
        </div>
        <div className="feature-wrap">
          <div className="feature-icon">
            <img src={DeviceSyncImage} alt="Device Synced Simplicity Img" />
          </div>
          <h3>Device-Synced Simplicity</h3>
          <p>
          Whether you’re shopping from your phone on the go or coordinating from your desktop at home,
          Cartner keeps you seamlessly connected — ensuring every session stays perfectly in sync and accessible from wherever you are.
          </p>
        </div>
      </div>
    </>
  )
}

export default Features
