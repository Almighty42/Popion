// Type
import Avatar from "react-avatar";
import { commentProps } from "./postInterface";
import { Button } from "@/components/Layout/Simple/Buttons";
import { FiChevronDown, FiChevronUp, FiCornerDownRight, FiMessageCircle, FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@/redux/store";

const Comment = ({ step, handleRef, commentId }: commentProps) => {

    const [stateExpanded, setStateExpanded] = useState(false)

    const dispatch = useDispatch()

    return (
        <div className="comment-comp" >
            {step != 0 &&
            <div className={`comment-comp__step-${step}`}>
                <FiCornerDownRight size={16} />
            </div>
            }
            <div className="comment-comp__box">
                <div className="comment-comp__header">
                    <div className="comment-comp__info">
                        <Avatar size="40" round />
                        <div className="comment-comp__text">
                            <div>
                                <p className="p3 semibold" > Name </p>
                                <p className="caption" > @username </p>
                            </div>
                            <p className="caption"> Few minutes ago </p>
                        </div>
                    </div>
                    <div className="comment-comp__actions">
                        {step == 0 &&
                        <Button
                            type={stateExpanded ? 'primary' : 'ghost'}
                            animation
                            icon={stateExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                            size="small"
                            text={stateExpanded ? 'Collapse replies' : 'Expand replies'}
                            execute={() => { setStateExpanded(!stateExpanded) }}
                        />
                        }
                        <Button
                            type="ghost"
                            animation
                            icon={<FiMessageCircle size={16} />}
                            size="small"
                            text="Reply"
                            execute={() => { handleRef(); dispatch(actions.commentReplyActions.selectStep({ commentId, step })) }}
                        />
                        <button className="post__morebutton" onClick={() => { }} >
                            <FiMoreVertical size={24} />
                        </button>
                    </div>
                </div>
                <div className="comment-comp__content">
                    <p className="p1" > Exampleee </p>
                </div>
            </div>
        </div>
    );
}

export default Comment;