import { FiKey, FiLogIn, FiUser, FiX } from "react-icons/fi";
import { Button } from "../Buttons";
import Input from "../Input";
import { motion } from "framer-motion"; // Import motion

interface LoginProps {
    setShowModal: any;
}

const popInVariant = {
    hidden: { opacity: 0, scale: 0.5 }, // Initial hidden state
    visible: { opacity: 1, scale: 1 } // Visible state
};

const animationOptions = {
    duration: 0.2, // Adjust the duration to make it slower (in seconds)
    ease: "easeInOut" // Apply an easing function if desired
};

const Login = ({ setShowModal }: LoginProps) => {

    const execute = () => {
        setShowModal(false)
        console.log('hey')
    }
    console.log(setShowModal)

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={popInVariant}
            transition={animationOptions}
            className="authSection"
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
                <Button type="primary" icon={<FiLogIn size={16} />} text="Login" size="regular"  />
                <Button type="ghost" icon={<FiX size={16} />} text="Cancel" size="regular" execute={() => { setShowModal(false) }} />
            </div>
        </motion.div>
    );
}

export default Login;