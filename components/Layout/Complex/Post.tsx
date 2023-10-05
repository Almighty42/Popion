// React
import { Dispatch, useEffect, useState } from "react";
// Firebase
import { firestore, storage } from "@/lib/firebase";
// Redux
import { useDispatch } from "react-redux";
import { actions } from "@/redux/store";
// Components
import { Button, CommentButton, LikeButton, SaveButton } from "../Simple/Buttons";
import Input from "../Simple/Input";
// Icons
import { FiCheck, FiCopy, FiEdit, FiExternalLink, FiMoreVertical, FiShare2, FiSlash, FiTrash2, FiUnlock, FiUser, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
// Types
import { UserProps } from "@/lib/types";
// Hooks
import { useEditPost, usePostAlterArray, usePostAlterCount, useReturnUserId, useSetPostButton } from "@/lib/hooks";
// Other
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/navigation'

// Types
interface PostProps {
  name: string,
  username: string,
  createdAt: string,
  content: string,
  commentCount: number,
  postId: string,
  userInfo: UserProps,
  likeCount: number,
  mute: boolean,
  block: boolean,
  ownerId: string,
  image: boolean,
  setLoadingPosts: Dispatch<React.SetStateAction<boolean>>
}

interface PostDropdownProps {
  currentUserOwner: boolean,
  loggedIn: boolean,
  postId: string,
  ownerUsername: string,
  content: string,
  setState: Dispatch<React.SetStateAction<boolean>>,
  username: string,
  mute: boolean,
  block: boolean,
  initializeEditPost(): void,
  imageValue: boolean,
  setLoadingPosts: Dispatch<React.SetStateAction<boolean>>
}

const Post = ({ name, username, createdAt, content, commentCount, postId, userInfo, likeCount, mute, block, ownerId, image, setLoadingPosts }: PostProps) => {
  const dispatch = useDispatch()

  const [saved, setSaved] = useState('ghost')
  const [liked, setLiked] = useState('ghost')
  const [imageSource, setImageSource] = useState('')
  const [loading, setLoading] = useState(true)
  const [postDropdownState, setPostDropdownState] = useState(false)
  const [currentUserOwner, setCurrentUserOwner] = useState(false)
  const [editPostState, setEditPostState] = useState(false)
  const [editPostContent, setEditPostContent] = useState('')

  useEffect(() => {
    setLoading(true)
    if (userInfo.username == username) {
      setCurrentUserOwner(true)
    }
    setEditPostContent(content)
    if (image) {
      var storageRef = storage.ref(`images/${postId}`)
      storageRef.getDownloadURL().then((url) => {
        setImageSource(url)
      })
    }
    if (userInfo.username == '') {
      setSaved('ghost')
      setLiked('ghost')
    } else {
      const savedPostsArray = userInfo.savedPosts
      const likedPostsArray = userInfo.likedPosts
      const mutedUsers = userInfo.mutedUsers
      const blockedUsers = userInfo.bannedUsers

      useSetPostButton({ array: savedPostsArray, postId, setState: setSaved })
      useSetPostButton({ array: likedPostsArray, postId, setState: setLiked })

      if (mutedUsers.includes(ownerId)) dispatch(actions.postActions.handleMute({ add: true, username }))
      if (blockedUsers.includes(ownerId)) dispatch(actions.postActions.handleBlock({ add: true, username }))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
  }, [liked])

  const handleSave = async () => {
    const userId = await useReturnUserId({ username: userInfo.username })
    if (saved == 'ghost') {
      usePostAlterArray({ add: true, docId: postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: postId, add: true }))
      setSaved('primary')
    } else if (saved == 'primary') {
      usePostAlterArray({ add: false, docId: postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: postId, add: false }))
      setSaved('ghost')
    }
  }

  const handleLike = async () => {
    if (userInfo.loggedIn) {
      const userId = await useReturnUserId({ username: userInfo.username })
      const userIdFromPost = await useReturnUserId({ username: username })
      if (liked == 'ghost') {
        usePostAlterArray({ add: true, docId: postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId, type: 'increment', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId, likePost: true }))
        dispatch(actions.userActions.handleLikePost({ content: postId, add: true }))
        setLiked('primary')
      } else if (liked == 'primary') {
        usePostAlterArray({ add: false, docId: postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId, type: 'deincrement', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId, likePost: false }))
        dispatch(actions.userActions.handleLikePost({ content: postId, add: false }))
        setLiked('ghost')
      }
    } else {
      toast.error("Login / Register to like posts")
    }
  }

  const initializeEditPost = () => {
    setEditPostContent(content)
    setEditPostState(true)
  }

  const handleDeleteImage = () => {
    setLoadingPosts(true)
    dispatch(actions.postActions.handleDeleteImage(postId))
    firestore.doc(`users/${ownerId}/posts/${postId}`).update({ image: false })
    var image = storage.ref(`images/${postId}`)
    image.delete()
    setEditPostState(false)
    setLoadingPosts(false)
  }

  const confirmEditPost = async () => {
    if (editPostContent.length == 0) {
      toast.error("Post text cannot be empty!")
    } else {
      const userId = await useReturnUserId({ username })
      useEditPost({ userId, postId, content: editPostContent })
      dispatch(actions.postActions.handleEdit({ postId, content: editPostContent }))
      setEditPostState(false)
    }
  }

  // TODO Open profile button doesn't work

  return (
    <div className="post">
      <div className="post__body">
        {loading ? (
          <div className="post__loading">
            <ReactLoading type='spin' color='blue' height={'50%'} width={'7.5%'} />
          </div>
        ) : (
          <>
            <div className="post__header">
              <div className="post__info">
                <Avatar size="40" round />
                <div className="post__info__text">
                  <div className="post__info__user">
                    <p className="p3 semibold"> {name} </p>
                    <p className="caption"> @{username} </p>
                  </div>
                  <p className="caption"> Few minutes ago </p>
                </div>
              </div>
              <button className="post__morebutton" onClick={() => { setPostDropdownState(!postDropdownState) }} >
                <FiMoreVertical size={24} />
              </button>
            </div>
            <div className="post__content">
              {editPostState ?
                <>
                  <Input
                    textarea
                    size="small"
                    text=""
                    type="text"
                    value={editPostContent}
                    onChange={(e: any) => setEditPostContent(e.target.value)} />
                  {image &&
                    <Button
                      type="ghost"
                      animation
                      execute={handleDeleteImage}
                      icon={<FiTrash2 size={16} />}
                      size="small"
                      text="Delete image"
                      color="like" />
                  }
                </>
                :
                <>
                  <p className="post__content__text p1">
                    {content.split(/(#\w+)/g).map((part, index) => {
                      if (part.match(/^#\w+$/)) {
                        return <span key={index} className="hashtag">{part}</span>;
                      }
                      return part;
                    })}
                  </p>
                  {image && !loading &&
                    <div className="post__content__image">
                      <img src={imageSource} />
                    </div>
                  }
                </>
              }
            </div>
            <div className="post__actions">
              <div className="post__actions__left">
                {!editPostState ?
                  <>
                    <LikeButton likeCount={likeCount} execute={handleLike} type={liked} />
                    <CommentButton commentCount={commentCount} />
                  </> :
                  <>
                    <Button type="ghost" execute={() => { setEditPostState(false) }} color="standard" icon={<FiX size={16} />} size="small" text="Cancel" animation />
                  </>
                }
              </div>
              {userInfo.loggedIn ? !editPostState ?
                <SaveButton execute={handleSave} type={saved} /> :
                <Button type="primary" animation execute={confirmEditPost} icon={<FiCheck size={16} />} size="small" text="Confirm changes" /> : <></>
              }
            </div>
          </>
        )}
      </div>
      {postDropdownState &&
        <PostDropdown
          currentUserOwner={currentUserOwner}
          loggedIn={userInfo.loggedIn}
          postId={postId}
          ownerUsername={username}
          content={content}
          setState={setPostDropdownState}
          username={userInfo.username}
          mute={mute}
          block={block}
          initializeEditPost={initializeEditPost}
          imageValue={image}
          setLoadingPosts={setLoadingPosts}
        />
      }
    </div>
  );
}

const PostDropdown = ({
  currentUserOwner,
  loggedIn,
  postId,
  ownerUsername,
  content,
  setState,
  username,
  mute,
  block,
  initializeEditPost,
  imageValue,
  setLoadingPosts }: PostDropdownProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleShowPost = () => {
    router.push(`/posts/${postId}`)
  }
  const handleEditPost = () => {
    initializeEditPost();
  }
  const handleOpenProfile = () => {
    router.push(`/users/${ownerUsername}`)
    window.location.reload()
  }
  const handleCopyText = () => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard")
  }
  const handleMuteUser = async () => {
    const ownerId = await useReturnUserId({ username: ownerUsername })
    const userId = await useReturnUserId({ username })
    if (!mute) {
      usePostAlterArray({ add: true, docId: ownerId, type: 'mutedUsers', userId })
      toast.success(`${ownerUsername} is muted`)
      //setStateMuted(true)
      dispatch(actions.postActions.handleMute({ add: true, username: ownerUsername }))
      dispatch(actions.userActions.handleMuteUser({ add: true, content: ownerId }))

    } else {
      usePostAlterArray({ add: false, docId: ownerId, type: 'mutedUsers', userId })
      toast.success(`${ownerUsername} is unmuted`)
      dispatch(actions.postActions.handleMute({ add: false, username: ownerUsername }))
      dispatch(actions.userActions.handleMuteUser({ add: false, content: ownerId }))
    }
  }
  const handleBlockUser = async () => {
    const ownerId = await useReturnUserId({ username: ownerUsername })
    const userId = await useReturnUserId({ username })
    if (!block) {
      usePostAlterArray({ add: true, docId: ownerId, type: 'blockedUsers', userId })
      toast.success(`${ownerUsername} is blocked`)
      dispatch(actions.postActions.handleBlock({ add: true, username: ownerUsername }))
      dispatch(actions.userActions.handleBlockUser({ add: true, content: ownerId }))
    } else {
      usePostAlterArray({ add: false, docId: ownerId, type: 'blockedUsers', userId })
      toast.success(`${ownerUsername} is unblocked`)
      dispatch(actions.postActions.handleBlock({ add: false, username: ownerUsername }))
      dispatch(actions.userActions.handleBlockUser({ add: false, content: ownerId }))
    }
  }
  const handleSharePost = () => {
    dispatch(actions.modalActions.turnOn('sharePost'))
  }
  const handleDeletePost = async () => {
    setLoadingPosts(true)
    const userId = await useReturnUserId({ username })
    firestore.doc(`users/${userId}/posts/${postId}`).delete()
    dispatch(actions.postActions.handleDelete(postId))
    if (imageValue) {
      var image = storage.ref(`images/${postId}`)
      image.delete()
    }
    setLoadingPosts(false)
  }

  return (
    <motion.div
      className="post__dropdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={() => { handleShowPost(); setState(false) }} >
        <FiExternalLink size={24} />
        <p className='p2 semibold' > Show full post </p>
      </button>
      <hr />
      {currentUserOwner ?
        <button onClick={() => { handleEditPost(); setState(false) }} >
          <FiEdit size={24} />
          <p className='p2 semibold' > Edit post </p>
        </button> :
        <button onClick={() => { handleOpenProfile(); setState(false) }} >
          <FiUser size={24} />
          <p className='p2 semibold' > Open profile </p>
        </button>
      }
      <hr />
      <button onClick={() => { handleCopyText(); setState(false) }} >
        <FiCopy size={24} />
        <p className='p2 semibold' > Copy post text </p>
      </button>
      {loggedIn && (
        <>
          {!currentUserOwner &&
            <>
              {!block &&
                <>
                  <hr />
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
                </>
              }
              <hr />
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
            </>
          }
          <hr />
          <button onClick={() => { handleSharePost(); setState(false) }} >
            <FiShare2 size={24} />
            <p className='p2 semibold' > Share post </p>
          </button>
          {currentUserOwner &&
            <>
              <hr />
              <button className="post__dropdown__delete" onClick={() => { handleDeletePost(); setState(false) }}  >
                <FiTrash2 size={24} />
                <p className='p2 semibold' > Delete post </p>
              </button>
            </>
          }
        </>
      )}
    </motion.div>
  )
}

export default Post;