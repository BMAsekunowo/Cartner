import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <h2>Register Page</h2>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  )
}

export default Register
