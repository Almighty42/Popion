// Icons
import { FiCopy, FiEdit, FiExternalLink, FiShare2, FiSlash, FiTrash2, FiUnlock, FiUser, FiVolume2, FiVolumeX } from "react-icons/fi";
// Types
import { PostDropdownItemProps } from "./PostInterface";

const PostDropdownItem = ({ type, handleFunction, setState, muteState, blockState }: PostDropdownItemProps) => {
    if (type != 'Delete post') {
        return (
            <button onClick={() => { handleFunction(); setState(false) }} >
                {type == 'Show post' ?
                    <>
                        <FiExternalLink size={24} />
                        <p className='p2 semibold' > Show full post </p>
                    </>
                    :
                    type == 'Edit post' ?
                        <>
                            <FiEdit size={24} />
                            <p className='p2 semibold' > Edit post </p>
                        </>
                        :
                        type == 'Open profile' ?
                            <>
                                <FiUser size={24} />
                                <p className='p2 semibold' > Open profile </p>
                            </>
                            :
                            type == 'Copy text' ?
                                <>
                                    <FiCopy size={24} />
                                    <p className='p2 semibold' > Copy post text </p>
                                </>
                                :
                                type == 'Mute user' ?
                                    <>
                                        {muteState ?

                                            <>
                                                <FiVolume2 size={24} />
                                                <p className='p2 semibold' > Unmute user </p>
                                            </>

                                            :
                                            <>
                                                <FiVolumeX size={24} />
                                                <p className='p2 semibold' > Mute user </p>
                                            </>}
                                    </> :
                                    type == 'Block user' ?
                                        <>
                                            {blockState ?
                                                <>
                                                    <FiUnlock size={24} />
                                                    <p className='p2 semibold' > Unblock user </p>
                                                </>
                                                :
                                                <>
                                                    <FiSlash size={24} />
                                                    <p className='p2 semibold' > Block user </p>
                                                </>
                                            }
                                        </> :
                                        type == 'Share post' &&
                                        <>
                                            <FiShare2 size={24} />
                                            <p className='p2 semibold' > Share post </p>
                                        </>
                }
            </button>
        )
    } else {
        return (
            <button className="post__dropdown__delete" onClick={() => { handleFunction(); setState(false) }}  >
                <FiTrash2 size={24} />
                <p className='p2 semibold' > Delete post </p>
            </button>
        )
    }
}

export default PostDropdownItem