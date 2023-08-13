// Icons
import { FiKey, FiLogIn, FiUser, FiX } from "react-icons/fi"
// Components
import { Button } from "../../base/Buttons"
import Input from "../../base/Input"
// Framer motion
import { motion } from "framer-motion"
// Redux
import { useDispatch } from "react-redux"
import { actions } from "@/redux/store"
// Animation
import { popInVariant1, animationOptions } from "@/redux/other"

const Login = () => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <motion.div
            className="authFrame"
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
            
        >
            <h1 className="semibold"> Login in to <span>Pop</span>ion </h1>
            <div className="inputs">
                <div className="item">
                    <p className="p1" > Username </p>
                    <Input type="text" text="Type your username here..." size="large" border="colored" icon={<FiUser size={24} />} />
                </div>
                <div className="item">
                    <p className="p1" > Password </p>
                    <Input type="password" text="Type your password here..." size="large" border="colored" icon={<FiKey size={24} />} />
                </div>
            </div>
            <div className="actions">
                <Button type="primary" icon={<FiLogIn size={16} />} text="Login" size="regular" animation  />
                <Button type="ghost" icon={<FiX size={16} />} text="Cancel" size="regular" execute={() => { dispatch(actions.modalActions.turnOff()) }} animation />
            </div>
        </motion.div>
    );
}

export default Login;