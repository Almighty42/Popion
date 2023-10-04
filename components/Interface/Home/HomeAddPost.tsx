// React
import { useState, useRef } from "react";
// Firebase
import { firestore } from "@/lib/firebase";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "@/redux/store";
import { storage } from "@/lib/firebase";
// Components
import { AddImgButton, AddPostButton } from "../../Layout/Simple/Buttons";
import Input from "@/components/Layout/Simple/Input";
// Lib
import { UserProps } from "@/lib/types";
import { useReturnUserId, useReturnUserObject } from "@/lib/hooks";
// Other
import Avatar from "react-avatar";
import uniqid from 'uniqid';
import toast from "react-hot-toast";
import "cropperjs/dist/cropper.css";

interface HomeAddPostProps {
  userInfo: UserProps
}

const HomeAddPost = ({ userInfo }: HomeAddPostProps) => {
  const [state, setState] = useState({
    content: '',
    checkIfClicked: false
  })

  const dispatch = useDispatch()

  const imageInfo = useSelector((state: RootState) => state.image)

  var storageRef = storage.ref();

  const createPost = async () => {
    if (state.content.length == 0) {
      toast.error("Post cannot be empty")
    } else {
      const postId = uniqid()
      const userId = await useReturnUserId({ username: userInfo.username })
      const userData = await useReturnUserObject({ userId })
      const postData = {
        name: userData?.name,
        username: userData?.username,
        content: state.content,
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
        image: imageInfo.imageOn
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
          setState({ ...state, content: '' })
        })
      } else {
        const postsRef = firestore.doc(`users/${userId}/posts/${postId}`);
        dispatch(actions.postActions.createPost(postData))
        postsRef?.set(postData);
        setState({ ...state, content: '' })
      }
    }
  }

  const fileInput = useRef(null)

  const handleAddImage = () => {
    //@ts-ignore
    fileInput.current.click()
  }
  //@ts-ignore
  const handleFileUpload = (e) => {
    dispatch(actions.imageActions.check())
    setState({ ...state, checkIfClicked: true })
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(actions.imageActions.uploadImage(reader.result as any))
      setState({ ...state, checkIfClicked: false })
    };
    reader.readAsDataURL(files[0]);
    dispatch(actions.modalActions.turnOn("addImage"))
    setState({ ...state, checkIfClicked: false })
    // TODO Handle logic when user clicks add image twice quickly
    //* Problem : throws error when cancelling if there was a upload before
  }
  
  // TODO Implement discard image functionality

  return (
    <div className="addpost">
      <Avatar size="40" round />
      <Input 
      text="What's happening?" 
      size="small" 
      type="text" 
      border="uncolored" 
      value={state.content} 
      onChange={(e: any) => setState({ ...state, content: e.target.value })} 
      textarea />
      <AddImgButton 
      type={imageInfo.imageOn ? 'primary' : 'ghost'} 
      execute={handleAddImage} />
      <AddPostButton execute={createPost} />
      <input 
      className="addpost-displaynone" 
      type="file" 
      ref={fileInput} 
      onChange={(e: any) => { if (!imageInfo.imageOn) handleFileUpload(e) }} />
    </div>
  );
}



export default HomeAddPost;