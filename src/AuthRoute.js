// React
import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
// Context
import { AuthContext } from './context'

function AuthRoute({ component: Component, ...rest }){
    const { user } = useContext(AuthContext)

    return (
        <Route
        {...rest}
        render={props => 
        user ? <Navigate to="/" /> : <Component {...props} />}
        />
    )
}

export default AuthRoute