// React
import React from 'react'
// Icons
import CommentIcon1 from 'src/assets/SVGR/CommentIcon1';
import CommentIcon2 from 'src/assets/SVGR/CommentIcon2';

const CommentButton = ({ open, setOpen }) => {
    return (
        <>
            {open ? (
                <>
                    <CommentIcon1 onClick={() => { setOpen(false) }} />
                </>
            ) : (
                <>
                    <CommentIcon2 onClick={() => { setOpen(true) }} />
                </>
            )}
        </>
    )
}

export default CommentButton