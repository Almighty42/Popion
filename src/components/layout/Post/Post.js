// React
import React, { useContext, useState } from 'react'
// Context
import { AuthContext } from 'src/context';
// Style
import './Post.scss'
// Avatar
import Avatar from 'react-avatar';
// Components
import LikeButton from 'src/components/button/LikeButton';
import AddComment from 'src/components/button/AddComment';
import DeleteButton from 'src/components/button/DeleteButton';
import CommentButton from 'src/components/button/CommentButton';
// Moment
import moment from 'moment';
// Apollo
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POST_QUERY } from 'src/graphql';

const Post = ({ post, postId }) => {
    // useState
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)

    // useContext
    const { user } = useContext(AuthContext)

    // useQuery
    const { data: getPost } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    return (
        <>
            <div className='postBody' >
                <div className='topDiv' >
                    <div className='avatarSection' >
                        <Avatar name={post.username} round={true} size={25} />
                        <div className='info' >
                            <p id='infoTxt' > {post.username} </p>
                            <p id='infoTxt' > {moment(post.createdAt).fromNow(true) + ' ago'} </p>
                        </div>
                    </div>
                    <div className='uxSection' >
                        <p style={{ userSelect: 'none' }} id='infoTxt2' >{post.likeCount}</p>
                        <LikeButton post={post} user={user} />
                        <p style={{ userSelect: 'none' }} id='infoTxt2' >{post.commentCount}</p>
                        <CommentButton open={open} setOpen={setOpen} />
                        {user && user.username === post.username && <DeleteButton postId={post.id} option={'post'} />}
                    </div>
                </div>
                <div className={open ? 'centerDiv' : 'centerDiv noUser'} >
                    <p> {post.body} </p>
                </div>
                {user && open && (
                    <>
                        <div className='bottomDiv Post' >
                            <div id='commentInfo' >
                                <div className='avatarSection' >
                                    <Avatar name={user.username} round={true} size={25} />
                                    <div className='info' >
                                        <p style={{ margin: '0 4px' }} > {user.username} </p>
                                    </div>
                                </div>
                                <AddComment postId={postId} comment={comment} setComment={setComment} />
                            </div>
                            <textarea className='textarea' value={comment} onChange={(e) => setComment(e.target.value)} />
                        </div>
                    </>
                )}
                {open && (
                    <>
                        {post.comments.map(comment => (
                            <div className='bottomDiv Post' >
                                <div id='commentInfo' >
                                    <div className='avatarSection' >
                                        <Avatar name={comment.username} round={true} size={25} />
                                        <div className='info' >
                                            <p style={{ margin: '0 4px' }} > {comment.username} </p>
                                            <p id='infoTxt' > {moment(comment.createdAt).fromNow(true) + ' ago'} </p>
                                        </div>
                                    </div>
                                    {user && user.username === comment.username && <DeleteButton postId={post.id} commentId={comment.id} option={'comment'} />}
                                </div>
                                <p className='body' > {comment.body} </p>
                            </div>
                        ))}
                        <div style={{ width:'100%', height:'20px', backgroundColor:'#F5F7FA', borderRadius:'0 0 15px 15px' }} ></div>
                    </>
                )}
            </div>
        </>
    )
}

export default Post