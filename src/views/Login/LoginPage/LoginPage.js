// React
import React from 'react'
// Login Form
import LoginForm from '../LoginForm/LoginForm'
// Components
import Navbar from 'src/components/layout/Navbar/Navbar'

const LoginPage = () => {
  return (
    <div className='div' >
      <Navbar />
      <LoginForm />
    </div>
  )
}

export default LoginPage