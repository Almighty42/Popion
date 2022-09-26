// React
import React, { useState, useEffect, useContext } from 'react'
// Context
import { AuthContext } from 'src/context';
// Icons
import LikeFalse from 'src/assets/SVGR/LikeFalse'
import LikeTrue from 'src/assets/SVGR/LikeTrue'
// Apollo
import { useMutation } from "@apollo/react-hooks";
import { LIKE_POST_MUTATION } from 'src/graphql';

const LikeButton = ({ post }) => {
    // useState
    const [like, setLike] = useState(false)

    // useContext
    const { user } = useContext(AuthContext)

    // useMutation
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: post.id, userId: user && user.id },
    });

    // useEffect
    useEffect(() => {
        if (post.length != 0) {
            if (user && post.likes.find((like) => like.userId === user.id)) {
                setLike(true);
            } else setLike(false);
        }
    }, [user, post.likes]);

    return (
        <>
            {like ? (
                <>
                    <LikeTrue onClick={() => { if (user === null) { } else { likePost() } }} />
                </>
            ) : (
                <>
                    <LikeFalse onClick={() => { if (user === null) { } else { likePost() } }} />
                </>
            )}
        </>
    )
}

export default LikeButton