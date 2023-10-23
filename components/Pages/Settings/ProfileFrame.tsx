// React
import { useEffect, useState } from "react"
// Components
import { Button } from "@/components/Layout/Simple/Buttons"
import Input from "@/components/Layout/Simple/Input"
// Redux
import { useDispatch, useSelector } from "react-redux"
import { RootState, actions } from "@/redux/store"
// Icons
import { FiAtSign, FiCheck, FiGrid, FiHeart, FiImage, FiMail, FiPlus, FiRefreshCw, FiSmile, FiUser, FiX } from "react-icons/fi"
// Types
import { SettingsInputProps, SettingsTagProps } from "./SettingsPageInterfaces"
// Other
import toast from "react-hot-toast"
import { auth, firestore } from "@/lib/firebase"

const ProfileFrame = () => {

    const [name, setName] = useState<string>('')
    const [username, setUserame] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tags, setTags] = useState<{
        posts: boolean,
        mentions: boolean,
        likes: boolean,
        images: boolean
    }>({
        posts: true,
        mentions: true,
        likes: true,
        images: true
    })
    const [avatar, setAvatar] = useState()

    const [revertButtonState, setRevertButtonState] = useState(false)

    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user)

    useEffect(() => {
        handlePullValues()
    }, [])
    

    const handleSaveChanges = async () => {
        if (name[0].toUpperCase() != name[0]) {
            toast.error("Name must start with a capital letter")
        } else if (username[0].toLowerCase() != username[0]) {
            toast.error("Username must start with a lower case letter")
        } else {
            const refUsername = firestore.doc(`usernames/${username}`);
            const refEmail = firestore.doc(`emails/${email}`)
            const usernameCheck = await refUsername.get()
            const emailCheck = await refEmail.get()

            if (usernameCheck.exists) {
                toast.error('Username is already in use')
            } else if (emailCheck.exists) {
                toast.error('Email is already in use')
            } else {
                dispatch(actions.modalActions.setLoadingState(true))

                const currentUser = auth.currentUser;
                currentUser?.updateEmail(email)

            }
        }
        toast.success("Changes saved!")        
    }
    const handlePullValues = () => {
        setName(userInfo.name)
        setUserame(userInfo.username)
        setEmail(userInfo.email)
        setDescription(userInfo.description)
        setTags(userInfo.visibleTags)
    }

    return (
        <form onSubmit={e => { handleSaveChanges(); e.preventDefault() }} >
            <div className="settings--frame__header">
                <h5 className="semibold" > Profile </h5>
                <hr />
            </div>
            <div className="settings--frame__content">
                <SettingsInput value={name} onChange={(e: any) => { setName(e.target.value); setRevertButtonState(true) }} type="name" />
                <SettingsInput value={username} onChange={(e: any) => { setUserame(e.target.value); setRevertButtonState(true) }} type="username" />
                <SettingsInput value={email} onChange={(e: any) => { setEmail(e.target.value); setRevertButtonState(true) }} type="email" />
                <SettingsInput value={description} onChange={(e: any) => { setDescription(e.target.value); setRevertButtonState(true) }} type="description" />
                <div className="settings--frame__tags">
                    <p className="p2" > Visible tags </p>
                    <div className="settings--frame__section">
                        <SettingsTag type="Posts" selected={tags.posts} execute={() => { setTags({ ...tags, posts: !tags.posts }) }} />
                        <SettingsTag type="Mentions" selected={tags.mentions} execute={() => { setTags({ ...tags, mentions: !tags.mentions }) }} />
                        <SettingsTag type="Likes" selected={tags.likes} execute={() => { setTags({ ...tags, likes: !tags.likes }) }} />
                        <SettingsTag type="Images" selected={tags.images} execute={() => { setTags({ ...tags, images: !tags.images }) }} />
                    </div>
                </div>
                <div className="settings--frame__actions">
                    <Button
                        type="ghost"
                        animation
                        color="avatar"
                        execute={() => { }}
                        icon={<FiSmile size={16} />}
                        size="small"
                        text="Change avatar"
                        subType="button" />
                    <div className="settings--frame__actions__buttons">
                        <Button
                        type="ghost"
                        animation={revertButtonState}
                        execute={() => { handlePullValues(); setTimeout(() => {
                            setRevertButtonState(false)
                        }, 100);  }}
                        icon={<FiRefreshCw size={16} />}
                        size="small"
                        text="Reset form"
                        color={revertButtonState ? 'standard' : 'disabled'}
                        subType="button" />
                        <Button
                        type="primary"
                        animation
                        execute={() => {  }}
                        icon={<FiCheck size={16} />}
                        size="small"
                        text="Save changes"
                        subType="submit" />
                    </div>

                </div>
            </div>
        </form>
    )
}

const SettingsInput = ({ type, value, onChange }: SettingsInputProps) => {
    return (
        <div className="settings--frame__input">
            <p className="p2" > {
                type == 'name' ? 'Name' :
                    type == 'username' ? 'Username' :
                        type == 'email' ? 'Email' :
                            'Description'
            } </p>
            <Input
                size="regular"
                text={`Type your new ${type} here...`}
                iconSide="right"
                type={type == 'email' ? 'email' : 'text'}
                icon={
                    type == 'name' || type == 'username' ? <FiUser size={24} /> :
                        type == 'email' ? <FiMail size={24} /> : <FiUser size={-1} />
                }
                textarea={type == "description"}
                value={value}
                onChange={onChange}
                required={type != "description"}
            />
        </div>
    )
}

const SettingsTag = ({ type, selected, execute }: SettingsTagProps) => {
    return (
        <div className={`settings--frame__tag ${!selected ? 'settings--frame__tag--selected' : ''}`}>
            {type == 'Posts' ? <FiGrid size={20} /> :
                type == 'Mentions' ? <FiAtSign size={20} /> :
                    type == 'Likes' ? <FiHeart size={20} /> :
                        <FiImage size={20} />
            }
            <p className={`p1 p1${selected ? '--selected' : ''}`} > {type} </p>
            <button onClick={() => { execute() }} type="button" >
                {!selected ? <FiPlus size={20} /> : <FiX size={20} />}
            </button>
        </div>
    )
}

export default ProfileFrame