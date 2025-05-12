import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  )
}

export default Login
