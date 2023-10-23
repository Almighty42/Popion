// Redux
import { RootState, actions } from "@/redux/store"
// Types
import { handleLoginProps, handleRegisterProps } from "./AuthInterface"
// Firebase
import { auth, firestore } from "@/lib/firebase"
import { FirebaseError } from "firebase/app";
// Redux
import { useDispatch, useSelector } from "react-redux"
// Other
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import toast from "react-hot-toast"

const handleLogin = async ({ 
    state, 
    signInWithEmailAndPassword,
    dispatch
} : handleLoginProps) => {

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

const handleRegister = async ({ 
    state, 
    createUserWithEmailAndPassword,
    dispatch,
    userInfo 
} : handleRegisterProps) => {

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

export { handleLogin, handleRegister }