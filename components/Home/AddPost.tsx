import Avatar from "react-avatar";
import {AddImgButton, AddPostButton, Button} from "../Buttons";
import { FiImage, FiPlus } from "react-icons/fi";
import Input from "../Input";

interface AddPostProps {
  props: any;
}

const AddPost = ({ props }: AddPostProps) => {
  return (
    <div className="addPost">
        <Avatar size="40" round />
        <Input text="What's happening?" size="small" type="text" border="uncolored" />
        <AddImgButton />
        <AddPostButton />
    </div>
  );
}

export default AddPost;