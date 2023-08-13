// React
import { useState } from "react";
// Icons
import { FiBookmark, FiHeart, FiImage, FiMessageCircle, FiPlus, FiX } from "react-icons/fi";
// Framer motion
import { motion } from 'framer-motion';
// Animation
import { popVariant2 } from "@/redux/other";

// Interface
interface ButtonProps {
  type: 'primary' | 'ghost';
  icon?: JSX.Element,
  text?: string;
  size?: 'small' | 'regular' | 'large';
  execute?: any;
  animation?: boolean;
}

const Button = ({ type, icon, text, size, execute, animation }: ButtonProps) => {
  const p = size == 'small' ? 'caption' : size == 'large' ? 'p2' : 'p1'
  return (
    <>
      {animation ?
        <motion.button
          className={'button ' + type + ' ' + size}
          onClick={execute}
          whileTap="pop"
          variants={popVariant2}  
        >
          {icon}
          <p className={p + " semibold left"} > {text} </p>
        </motion.button> :
        <button className={'button ' + type + ' ' + size} onClick={execute} >
          {icon}
          <p className={p + " semibold left"} > {text} </p>
        </button>
      }
    </>
  );
}

const AddImgButton = () => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button
      className={'button add ' + value + ' small'}
      onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')}
      whileTap="pop"
      variants={popVariant2}
    >
      <FiImage size={16} />
      {value == 'primary' && <FiX size={16} />}
    </motion.button>
  )
}

const AddPostButton = () => {
  return (
    <motion.button
      className="button post small"
      whileTap="pop"
      variants={popVariant2}    
      >
      <FiPlus size={16} />
      <p className="caption semibold dynamicParagraph"> Add post </p>
    </motion.button>
  )
}

const LikeButton = () => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button
      className={'button like ' + value + ' small'}
      onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Like{value == 'ghost' ? '' : 'd'} </p>
      <p className='caption semibold right' > 3 </p>
      <FiHeart size={16} />
    </motion.button>
  )
}

const CommentButton = () => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button
      className={'button comment ' + value + ' small'}
      onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Comments </p>
      <p className='caption semibold right' > 3 </p>
      <FiMessageCircle size={16} />
    </motion.button>
  )
}

const SaveButton = () => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button
      className={'button save ' + value + ' small'}
      onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')}
      whileTap="pop"
      variants={popVariant2}
    >
      <p className='caption semibold dynamicParagraph' > Save{value == 'ghost' ? '' : 'd'} </p>
      <FiBookmark size={16} />
    </motion.button>
  )
}

export { Button, LikeButton, CommentButton, SaveButton, AddImgButton, AddPostButton }