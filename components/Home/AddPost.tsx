import Avatar from "react-avatar";
import {AddImgButton, Button} from "../Buttons";
import { FiImage, FiPlus } from "react-icons/fi";
import Input from "../Input";

interface AddPostProps {
  props: any;
}

const AddPost = ({ props }: AddPostProps) => {
  return (
    <div className="addPost">
        <Avatar size="40" round />
        <Input text="What's happening?" />
        <AddImgButton />
        <Button type="primary" icon={<FiPlus size={16} />} text="Create post" size="small" />
    </div>
  );
}

export default AddPost;