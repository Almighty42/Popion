// React
import { useState, useRef, useMemo } from "react";
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

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import 'draft-js/dist/Draft.css';

interface HomeAddPostProps {
  userInfo: UserProps
}

const users = [
  {
    id: 'walter',
    display: 'Walter White',
  },
  {
    id: 'pipilu',
    display: '皮皮鲁',
  },
  {
    id: 'luxixi',
    display: '鲁西西',
  },
  {
    id: 'satoshi1',
    display: '中本聪',
  },
  {
    id: 'satoshi2',
    display: 'サトシ・ナカモト',
  },
  {
    id: 'nobi',
    display: '野比のび太',
  },
  {
    id: 'sung',
    display: '성덕선',
  },
  {
    id: 'jesse',
    display: 'Jesse Pinkman',
  },
  {
    id: 'gus',
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: 'saul',
    display: 'Saul Goodman'}]

const HomeAddPost = ({ userInfo }: HomeAddPostProps) => {
  const [content, setContent] = useState('')
  const [check, setCheck] = useState(false)
  const [compare, setCompare] = useState()

  const dispatch = useDispatch()

  const imageInfo = useSelector((state: RootState) => state.image)

  var storageRef = storage.ref();

  const createPost = async () => {
    if (editorState.getCurrentContent().getPlainText('\u0001').length == 0) {
      toast.error("Post cannot be empty")
    } else {
      const postId = uniqid()
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

  const fileInput = useRef(null)

  const handleAddImage = async () => {
    if (imageInfo.imageOn) {
      dispatch(actions.imageActions.unCheck())
      window.removeEventListener('focus', handleFocusBack)
    } else {
      setCheck(true)
      //@ts-ignore
      fileInput.current.click()
    }

  }
  const handleFileUpload = (e: any) => {
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

  const handleFocusBack = () => {
    window.removeEventListener('focus', handleFocusBack)
    setCheck(false)
  }

  const clickedFileInput = () => {
    window.addEventListener('focus', handleFocusBack)
  }

  // * Trying to implement @mention functionality... ( Jesus christ )

  const [editorState, setEditorState] = useState(
     createEditorStateWithText('')
  );

  console.log(editorState.getCurrentContent().getPlainText('\u0001'))

  const hashtagPlugin = createHashtagPlugin();

  return (
    <div className="addpost">
      <Avatar size="40" round />
      <Editor
      editorState={editorState}
      onChange={setEditorState}
      plugins={[hashtagPlugin]}
      placeholder="What's happening?"
      />
      <AddImgButton
        type={imageInfo.imageOn ? 'primary' : 'ghost'}
        execute={handleAddImage} />
      <AddPostButton execute={createPost} />
      <input
        className="addpost-displaynone"
        type="file"
        ref={fileInput}
        onChange={(e: any) => { handleFileUpload(e) }}
        onClick={clickedFileInput}
        disabled={check}
        />
    </div>
  );
}


{/* <Input
  text="What's happening?"
  size="small"
  type="text"
  border="uncolored"
  value={content}
  onChange={(e: any) => setContent(e.target.value)}
  textarea /> */}

export default HomeAddPost;