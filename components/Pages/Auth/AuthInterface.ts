import { UserInfoProps } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"
import { Action } from "redux"

interface AuthProps {
    isMin: boolean
}
interface AuthLoginStateProps {
    email: string,
    password: string
}
interface AuthRegisterStateProps extends AuthLoginStateProps {
    username: string,
    name: string
}
interface handleLoginProps {
    state: {
        email: string,
        password: string
    },
    signInWithEmailAndPassword(email: string, password: string): Promise<any | undefined>,
    dispatch: Dispatch<Action>
}
interface handleRegisterProps {
    state: {
        email: string,
        password: string,
        username: string,
        name: string
    },
    createUserWithEmailAndPassword(email: string, password: string) : Promise<any | undefined>,
    dispatch: Dispatch<Action>,
    userInfo: UserInfoProps
}
interface AuthInputProps {
    isMin: boolean,
    state: {
        email: string,
        password: string,
        username: string,
        name: string
    },
    setState: Dispatch<SetStateAction<{
        email: string,
        password: string,
        username: string,
        name: string
    }>>,
    title: 
    'name' | 'username' | 'email' | 'password'
}

export type { 
    AuthProps,
    AuthLoginStateProps,
    AuthRegisterStateProps,
    handleLoginProps,
    handleRegisterProps,
    AuthInputProps
}