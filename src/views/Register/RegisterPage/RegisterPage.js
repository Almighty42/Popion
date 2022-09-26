// React
import React from 'react'
// Style
import './RegisterPage.scss'
// RegisterForm
import RegisterForm from '../RegisterForm/RegisterForm'
// Components
import Navbar from 'src/components/layout/Navbar/Navbar'

const RegisterPage = () => {
  return (
    <div className='div' >
      <Navbar />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage