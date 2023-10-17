// React
import { useState } from "react";
// Redux
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
// Components
import Navbar from "@/components/Layout/Complex/Navbar";
import Comment from "@/components/Pages/Other/Comment";
import Input from "@/components/Layout/Simple/Input";
import { Button, CommentButton, LikeButton, SaveButton } from "@/components/Layout/Simple/Buttons";
// Icons
import { FiMoreVertical, FiSend } from "react-icons/fi";
// Styles
import '@/styles/Pages.scss'
// Other
import Avatar from "react-avatar";

// TODO Cleanup code
// TODO Cleanup scss

const PostPage = () => {
    // UseState
    const [addCommentContent, setAddCommentContent] = useState('')
    // userInfo
    const userInfo = useSelector((state: RootState) => state.user)
    
    // TODO Dummy data --> introduce actual data
    const likeCount = 0;
    const handleLike = () => { }
    const handleSave = () => { }
    const liked = 'ghost'
    const commentCount = 0
    const saved = 'ghost'

    return (
        <div className="frame">
            <Navbar loggedIn={userInfo.loggedIn} />
            <div className="frame__body">
                <div className="frame__side"></div>
                <div className="frame__center">
                    <div className="post postPage">
                        <div className="post">
                            <div className="header">
                                <div className="postInfo">
                                    <Avatar size="40" round />
                                    <div className="text">
                                        <div className="info">
                                            <p className="p3 semibold"> Name {/* {name} */} </p>
                                            <p className="caption"> @username{/* {username} */} </p>
                                        </div>
                                        <p className="caption"> Few minutes ago </p>
                                    </div>
                                </div>
                                <button>
                                    {userInfo.loggedIn && <FiMoreVertical size={24} />}
                                </button>
                            </div>
                            <p className="p1" > {/* {content} */} </p>
                            <div className="actions">
                                <div className="leftActions">
                                    <LikeButton likeCount={likeCount} execute={handleLike} type={liked} />
                                    <CommentButton commentCount={commentCount} />
                                </div>
                                {userInfo.loggedIn && <SaveButton execute={handleSave} type={saved} />}
                            </div>
                        </div>
                        <div className="addComment">
                            <Input size="small" text="Type your comment" type="text" value={addCommentContent} onChange={(e: any) => setAddCommentContent(e.target.value)} />
                            <Button type="primary" animation icon={<FiSend size={16} />} size="small" text="Send comment" />
                        </div>
                        <div className="commentsContent">
                            <Comment step={0} userInfo={userInfo} />
                        </div>
                    </div>
                </div>
                <div className="rightFrame"></div>
            </div>
        </div>
    );
}

export default PostPage;