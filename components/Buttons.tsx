import { useState } from "react";
import { FiBookmark, FiHeart, FiImage, FiMessageCircle, FiSave, FiX } from "react-icons/fi";
import { motion } from 'framer-motion';

interface ButtonProps {
    type: string;
    icon?: any,
    text?: string;
    size?: string;
}

const popVariant = {
  initial: { scale: 1 },
  pop: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
};

const Button = ({ type, icon, text, size }: ButtonProps) => {
  const p = size == 'small' ? 'caption' : 'p1'
  return (
    <button className={'button ' + type + ' ' + size}>
        {icon}
        <p className={p + " semibold left"} > {text} </p>
    </button>
  );
}

const AddImgButton = () => {
  const [value, setValue] = useState('ghost')
  return (
    <motion.button 
    className={'button add ' + value + ' small'} 
    onClick={() => setValue(value == 'ghost' ? 'primary' : 'ghost')} 
    whileTap="pop"
    variants={popVariant}
    >
        <FiImage size={16} />
        <p className='caption semibold' > {value == 'primary' ? 'Image added' : 'Add image'} </p>
        {value == 'primary' && <FiX size={16} />}
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
    variants={popVariant}
    >
        <p className='caption semibold' > Like{value == 'ghost' ? '' : 'd'} </p>
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
    variants={popVariant}
    >
        <p className='caption semibold' > Comments </p>
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
     variants={popVariant}
     >
        <p className='caption semibold' > Save{value == 'ghost' ? '' : 'd'} </p>
        <FiBookmark size={16} />
    </motion.button>
  )
}

export { Button, LikeButton, CommentButton, SaveButton, AddImgButton }