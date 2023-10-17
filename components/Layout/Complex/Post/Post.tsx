// React
import { useEffect, useState } from "react";
// Firebase
import { firestore, storage } from "@/lib/firebase";
// Redux
import { actions } from "@/redux/store";
import { useDispatch } from "react-redux";
// Components
import PostDropdown from "./PostDropdown";
import { PostProps } from "./PostInterface";
import { Button, CommentButton, LikeButton, SaveButton } from "../../Simple/Buttons";
import Input from "../../Simple/Input";
// Icons
import { FiCheck, FiMoreVertical, FiTrash2, FiX } from "react-icons/fi";
// Hooks
import { useEditPost, usePostAlterArray, usePostAlterCount, useReturnUserId, useSetPostButton } from "@/lib/hooks";
// Other
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
// Styles
import './Post.scss'

const Post = (props : PostProps) => {
  const dispatch = useDispatch()

  const router = useRouter()

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
    if (props.userInfo.username == props.username) {
      setCurrentUserOwner(true)
    }
    setEditPostContent(props.content)
    if (props.image) {
      var storageRef = storage.ref(`images/${props.postId}`)
      storageRef.getDownloadURL().then((url) => {
        setImageSource(url)
      })
    }
    if (props.userInfo.username == '') {
      setSaved('ghost')
      setLiked('ghost')
    } else {
      const savedPostsArray = props.userInfo.savedPosts
      const likedPostsArray = props.userInfo.likedPosts
      const mutedUsers = props.userInfo.mutedUsers
      const blockedUsers = props.userInfo.bannedUsers

      useSetPostButton({ array: savedPostsArray, postId : props.postId, setState: setSaved })
      useSetPostButton({ array: likedPostsArray, postId : props.postId, setState: setLiked })

      if (mutedUsers.includes(props.ownerId)) dispatch(actions.postActions.handleMute({ add: true, username: props.username }))
      if (blockedUsers.includes(props.ownerId)) dispatch(actions.postActions.handleBlock({ add: true, username: props.username }))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
  }, [liked])

  const handleSave = async () => {
    const userId = await useReturnUserId({ username: props.userInfo.username })
    if (saved == 'ghost') {
      usePostAlterArray({ add: true, docId: props.postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: props.postId, add: true }))
      setSaved('primary')
    } else if (saved == 'primary') {
      usePostAlterArray({ add: false, docId: props.postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: props.postId, add: false }))
      setSaved('ghost')
    }
  }

  const handleLike = async () => {
    if (props.userInfo.loggedIn) {
      const userId = await useReturnUserId({ username: props.userInfo.username })
      const userIdFromPost = await useReturnUserId({ username: props.username })
      if (liked == 'ghost') {
        usePostAlterArray({ add: true, docId: props.postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId : props.postId, type: 'increment', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId : props.postId, likePost: true }))
        dispatch(actions.userActions.handleLikePost({ content: props.postId, add: true }))
        setLiked('primary')
      } else if (liked == 'primary') {
        usePostAlterArray({ add: false, docId: props.postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId : props.postId, type: 'deincrement', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId : props.postId, likePost: false }))
        dispatch(actions.userActions.handleLikePost({ content: props.postId, add: false }))
        setLiked('ghost')
      }
    } else {
      toast.error("Login / Register to like posts")
    }
  }

  const initializeEditPost = () => {
    setEditPostContent(props.content)
    setEditPostState(true)
  }

  const handleDeleteImage = () => {
    props.setLoadingPosts(true)
    dispatch(actions.postActions.handleDeleteImage(props.postId))
    firestore.doc(`users/${props.ownerId}/posts/${props.postId}`).update({ image: false })
    var image = storage.ref(`images/${props.postId}`)
    image.delete()
    setEditPostState(false)
    props.setLoadingPosts(false)
  }

  const confirmEditPost = async () => {
    if (editPostContent.length == 0) {
      toast.error("Post text cannot be empty!")
    } else {
      const userId = await useReturnUserId({ username: props.username })
      useEditPost({ userId, postId : props.postId, content: editPostContent })
      dispatch(actions.postActions.handleEdit({ postId : props.postId, content: editPostContent }))
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
                    <p className="p3 semibold"> {props.name} </p>
                    <p className="caption"> @{props.username} </p>
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
                  {props.image &&
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
                    {props.content.split(/(#\w+)/g).map((part, index) => {
                      if (part.match(/^#\w+$/)) {
                        return <span onClick={() => {router.push(`/tags/${part.slice(1)}`)}} className="post__content__hashtag">{part}</span>;
                      }
                      return part;
                    })}
                  </p>
                  {props.image && !loading &&
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
                    <LikeButton likeCount={props.likeCount} execute={handleLike} type={liked} />
                    <CommentButton commentCount={props.commentCount} />
                  </> :
                  <>
                    <Button type="ghost" execute={() => { setEditPostState(false) }} color="standard" icon={<FiX size={16} />} size="small" text="Cancel" animation />
                  </>
                }
              </div>
              {props.userInfo.loggedIn ? !editPostState ?
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
          loggedIn={props.userInfo.loggedIn}
          postId={props.postId}
          ownerUsername={props.username}
          content={props.content}
          setState={setPostDropdownState}
          username={props.userInfo.username}
          mute={props.mute}
          block={props.block}
          initializeEditPost={initializeEditPost}
          imageValue={props.image}
          setLoadingPosts={props.setLoadingPosts}
        />
      }
    </div>
  );
}

export default Post;