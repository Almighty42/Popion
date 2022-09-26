// React
import React, { useState, useContext } from 'react'
// React router
import { useNavigate } from "react-router-dom";
// Style
import "./RegisterForm.scss"
// Apollo
import { REGISTER_USER } from 'src/graphql';
import { useMutation } from "@apollo/react-hooks";
// Hooks
import { useForm } from 'src/Hooks/useForm'
// Context
import { AuthContext } from 'src/context';
// Mui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
// Email validator
import * as EmailValidator from 'email-validator';

const RegisterForm = () => {
  // useState
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false)

  // useContext
  const context = useContext(AuthContext)

  // useNavigate
  const navigate = useNavigate()

  // useForm
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // useMutation
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      navigate('/')
    },
    onError(err) {
      setOpen(true)
      setErrors(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  // Functions
  function registerUser() {
    if (values.username == '' || values.email == '' || values.password == '' || values.confirmPassword == '') {
      setErrors('Please leave no empty fields')
      setOpen(true)
    } else if (!EmailValidator.validate(values.email)) {
      setErrors('Email is in invalid form')
      setOpen(true)
    } else {
      addUser()
    }
  }

  return (
    <>
      <div className='coverDiv' >
        <form className='RegisterForm' noValidate onSubmit={onSubmit} >
          <h3> Register </h3>
          <div className='RegisterDiv' >
            <div className='inputDiv'>
              <input className='input' name="username" placeholder='Username' value={values.username} onChange={onChange} />
            </div>
            <div className='inputDiv'>
              <input className='input' name="email" type='email' placeholder='Email' value={values.email} onChange={onChange} />
            </div>
            <div className='inputDiv'>
              <input className='input' name="password" type='password' placeholder='Password' value={values.password} onChange={onChange} />
            </div>
            <div className='inputDiv'>
              <input className='input' name="confirmPassword" type='password' placeholder='Confirm Password' value={values.confirmPassword} onChange={onChange} />
            </div>
            <button className='button'> Register </button>
          </div>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={() => (setOpen(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ padding: 0 }} >
          <Alert style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={() => { setOpen(false) }} severity="error" >{errors}</Alert>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RegisterForm