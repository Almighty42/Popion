// React
import { useState } from "react";
// Firebase
import { FirebaseError } from "firebase/app";
import { auth, firestore } from "@/lib/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "@/redux/store";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
import Input from "@/components/Layout/Simple/Input";
// Animation
import { popInVariant1, animationOptions } from "@/lib/animations";
// Icons
import { FiAtSign, FiKey, FiLogIn, FiMail, FiUser, FiX } from "react-icons/fi";
// Other
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

interface AuthRegisterProps {
    isMin: boolean
}
interface AuthRegisterState {
    email: string,
    password: string,
    username: string,
    name: string
}

const AuthRegister = ({ isMin }: AuthRegisterProps) => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user)

    const [state, setState] = useState<AuthRegisterState>({
        email: "",
        password: "",
        username: "",
        name: ""
    })

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth as any)

    const handleRegister = async () => {
        try {
            if (state.name[0].toUpperCase() != state.name[0]) {
                toast.error("Name must start with a capital letter")
            } else if (state.username[0].toLowerCase() != state.username[0]) {
                toast.error("Username must start with a lower case letter")
            } else if (state.password.length > 5) {
                const refUsername = firestore.doc(`usernames/${state.username}`);
                const refEmail = firestore.doc(`emails/${state.email}`)
                const usernameCheck = await refUsername.get()
                const emailCheck = await refEmail.get()
    
                if (usernameCheck.exists) {
                    toast.error('Username is already in use')
                } else if (emailCheck.exists) {
                    toast.error('Email is already in use')
                } else {
                    dispatch(actions.feedActions.setLoadingState({ type: true, value: false }))
                    dispatch(actions.modalActions.turnOff());
                    createUserWithEmailAndPassword(state.email, state.password).then(async authUser => {
                        const data = {
                            name: state.name,
                            username: state.username,
                            email: state.email,
                            loggedIn: true,
                        }
                        dispatch(actions.userActions.assignUser(data));
                        const userUid = authUser?.user.uid
                        firestore.collection("users").doc(userUid).set({ ...userInfo, name: state.name, username: state.username, email: state.email })
                        firestore.collection("usernames").doc(state.username).set({ uid: userUid })
                        firestore.collection("emails").doc(state.email).set({ uid: userUid })
                    })
                }
            } else {
                toast.error('Password must be at least 6 characters long')
            }
        } catch(err) {
            if (err instanceof FirebaseError) {
                console.error("Firebase Error during login: ", err);
                toast.error("A Database error occurred during login");
              } else {
                console.error("An error occurred during login: ", err);
                toast.error("An error occurred during login");
              }
        }
    }
    return (
        <motion.div
            className="auth"
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
        >
            <form className="auth__form" onSubmit={e => { handleRegister(); e.preventDefault() }} >
                <h1 className="auth__header semibold"> Register on <span>Pop</span>ion </h1>
                <div className="auth__inputs">
                    <div className="auth__input">
                        <p className="p1" > Name </p>
                        <Input
                            type="text"
                            text="Type your name here..."
                            size={isMin ? 'regular' : 'large'}
                            border="colored"
                            icon={<FiUser size={32} />}
                            value={state.name}
                            onChange={(e: any) => setState({ ...state, name: e.target.value })}
                            iconSide="right"
                            required />
                    </div>
                    <div className="auth__input">
                        <p className="p1" > Username </p>
                        <Input
                            type="text"
                            text="Type your username here..."
                            size={isMin ? 'regular' : 'large'}
                            border="colored"
                            icon={<FiAtSign size={32} />}
                            value={state.username}
                            onChange={(e: any) => setState({ ...state, username: e.target.value })}
                            iconSide="right"
                            required
                        />
                    </div>
                    <div className="auth__input">
                        <p className="p1" > E-mail </p>
                        <Input
                            type="email"
                            text="Type your email here..."
                            size={isMin ? 'regular' : 'large'}
                            border="colored"
                            icon={<FiMail size={32} />}
                            value={state.email}
                            onChange={(e: any) => setState({ ...state, email: e.target.value })}
                            iconSide="right"
                            required
                        />
                    </div>
                    <div className="auth__input">
                        <p className="p1" > Password </p>
                        <Input
                            type="password"
                            text="Type your password here..."
                            size={isMin ? 'regular' : 'large'}
                            border="colored"
                            icon={<FiKey size={32} />}
                            value={state.password}
                            onChange={(e: any) => setState({ ...state, password: e.target.value })}
                            iconSide="right"
                            required
                        />
                    </div>
                </div>
                <div className="auth__actions">
                    <Button
                        type="primary"
                        icon={<FiLogIn size={16} />}
                        text="Register"
                        size={isMin ? 'small' : 'regular'}
                        animation
                        subType="submit"
                    />
                    <Button
                        type="ghost"
                        icon={<FiX size={16} />}
                        text="Cancel"
                        size={isMin ? 'small' : 'regular'}
                        execute={() => { dispatch(actions.modalActions.turnOff()) }}
                        animation
                    />

                </div>
            </form>
        </motion.div>
    );
}

export default AuthRegister;