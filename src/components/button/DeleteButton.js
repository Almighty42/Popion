// React
import React from 'react'
// Icons
import DeleteIcon from 'src/assets/SVGR/DeleteIcon'
// Apollo
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from 'src/graphql';

const DeleteButton = ({ postId, commentId, option }) => {
    // useMutation
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
            });
        },
        variables: {
            postId
        }
    });

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            {option == 'post' ? (
                <>
                    <DeleteIcon deletePost={deletePost} />
                </>
            ) : (
                <>
                    <DeleteIcon deletePost={deleteComment} />
                </>
            )}
        </>
    )
}

export default DeleteButton