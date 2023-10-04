// React
import { useState } from "react";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
// Other
import Avatar from "react-avatar"
// Icons
import { FiChevronDown, FiChevronUp, FiMessageCircle, FiMoreVertical } from "react-icons/fi";
// Types
import { UserProps } from "@/lib/types";

interface CommentProps {
    step: 0 | 1 | 2 | 3;
    userInfo: UserProps
}

// TODO ---> Cleanup code

const Comment = ({ step, userInfo }: CommentProps) => {
    // useState
    const [commentExpand, setCommentExpand] = useState(false)

    // TODO Finish comment component

    return (
        <div className="comment" >
            <div className="header">
                <div className="commentInfo">
                    <Avatar size="40" round />
                    <div className="text">
                        <div className="info">
                            <p className="p3 semibold"> Name {/* {name} */} </p>
                            <p className="caption"> @username{/* {username} */} </p>
                        </div>
                        <p className="caption"> Few minutes ago </p>
                    </div>
                </div>
                <div className="commentActions">
                    {step == 0 &&
                        <>
                            {commentExpand ?
                                <Button type="primary" animation icon={<FiChevronUp size={16} />} size="small" text="Collapse replies" execute={() => { setCommentExpand(false) }} /> :
                                <Button type="ghost" animation icon={<FiChevronDown size={16} />} size="small" text="Expand replies" execute={() => { setCommentExpand(true) }} />}
                        </>
                    }
                    <Button type="ghost" animation icon={<FiMessageCircle size={16} />} size="small" text="Reply" />
                    {userInfo.loggedIn && <FiMoreVertical size={24} />}
                </div>
            </div>
        </div>
    );
}

export default Comment;