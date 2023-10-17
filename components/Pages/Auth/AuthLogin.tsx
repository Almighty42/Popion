// React
import { useState } from "react"
// Firebase
import { FirebaseError } from "firebase/app";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, firestore } from "@/lib/firebase"
// Redux
import { useDispatch } from "react-redux"
import { actions } from "@/redux/store"
// Components
import { Button } from "@/components/Layout/Simple/Buttons"
import Input from "@/components/Layout/Simple/Input"
// Animation
import { popInVariant1, animationOptions } from "@/lib/animations"
// Icons
import { FiKey, FiLogIn, FiMail, FiX } from "react-icons/fi"
// Other
import { motion } from "framer-motion"
import toast from "react-hot-toast"

interface AuthLoginProps {
    isMin: boolean
}
interface AuthLoginState {
    email: string,
    password: string
}

const AuthLogin = ({ isMin } : AuthLoginProps) => {
    const dispatch = useDispatch()

    const [state, setState] = useState<AuthLoginState>({
        email: "",
        password:""
    })

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth as any)
    
    const handleLogin = async () => {
        try {
            dispatch(actions.feedActions.setLoadingState({ type: true, value: true }))
            signInWithEmailAndPassword(state.email, state.password).then(async authUser => {
                if (authUser != null) {
                    const emailRef = (await firestore.doc(`emails/${state.email}`).get()).data()
                    const userData = ((await firestore.doc(`users/${emailRef?.uid}`).get()).data())
                    dispatch(actions.userActions.fetchUser({ ...userData, loggedIn: true }))
                    dispatch(actions.modalActions.turnOff());
                } else {
                    toast.error("Email or password is incorrect")
                }
                dispatch(actions.feedActions.setLoadingState({ type: true, value: false }))
            })
        } catch (err) {
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
            <form onSubmit={e => { handleLogin(); e.preventDefault() }} >
                <h1 className="auth__header semibold"> Login in to <span>Pop</span>ion </h1>
                <div className="auth__inputs">
                    <div className="auth__input">
                        <p className="p1" > Email </p>
                        <Input 
                        type="email" 
                        text="Type your email here..." 
                        size={isMin ? 'regular' : 'large'} 
                        border="colored" 
                        icon={<FiMail size={32} />} 
                        iconSide="right" 
                        value={state.email} 
                        onChange={(e: any) => setState({  ...state, email:e.target.value})} 
                        required />
                    </div>
                    <div className="auth__input">
                        <p className="p1" > Password </p>
                        <Input 
                        type="password" 
                        text="Type your password here..." 
                        size={isMin ? 'regular' : 'large'} 
                        border="colored" 
                        icon={<FiKey size={32} />} 
                        iconSide="right" 
                        value={state.password} 
                        onChange={(e: any) => setState({ ...state, password:e.target.value })} 
                        required />
                    </div>
                </div>
                <div className="auth__actions">
                    <Button 
                    type="primary" 
                    icon={<FiLogIn 
                    size={16} />} 
                    text="Login" 
                    size={isMin ? 'small' : 'regular'} 
                    animation />
                    <Button 
                    type="ghost" 
                    icon={<FiX 
                    size={16} />} 
                    text="Cancel" 
                    size={isMin ? 'small' : 'regular'} 
                    execute={() => { dispatch(actions.modalActions.turnOff()) }} 
                    animation />
                </div>
            </form>
        </motion.div>
    );
}

export default AuthLogin;