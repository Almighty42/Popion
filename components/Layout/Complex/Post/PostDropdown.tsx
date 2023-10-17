// Firebase
import firebase from "firebase/compat/app"
import { firestore, storage } from "@/lib/firebase"
// Redux
import { useDispatch } from "react-redux"
import { actions } from "@/redux/store"
// Components
import PostDropdownItem from "./PostDropdownItem"
import { PostDropdownProps } from "./PostInterface"
// Hooks
import { usePostAlterArray, useReturnUserId } from "@/lib/hooks"
// Other
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const PostDropdown = ( props : PostDropdownProps) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleShowPost = () => {
        router.push(`/posts/${props.postId}`)
    }
    const handleEditPost = () => {
        props.initializeEditPost();
    }
    const handleOpenProfile = () => {
        router.push(`/users/${props.ownerUsername}`)
        window.location.reload()
    }
    const handleCopyText = () => {
        navigator.clipboard.writeText(props.content)
        toast.success("Copied to clipboard")
    }
    const handleMuteUser = async () => {
        const ownerId = await useReturnUserId({ username: props.ownerUsername })
        const userId = await useReturnUserId({ username: props.username })
        if (!props.mute) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${props.ownerUsername} is muted`)
            //setStateMuted(true)
            dispatch(actions.postActions.handleMute({ add: true, username: props.ownerUsername }))
            dispatch(actions.userActions.handleMuteUser({ add: true, content: ownerId }))

        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${props.ownerUsername} is unmuted`)
            dispatch(actions.postActions.handleMute({ add: false, username: props.ownerUsername }))
            dispatch(actions.userActions.handleMuteUser({ add: false, content: ownerId }))
        }
    }
    const handleBlockUser = async () => {
        const ownerId = await useReturnUserId({ username: props.ownerUsername })
        const userId = await useReturnUserId({ username : props.username })
        if (!props.block) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${props.ownerUsername} is blocked`)
            dispatch(actions.postActions.handleBlock({ add: true, username: props.ownerUsername }))
            dispatch(actions.userActions.handleBlockUser({ add: true, content: ownerId }))
        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${props.ownerUsername} is unblocked`)
            dispatch(actions.postActions.handleBlock({ add: false, username: props.ownerUsername }))
            dispatch(actions.userActions.handleBlockUser({ add: false, content: ownerId }))
        }
    }
    const handleSharePost = () => {
        dispatch(actions.modalActions.turnOn('sharePost'))
    }
    const handleDeletePost = async () => {
        props.setLoadingPosts(true)
        const userId = await useReturnUserId({ username: props.username })
        const postInfo = (await firestore.doc(`users/${userId}/posts/${props.postId}`).get()).data()
        postInfo?.tags.map(async (tag: any) => {
            const tagInfo = (await firestore.doc(`tags/${tag}`).get()).data()
            await firestore.doc(`tags/${tag}`).update({ postsNum: tagInfo?.postsNum - 1, posts: firebase.firestore.FieldValue.arrayRemove(props.postId) })
        })
        firestore.doc(`users/${userId}/posts/${props.postId}`).delete()
        dispatch(actions.postActions.handleDelete(props.postId))
        if (props.imageValue) {
            var image = storage.ref(`images/${props.postId}`)
            image.delete()
        }
        props.setLoadingPosts(false)
    }

    return (
        <motion.div
            className="post__dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <PostDropdownItem type="Show post" handleFunction={handleShowPost} setState={props.setState} muteState={props.mute} blockState={props.block} />
            <hr />
            {props.currentUserOwner ?
                <PostDropdownItem type="Edit post" handleFunction={handleEditPost} setState={props.setState} muteState={props.mute} blockState={props.block} /> :
                <PostDropdownItem type="Open profile" handleFunction={handleOpenProfile} setState={props.setState} muteState={props.mute} blockState={props.block} />
            }
            <hr />
            <PostDropdownItem type="Copy text" handleFunction={handleCopyText} setState={props.setState} muteState={props.mute} blockState={props.block} />
            {props.loggedIn && (
                <>
                    {!props.currentUserOwner &&
                        <>
                            {!props.block &&
                                <>
                                    <hr />
                                    <PostDropdownItem type="Mute user" handleFunction={handleMuteUser} setState={props.setState} muteState={props.mute} blockState={props.block} />
                                </>
                            }
                            <hr />
                            <PostDropdownItem type="Block user" handleFunction={handleBlockUser} setState={props.setState} muteState={props.mute} blockState={props.block} />
                        </>
                    }
                    <hr />
                    <PostDropdownItem type="Share post" handleFunction={handleSharePost} setState={props.setState} muteState={props.mute} blockState={props.block} />
                    {props.currentUserOwner &&
                        <>
                            <hr />
                            <PostDropdownItem type="Delete post" handleFunction={handleDeletePost} setState={props.setState} muteState={props.mute} blockState={props.block} />
                        </>
                    }
                </>
            )}
        </motion.div>
    )
}

export default PostDropdown