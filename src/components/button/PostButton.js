// React
import React from 'react'
// Style
import './PostButton.scss'
// Icons
import PostIcon from 'src/assets/SVGR/PostIcon'

const PostButton = (props) => {

    return (
        <div className='PostButtonDiv' >
            <button className='PostButton' type='submit' >  POST </button>
            <PostIcon />
        </div>
    )
}

export default PostButton