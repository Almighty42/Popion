// React
import React, { useContext } from 'react'
// Context
import { AuthContext } from 'src/context';
// Style
import './AddPost.scss'
// Avatar
import Avatar from 'react-avatar';
// Components
import PostButton from 'src/components/button/PostButton';

const AddPost = ({ createPost, onChange, onSubmit, values, createPostCallback }) => {
  // useContext
  const { user } = useContext(AuthContext)

  return (
    <>
      <form className='postBody' onSubmit={onSubmit} >
        <div className='topDiv' >
          <div className='avatarSection' >
            <Avatar name={user.username} round={true} size={25} />
            <div className='info' >
              <p id='infoTxt' > { user.username } </p>
            </div>
          </div>
        </div>
        <div className='centerDiv' >
          <textarea className='textarea' onChange={onChange} value={values.body} />
        </div>
        <div className='bottomDiv button' >
          <PostButton createPostCallback={createPostCallback} />
        </div>
      </form>
    </>
  )
}

export default AddPost

