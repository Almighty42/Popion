// React
import { useState } from "react";
// Redux
import { RootState, actions } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// Components
import { handleRegister } from "./AuthUtils";
import { AuthInput } from "./AuthComps";
import { Button } from "@/components/Layout/Simple/Buttons";
// Animation
import { animationOptions, popInVariant1 } from "@/lib/animations";
// Firebase
import { auth } from "@/lib/firebase";
// Types
import { AuthProps } from "./AuthInterface";
// Icons
import { FiLogIn, FiX } from "react-icons/fi";
// Other
import { motion } from "framer-motion";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const AuthRegister = ({ isMin }: AuthProps) => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user)
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth as any)

    const [state, setState] = useState<{
        email: string,
        password: string,
        username: string,
        name: string
    }>({
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
            <form className="auth__form" onSubmit={e => { 
                handleRegister({ 
                    state, 
                    createUserWithEmailAndPassword,
                    dispatch,
                    userInfo
                }); e.preventDefault() 
                }} >
                <h1 className="auth__header semibold"> Register on <span>Pop</span>ion </h1>
                <div className="auth__inputs">
                    <AuthInput isMin={isMin} setState={setState} state={state} title="name" />
                    <AuthInput isMin={isMin} setState={setState} state={state} title="username" />
                    <AuthInput isMin={isMin} setState={setState} state={state} title="email" />
                    <AuthInput isMin={isMin} setState={setState} state={state} title="password" />
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