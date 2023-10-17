// React
import { useState } from "react";
// Icons
import { FiBookmark, FiHeart, FiImage, FiMessageCircle, FiPlus, FiX } from "react-icons/fi";
// Animation
import { popVariant2 } from "@/lib/animations";
// Types
import { BasicButtonProps, ButtonProps, CommentButtonProps, ExtendedButtonProps, LikeButtonProps } from "./SimpleInterface";
// Other
import { motion } from 'framer-motion';

const Button = ({
  type,
  icon,
  text,
  size,
  execute,
  animation,
  subType,
  color = 'standard'
}: ButtonProps) => {
  const p = size == 'small' ? 'caption' : size == 'large' ? 'p2' : 'p1'
  return (
    <>
      {animation ?
        <motion.button
          className={'button ' + type + ' ' + size + ' ' + color}
          onClick={execute}
          whileTap="pop"
          variants={popVariant2}
        >
          {icon}
          <p className={p + " semibold left"} > {text} </p>
        </motion.button> :
        <button className={'button ' + type + ' ' + size + ' ' + color} onClick={execute} type={subType} >
          {icon}
          <p className={p + " semibold left"} > {text} </p>
        </button>
      }
    </>
  );
}
const AddImgButton = ({ execute, type }: ExtendedButtonProps) => {
  return (
    <motion.button
      className={'button add ' + type + ' small'}
      onClick={(e) => { execute(e) }}
      whileTap="pop"
      variants={popVariant2}
    >
      <FiImage size={16} />
      {type == 'primary' && <FiX size={16} />}
    </motion.button>
  )
}
const AddPostButton = ({ execute }: BasicButtonProps) => {
  return (
    <motion.button
      className="button post small"
      whileTap="pop"
      variants={popVariant2}
      onClick={execute}
    >
      <FiPlus size={16} />
      <p className="caption semibold dynamicParagraph"> Add post </p>
    </motion.button>
  )
}
const LikeButton = ({ likeCount, type, execute }: LikeButtonProps) => {
  return (
    <motion.button
      className={'button like ' + type + ' small'}
      onClick={() => (execute())}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Like{type == 'ghost' ? '' : 'd'} </p>
      <p className='caption semibold right' > {likeCount} </p>
      <FiHeart size={16} />
    </motion.button>
  )
}
const CommentButton = ({ commentCount }: CommentButtonProps) => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button
      className={'button comment ' + value + ' small'}
      onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Comments </p>
      <p className='caption semibold right' > {commentCount} </p>
      <FiMessageCircle size={16} />
    </motion.button>
  )
}
const SaveButton = ({ type, execute }: ExtendedButtonProps) => {
  return (
    <motion.button
      className={'button save ' + type + ' small'}
      onClick={() => { execute() }}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Save{type == 'ghost' ? '' : 'd'} </p>
      <FiBookmark size={16} />
    </motion.button>
  )
}

export { AddImgButton, AddPostButton, Button, CommentButton, LikeButton, SaveButton };
