import { usePostAlterArray, useReturnUserId } from "@/lib/hooks"
import { actions } from "@/redux/store"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { motion } from 'framer-motion';
import { FiShare2, FiSlash, FiUnlock, FiVolume2, FiVolumeX } from "react-icons/fi";
import { ProfileDropdownProps } from "./UserInterface";

const ProfileDropdown = ({ 
    block, 
    mute, 
    setState, 
    ownerUsername, 
    setMute, 
    setBlock, 
    ownerId, 
    username 
}: ProfileDropdownProps) => {

    const dispatch = useDispatch()

    const handleMuteUser = async () => {
        const userId = await useReturnUserId({ username })
        if (!mute) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${ownerUsername} is muted`)
            setMute(true)
            dispatch(actions.userActions.handleMuteUser({ add: true, content: ownerId }))

        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${ownerUsername} is unmuted`)
            setMute(false)
            dispatch(actions.userActions.handleMuteUser({ add: false, content: ownerId }))
        }
    }
    const handleBlockUser = async () => {
        const userId = await useReturnUserId({ username })
        if (!block) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${ownerUsername} is blocked`)
            setBlock(true)
            dispatch(actions.userActions.handleBlockUser({ add: true, content: ownerId }))
        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${ownerUsername} is unblocked`)
            setBlock(false)
            dispatch(actions.userActions.handleBlockUser({ add: false, content: ownerId }))
        }
    }
    const handleSharePost = async () => {
        dispatch(actions.modalActions.turnOn('sharePost'))
    }

    return (
        <motion.div
            className="profile__dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {!block &&
                <>
                    <button onClick={() => { handleMuteUser(); setState(false) }} >
                        {mute ?
                            <>
                                <FiVolume2 size={24} />
                                <p className='p2 semibold' > Unmute user </p>
                            </> :
                            <>
                                <FiVolumeX size={24} />
                                <p className='p2 semibold' > Mute user </p>
                            </>
                        }
                    </button>
                    <hr />
                </>
            }
            <button onClick={() => { handleBlockUser(); setState(false) }} >
                {block ?
                    <>
                        <FiUnlock size={24} />
                        <p className='p2 semibold' > Unblock user </p>
                    </> :
                    <>
                        <FiSlash size={24} />
                        <p className='p2 semibold' > Block user </p>
                    </>
                }
            </button>
            {/* <hr />
            <button onClick={() => { handleSharePost(); setState(false) }} >
                <FiShare2 size={24} />
                <p className='p2 semibold' > Share user </p>
            </button> */}
        </motion.div>
    )
}

export default ProfileDropdown;