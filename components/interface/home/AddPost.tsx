// Other
import Avatar from "react-avatar";
// Components
import { AddImgButton, AddPostButton } from "../../base/Buttons";
import Input from "../../base/Input";

const AddPost = () => {
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