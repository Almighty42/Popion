// React
import React from "react";
// Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Style
import './global.scss'
// Context
import { AuthProvider } from "./context";
// Pages
import RegisterPage from "src/views/Register/RegisterPage/RegisterPage";
import LoginPage from "src/views/Login/LoginPage/LoginPage";
import HomePage from 'src/views/Home/HomePage/Home'
import ProfilePage from "src/views/Profile/ProfilePage/ProfilePage";

function App() {

  return (
    <AuthProvider>
      <AppCont.Provider
        value={{
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AppCont.Provider>
    </AuthProvider>
  );
}

export default App;
export const AppCont = React.createContext();