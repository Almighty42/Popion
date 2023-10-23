// Firebase
import { firestore } from "@/lib/firebase";
import firebase from "firebase/compat/app";
import { storage } from "@/lib/firebase";
// Hooks
import { useReturnUserId, useReturnUserObject } from "@/lib/hooks";
// Redux
import { actions } from "@/redux/store";
// Types
import { createPostInterface, handleAddImageInterface, handleFileUploadInterface } from "./HomeInterface";
// Other
import { createEditorStateWithText } from '@draft-js-plugins/editor';
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";
import toast from "react-hot-toast"
import uniqid from 'uniqid';

const createPost = async ({
    editorState,
    setEditorState,
    userInfo,
    imageInfo,
    dispatch
} : createPostInterface) => {

    var storageRef = storage.ref();

    if (editorState.getCurrentContent().getPlainText('\u0001').length == 0) {
      toast.error("Post cannot be empty")
    } else {
      const postId = uniqid()

      const hashtags = extractHashtagsWithIndices(editorState.getCurrentContent().getPlainText('\u0001'))
        .map((item) => {
          firestore.doc(`tags/${item.hashtag}`).get().then((doc) => {
            if (doc.exists) {
              const hashtagObject = doc.data()
              firestore.doc(`tags/${item.hashtag}`).update({ postsNum: hashtagObject?.postsNum + 1, posts: firebase.firestore.FieldValue.arrayUnion(postId) })
            } else if (!doc.exists) {
              const tagId = uniqid('tag-')
              firestore.doc(`tags/${item.hashtag}`).set({ id: tagId, postsNum: 1, subscribersNum: 0, posts: [postId] })
            }
          })
          return item.hashtag
        })

      const userId = await useReturnUserId({ username: userInfo.username })
      const userData = await useReturnUserObject({ userId })
      const postData = {
        name: userData?.name,
        username: userData?.username,
        content: editorState.getCurrentContent().getPlainText('\u0001'),
        likeCount: 0,
        commentCount: 0,
        likes: [],
        comments: [],
        userId: userId,
        published: true,
        createdAt: '',
        updatedAt: '',
        postId: postId,
        mute: false,
        block: false,
        ownerId: userId,
        image: imageInfo.imageOn,
        tags: [...hashtags]
      }

      if (imageInfo.imageOn) {
        var metadata = {
          customMetadata: {
            'postId': postId
          }
        };
        var imageRef = storageRef.child(`images/${postId}`)
        imageRef.putString(imageInfo.newImageURL, 'data_url', metadata).then((snapshot) => {
          dispatch(actions.imageActions.unCheck())
        }).then(() => {
          const postsRef = firestore.doc(`users/${userId}/posts/${postId}`);
          dispatch(actions.postActions.createPost(postData))
          postsRef?.set(postData);
          setEditorState(createEditorStateWithText(''))
        })
      } else {
        const postsRef = firestore.doc(`users/${userId}/posts/${postId}`);
        dispatch(actions.postActions.createPost(postData))
        postsRef?.set(postData);
        setEditorState(createEditorStateWithText(''))
      }
    }
}

const handleFileUpload = ({ 
  e,
  setCheck,
  handleFocusBack,
  setCompare,
  dispatch
} : handleFileUploadInterface) => {
  window.removeEventListener('focus', handleFocusBack)
  setCheck(false)

  let file = e.target.files

  setCompare(e.target.value)

  if (file.length > 0) {
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(actions.imageActions.uploadImage(reader.result as any))
    }
    reader.readAsDataURL(file[0])
    dispatch(actions.modalActions.turnOn("addImage"))
  }
}

const handleAddImage = async ({ 
  imageInfo,
  dispatch,
  setCheck,
  handleFocusBack,
  fileInput
} : handleAddImageInterface) => {
  if (imageInfo.imageOn) {
    dispatch(actions.imageActions.unCheck())
    window.removeEventListener('focus', handleFocusBack)
  } else {
    setCheck(true)
    //@ts-ignore
    fileInput.current.click()
  }
}

export { 
  createPost,
  handleFileUpload,
  handleAddImage
}