// React
import { useEffect, useRef, useState } from "react";
// Components
import Input from "@/components/Layout/Simple/Input";
import { Button, CommentButton, LikeButton, SaveButton } from "@/components/Layout/Simple/Buttons";
// Icons
import { FiCheck, FiMoreVertical, FiSend, FiTrash2, FiX } from "react-icons/fi";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "@/redux/store";
// Firebase
import { firestore, postToJSON, storage } from "@/lib/firebase";
// Hooks
import { useEditPost, usePostAlterArray, usePostAlterCount, useReturnUserId, useSetPostButton } from "@/lib/hooks";
// Types
import { PostCompProps } from "@/utils/interfaces";
// Other
import Avatar from "react-avatar";
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import Comment from "../../components/Pages/Posts/Comment";
import uniqid from 'uniqid';
import '@/components/Pages/Posts/Post.scss'

const getAllPostIds = async () => {

  const postIds: Array<object> = []
  await firestore.collectionGroup("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      postIds.push({ params: { post: doc.id } })
    })
  })
  return postIds
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: any }) {

  const postRef = firestore.collectionGroup("posts").where("postId", "==", params.post)
  const postInfo = (await postRef.get()).docs.map(postToJSON)[0]

  const topCommentsRef = firestore.collection("comments").where("postId", "==", params.post).where("step", "==", 0)
  const topComments = (await topCommentsRef.get()).docs.map(postToJSON)


  const commentsArrayPromise : any = topComments.map(async (topComment) => {
    const comments = (await firestore.collection("comments")
      .where("commentId", ">=", topComment.commentId)
      .where("commentId", "<=", `${topComment.commentId}~`).get()).docs.map(postToJSON)

      return [
        ...comments
      ]
  })

  const commentsArray = await Promise.all(commentsArrayPromise)

  return {
    props: {
      postInfo,
      commentsArray,
      topComments
    }
  }
}

const post = ({ postInfo, commentsArray, topComments }: { postInfo: PostCompProps, commentsArray: Array<object>, topComments: any }) => {

  const inputRef = useRef(null)

  const [editPostState, setEditPostState] = useState(false)
  const [editPostContent, setEditPostContent] = useState('')
  const [postDropdownState, setPostDropdownState] = useState(false)
  const [imageSource, setImageSource] = useState('')

  const [commentContent, setCommentContent] = useState('')

  const [loadingPost, setLoadingPost] = useState(false)

  const [currentUserOwner, setCurrentUserOwner] = useState(false)
  const [saved, setSaved] = useState('ghost')
  const [liked, setLiked] = useState('ghost')

  const [likeCount, setLikeCount] = useState(postInfo.likeCount)

  const dispatch = useDispatch()
  const router = useRouter()

  const userInfo = useSelector((state: RootState) => state.user)
  const commentReplyInfo = useSelector((state: RootState) => state.commentReply)

  useEffect(() => {
    dispatch(actions.commentReplyActions.selectStep({ commentId: '', step: 0 }))
    if (userInfo.username == postInfo.username) {
      setCurrentUserOwner(true)
    }
    setEditPostContent(postInfo.content)
    if (postInfo.image) {
      var storageRef = storage.ref(`images/${postInfo.postId}`)
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

      useSetPostButton({ array: savedPostsArray, postId: postInfo.postId, setState: setSaved })
      useSetPostButton({ array: likedPostsArray, postId: postInfo.postId, setState: setLiked })

      //@ts-ignore
      if (mutedUsers.includes(postInfo.ownerId)) dispatch(actions.postActions.handleMute({ add: true, username: postInfo.username }))
      //@ts-ignore
      if (blockedUsers.includes(postInfo.ownerId)) dispatch(actions.postActions.handleBlock({ add: true, username: postInfo.username }))
    }
    
  }, [])

  const handleDeleteImage = () => {
    dispatch(actions.postActions.handleDeleteImage(postInfo.postId))
    firestore.doc(`users/${postInfo.ownerId}/posts/${postInfo.postId}`).update({ image: false })
    var image = storage.ref(`images/${postInfo.postId}`)
    image.delete()
    setEditPostState(false)
  }

  const handleLike = async () => {
    if (userInfo.loggedIn) {
      const userId = await useReturnUserId({ username: userInfo.username })
      const userIdFromPost = await useReturnUserId({ username: postInfo.username })
      setLoadingPost(true)
      if (liked == 'ghost') {
        setLikeCount(likeCount + 1)
        usePostAlterArray({ add: true, docId: postInfo.postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId: postInfo.postId, type: 'increment', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId: postInfo.postId, likePost: true }))
        dispatch(actions.userActions.handleLikePost({ content: postInfo.postId, add: true }))
        setLiked('primary')
        setLoadingPost(false)
      } else if (liked == 'primary') {
        setLikeCount(likeCount - 1)
        usePostAlterArray({ add: false, docId: postInfo.postId, type: 'likedPosts', userId })
        usePostAlterCount({ postId: postInfo.postId, type: 'deincrement', userId: userIdFromPost })
        dispatch(actions.postActions.likePost({ postId: postInfo.postId, likePost: false }))
        dispatch(actions.userActions.handleLikePost({ content: postInfo.postId, add: false }))
        setLiked('ghost')
        setLoadingPost(false)
      }
    } else {
      toast.error("Login / Register to like posts")
    }
  }

  const handleSave = async () => {
    const userId = await useReturnUserId({ username: userInfo.username })
    if (saved == 'ghost') {
      usePostAlterArray({ add: true, docId: postInfo.postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: postInfo.postId, add: true }))
      setSaved('primary')
    } else if (saved == 'primary') {
      usePostAlterArray({ add: false, docId: postInfo.postId, type: 'savedPosts', userId })
      dispatch(actions.userActions.handleSavePost({ content: postInfo.postId, add: false }))
      setSaved('ghost')
    }
  }

  const confirmEditPost = async () => {
    if (editPostContent.length == 0) {
      toast.error("Post text cannot be empty!")
    } else {
      const userId = await useReturnUserId({ username: postInfo.username })
      useEditPost({ userId, postId: postInfo.postId, content: editPostContent })
      dispatch(actions.postActions.handleEdit({ postId: postInfo.postId, content: editPostContent }))
      setEditPostState(false)
    }
  }

  const handleAddComment = async () => {
    setCommentContent('')
    const newCommentId = uniqid()
    if (commentReplyInfo.selectedStep == 0) {
      const comment = {
        username: userInfo.username,
        postId: postInfo.postId,
        commentId: newCommentId,
        content: commentContent,
        step: 0,
      }
      await firestore.doc(`comments/${commentReplyInfo.commentId + newCommentId}`).set({ ...comment })
    } else {
      const comment = {
        username: userInfo.username,
        postId: postInfo.postId,
        commentId: commentReplyInfo.commentId + "_" + uniqid(),
        content: commentContent,
        step: commentReplyInfo.selectedStep + 1,
      }
      await firestore.doc(`comments/${commentReplyInfo.commentId + "_" + uniqid()}`).set({ ...comment })
    }
  }

  const handleRef = () => {
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.focus();
    }
  }

  return (
    <div className="post-frame" >
      <div className="post-frame__body">
        {loadingPost ? (
          <div className="post__loading">
            <ReactLoading type='spin' color='blue' height={'50%'} width={'7.5%'} />
          </div>
        ) : (
          <>
            <div>
              <div className="post-frame__header">
                <div className="post__info">
                  <Avatar size="40" round />
                  <div className="post__info__text">
                    <div className="post__info__user">
                      <p className="p3 semibold"> {postInfo.name} </p>
                      <p className="caption"> {postInfo.username} </p>
                    </div>
                    <p className="caption"> Few minutes ago </p>
                  </div>
                </div>
                <button className="post__morebutton" onClick={() => { setPostDropdownState(!postDropdownState) }} >
                  <FiMoreVertical size={24} />
                </button>
              </div>
              <div className="post-frame__content">
                {editPostState ?
                  <>
                    <Input
                      textarea
                      size="small"
                      text=""
                      type="text"
                      value={editPostContent}
                      onChange={(e: any) => setEditPostContent(e.target.value)} />
                    {postInfo.image &&
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
                      {postInfo.content.split(/(#\w+)/g).map((part, index) => {
                        if (part.match(/^#\w+$/)) {
                          return <span onClick={() => { router.push(`/tags/${part.slice(1)}`) }} className="post__content__hashtag">{part}</span>;
                        }
                        return part;
                      })}
                    </p>
                    {postInfo.image &&
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
                      <CommentButton commentCount={postInfo.commentCount} />
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
            </div>
            <div className="post-frame__comment_add">
              <Input
                size="small"
                text="Type your comment..."
                border="colored"
                value={commentContent}
                onChange={(e: any) => { setCommentContent(e.target.value) }}
                type="text"
                inputRef={inputRef}
              />
              <Button
                type="primary"
                animation
                icon={<FiSend size={16} />}
                size="small"
                text="Send comment"
                execute={handleAddComment}
              />
            </div>
            <div className="comments">
              {commentsArray.map((commentsList) => (
                <>
                </>
              ))}
              <p> Show more </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default post;