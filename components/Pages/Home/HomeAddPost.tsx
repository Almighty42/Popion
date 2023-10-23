// React
import { useCallback, useMemo, useRef, useState } from "react";
// Redux
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// Components
import { AddImgButton, AddPostButton } from "../../Layout/Simple/Buttons";
// Functions
import { createPost, handleAddImage, handleFileUpload } from "./HomeUtils";
// Types
import { HomeAddPostProps } from "./HomeInterface";
// Other
import "cropperjs/dist/cropper.css";
import Avatar from "react-avatar";
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import 'draft-js/dist/Draft.css';
import createMentionPlugin, {
  MentionData,
  defaultSuggestionsFilter
} from '@draft-js-plugins/mention';

interface MentionProps {
  mention: MentionData
}

const mentions: MentionData[] = [

]

const HomeAddPost = ({ userInfo }: HomeAddPostProps) => {

  // TODO - Cleanup code
  // TODO - Users are able to add 2 of the same posts if they press the add button quickly enough, fix that

  const [check, setCheck] = useState(false)
  const [compare, setCompare] = useState()

  const dispatch = useDispatch()

  const imageInfo = useSelector((state: RootState) => state.image)

  const fileInput = useRef(null)

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
        execute={() => { handleAddImage({ dispatch, imageInfo, setCheck, handleFocusBack, fileInput }) }} />
      <AddPostButton execute={() => { createPost({ userInfo, dispatch, imageInfo, editorState, setEditorState }) }} />
      <input
        className="addpost-displaynone"
        type="file"
        ref={fileInput}
        onChange={(e: any) => { handleFileUpload({ e, dispatch, handleFocusBack, setCheck, setCompare }) }}
        onClick={clickedFileInput}
        disabled={check}
      />
    </div>
  );
}

export default HomeAddPost;