// React
import { useState } from "react";
// Redux
import { actions } from "@/redux/store";
import { useDispatch } from "react-redux";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
import { AuthInput } from "./AuthComps";
// Animation
import { animationOptions, popInVariant1 } from "@/lib/animations";
// Icons
import { FiLogIn, FiX } from "react-icons/fi";
// Types
import { AuthProps, AuthRegisterStateProps } from "./AuthInterface";
// Firebase
import { auth } from "@/lib/firebase";
// Functions
import { handleLogin } from "./AuthUtils";
// Other
import { motion } from "framer-motion";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const AuthLogin = ({ isMin } : AuthProps) => {
    const dispatch = useDispatch()

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth as any)

    const [state, setState] = useState<AuthRegisterStateProps>({
        email: "",
        password: "",
        username: "",
        name: ""
    })

    return (
        <motion.div
            className="auth"
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
        >
            <form className="auth__form" onSubmit={e => { handleLogin({ 
                state, 
                signInWithEmailAndPassword,
                dispatch
                }); e.preventDefault() }} >
                <h1 className="auth__header semibold"> Login in to <span>Pop</span>ion </h1>
                <div className="auth__inputs">
                    <AuthInput isMin={isMin} setState={setState} state={state} title="email" />
                    <AuthInput isMin={isMin} setState={setState} state={state} title="password" />
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