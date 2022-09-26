// React
import React, { useContext } from 'react'
// Context
import { AuthContext } from 'src/context';
// React router
import { useNavigate } from "react-router-dom";
// Style
import './Navbar.scss'
// Assets
import HomeIcon from 'src/assets/SVGR/HomeIcon'
import ProfileIcon from 'src/assets/SVGR/ProfileIcon';
// useMediaQuery
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  // useMediaQuery
  const open = useMediaQuery({ query: '(max-width: 450px)' })

  // useNavigate
  const navigate = useNavigate()

  // useContext
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='navbar' >
      {open ? (
        <>
        </>
      ) : (
        <>
          <div className='navbarDiv' >
            <h1> Popion </h1>
          </div>
        </>
      )}
      <div className='navbarDiv' >
        <HomeIcon onClick={() => { navigate('/') }} />
        {user ? (
          <>
            <ProfileIcon onClick={() => { navigate('/profile') }} />
            <h2 onClick={() => { logout(); navigate('/login'); }} > Logout </h2>
          </>
        ) : (
          <>
            <h2 onClick={() => { navigate('/register') }} > Register </h2>
            <h2 onClick={() => { navigate('/login') }} > Login </h2>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar