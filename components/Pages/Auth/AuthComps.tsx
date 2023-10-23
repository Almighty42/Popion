// Functions
import { returnStringWithCapital } from "@/utils/functions"
// Types
import { AuthInputProps } from "./AuthInterface"
// Components
import Input from "@/components/Layout/Simple/Input"
// Icons
import { FiAtSign, FiKey, FiMail, FiUser } from "react-icons/fi"

const AuthInput = ({ isMin, state, setState, title } : AuthInputProps ) => {
    return (
        <div className="auth__input">
            <p className="p1" > {returnStringWithCapital(title)} </p>
            <Input
                type={
                    title == 'email' ? 'email' :
                    title == 'password' ? 'password' :
                    'text'
                }
                text={`Type your ${title} here...`}
                size={isMin ? 'regular' : 'large'}
                border="colored"
                icon={
                    title == "name" ? <FiUser size={32} /> :
                    title == "username" ? <FiAtSign size={32} /> :
                    title == 'email' ? <FiMail size={32} /> :
                    <FiKey size={32} />
                }
                value={
                    title == "name" ? state.name :
                    title == "username" ? state.username :
                    title == 'email' ? state.email :
                    state.password
                }
                onChange={(e: any) => {
                    if (title == 'name') setState({ ...state, name: e.target.value })
                    if (title == 'username') setState({ ...state, username: e.target.value })
                    if (title == 'email') setState({ ...state, email: e.target.value })
                    if (title == 'password') setState({ ...state, password: e.target.value })
                    }}
                iconSide="right"
                required />
        </div>
    )
}

export { AuthInput }