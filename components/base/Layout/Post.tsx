// Other
import Avatar from "react-avatar";
// Icons
import { FiMoreVertical } from "react-icons/fi";
// Components
import { CommentButton, LikeButton, SaveButton } from "../Buttons";

const Post = () => {
  return (
    <div className="post">
      <div className="header">
        <div className="postInfo">
          <Avatar size="40" round />
          <div className="text">
            <div className="info">
              <p className="p3 semibold"> Name </p>
              <p className="caption"> @username </p>
            </div>
            <p className="caption"> Few minutes ago </p>
          </div>
        </div>
        <button>
          <FiMoreVertical size={24} />
        </button>
      </div>
      <p className="p1" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.labore et dolore magna aliqua.labore et dolore magna aliqua.labore et dolore magna aliqua.labore et dolore magna aliqua.</p>
      <div className="actions">
        <div className="leftActions">
          <LikeButton />
          <CommentButton />
        </div>
        <SaveButton />
      </div>
    </div>
  );
}

export default Post;