// React
import React, { useContext, useState } from 'react'
// Context
import { AuthContext } from 'src/context';
// Apollo
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { SUBMIT_COMMENT_MUTATION } from 'src/graphql';

const AddComment = ({ postId, comment, setComment }) => {
  // useContext
  const { user } = useContext(AuthContext);

  // useMutation
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('')
    },
    variables: {
      postId,
      body: comment
    }
  });

  return (
    <div className='PostButtonDiv' onClick={() => submitComment()} >
      <button className='PostButton' > Add Comment </button>
    </div>
  )
}

export default AddComment