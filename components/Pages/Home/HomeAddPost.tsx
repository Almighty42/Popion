// React
import { useState, useRef, useMemo, useCallback } from "react";
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
import { UserInfoProps } from "@/utils/interfaces";
import { useReturnUserId, useReturnUserObject } from "@/lib/hooks";
// Other
import Avatar from "react-avatar";
import uniqid from 'uniqid';
import toast from "react-hot-toast";
import "cropperjs/dist/cropper.css";

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import 'draft-js/dist/Draft.css';
import { extractHashtagsWithIndices } from '@draft-js-plugins/hashtag';

import firebase from "firebase/compat/app";
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData
} from '@draft-js-plugins/mention';

interface HomeAddPostProps {
  userInfo: UserInfoProps
}

interface MentionProps {
  mention: MentionData
}

const mentions: MentionData[] = [
  {
    name: 'Trump',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Alex Jones',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
]

const HomeAddPost = ({ userInfo }: HomeAddPostProps) => {

  // TODO - Cleanup code
  // TODO - Users are able to add 2 of the same posts if they press the add button quickly enough, fix that

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

  // * Trying to implement #hashtag functionality...

  const [suggestions, setSuggestions] = useState(mentions);
  const [open, setOpen] = useState(false);

  const [editorState, setEditorState] = useState(
    createEditorStateWithText('')
  );

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionPrefix: '#',
      mentionTrigger: ['#']
    })
    const hashtagPlugin = createHashtagPlugin();
    const { MentionSuggestions } = mentionPlugin
    const plugins = [mentionPlugin]
    return { plugins, MentionSuggestions };
  }, [])

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  return (
    <div className="addpost">
      <Avatar size="40" round />
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        placeholder="What's happening?"
        editorKey="editor"
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
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

export default HomeAddPost;