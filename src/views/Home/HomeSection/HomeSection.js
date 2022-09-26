// React
import React, { useContext } from 'react'
// Context
import { AppCont } from 'src/App';
import { AuthContext } from 'src/context'
// Style
import './HomeSection.scss'
// Components
import Post from 'src/components/layout/Post/Post'
import AddPost from 'src/components/layout/Post/AddPost'
// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from 'src/graphql'
// useForm
import { useForm } from "src/Hooks/useForm";

const HomeSection = () => {

  // useContext
  const { user } = useContext(AuthContext)
  const { refresh } = useContext(AppCont)

  // useQuery
  const {loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

  // useForm
  const { onChange, values, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  // Functions
  function createPostCallback() {
    createPost();
  }

  // useMutation
  const [createPost, { err }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    variables: values,
    onError(err) {
      console.log(err)
    },
  });
  
  return (
    <div className='HomeSection' >
      {user && (
        <AddPost createPost={createPost} onChange={onChange} onSubmit={onSubmit} values={values} createPostCallback={createPostCallback} />
      )}
      {loading ? (
      <>
      <h1> Loading posts... </h1>
      </>
      ) : (
      posts && posts.map(post => (
        <Post key={post.id} post={post} postId={post.id} />
      ))
      )}
    </div>
  )
}

export default HomeSection