// React
import React, { useState, useContext } from 'react'
// Context
import { AuthContext } from 'src/context'
// Style
import './ProfileForm.scss'
// Mui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
// Avatar
import Avatar from 'react-avatar';
// useForm
import { useForm } from 'src/Hooks/useForm';
// Apollo
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, UPDATE_USER_MUTATION } from 'src/graphql';

const ProfileForm = () => {
    // useState
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    // useContext
    const { user } = useContext(AuthContext);
    const context = useContext(AuthContext)

    // useForm
    const { onChange, onSubmit, values } = useForm(callback, {
        username: user.username,
        email: user.email,
        id: user.id,
        password: user.password
    });

    // useMutation
    const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
        update(proxy, result) {
            if (JSON.parse(result.data.updateUser.postsData).length == 0) {
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: []
                    }
                })
            } else {
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [JSON.parse(result.data.updateUser.postsData)]
                    }
                })
            }

            const newUser = result.data.updateUser
            context.update(newUser)
        },
        onError(err) {
            console.log(err)
            setError(true)
            setErrorMsg(err.graphQLErrors[0].message)
            values.username = user.username
            values.email = user.email
        },
        variables: values,
    });

    // Functions
    function callback() {
        updateUser();
    }

    return (
        <div className='coverDiv' >
            <form noValidate className='LoginForm' >
                <h3 style={{ margin: '0px' }} > Profile </h3>
                <Avatar name={user.username} className='avatar' round={true} size={60} style={{ userSelect: 'none', marginBottom: '5px' }} />
                <div className='LoginDiv' >
                    <div className={open ? 'inputDiv' : 'inputDiv disabled'}>
                        <input className='input' name='username' onChange={onChange} value={values.username} placeholder={user.username} disabled={!open} />
                    </div>
                    <div className={open ? 'inputDiv' : 'inputDiv disabled'}>
                        <input className='input' type='email' name="email" onChange={onChange} value={values.email} placeholder={user.email} disabled={!open} />
                    </div>
                    <div className={open ? 'inputDiv' : 'inputDiv disabled'}>
                        <input className='input' type='password' name="password" onChange={onChange} value={values.password} placeholder="Password" disabled={!open} />
                    </div>
                    <button type='button' className='button' onClick={(e) => { setOpen(!open); if (open) { onSubmit(e) } }} > {open ? 'Confirm' : 'Edit'} </button>
                </div>
            </form>
            <Dialog
                open={error}
                onClose={() => (setError(false))}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ padding: 0 }} >
                    <Alert style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={() => { setError(false) }} severity="error" >{errorMsg}</Alert>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProfileForm