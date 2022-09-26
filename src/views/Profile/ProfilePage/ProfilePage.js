// React
import React from 'react'
// Components
import Navbar from 'src/components/layout/Navbar/Navbar'
// Profile Form
import ProfileForm from '../ProfileForm/ProfileForm'

const ProfilePage = () => {
  return (
    <div style={{ height: '100vh' }} >
      <Navbar />
      <ProfileForm />
    </div>
  )
}

export default ProfilePage