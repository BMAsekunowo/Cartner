import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn’t exist.</p>
      <Link to="/" style={{ color: "#6366F1" }}>Go back to Home</Link>
    </div>
  )
}

export default Error404
