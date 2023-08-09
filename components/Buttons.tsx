import { useState } from "react";
import { FiBookmark, FiHeart, FiImage, FiMessageCircle, FiPlus, FiSave, FiX } from "react-icons/fi";
import { motion, useAnimation } from 'framer-motion';
import { useMediaQuery } from "react-responsive";

interface ButtonProps {
  type: string;
  icon?: JSX.Element,
  text?: string;
  size?: string;
  execute?: any;
  animation: boolean;
}

const popVariant = {
  initial: { scale: 1 },
  pop: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
};

const scaleAndSplashVariant = {
  pressed: { scale: 1.1, backgroundColor: "#007BFF" },
  rest: { scale: 1, backgroundColor: "transparent" }
};

const rippleVariant = {
  animate: {
      scale: [1, 1.5, 1.8, 1.5, 1],
      opacity: [0.8, 0.6, 0.4, 0.2, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const Button = ({ type, icon, text, size, execute, animation }: ButtonProps) => {

  console.log(execute)

  const p = size == 'small' ? 'caption' : size == 'large' ? 'p2' : 'p1'
  return (
    <>
      {animation ?
        <motion.button
          className={'button ' + type + ' ' + size}
          onClick={execute}
          animate="raised"
          variants={scaleAndSplashVariant}
          transition={{ duration: 0.2 }}
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
      variants={popVariant}
    >
      <FiImage size={16} />
      {value == 'primary' && <FiX size={16} />}
    </motion.button>
  )
}

const AddPostButton = () => {

  const [ripple, setRipple] = useState(false);
  const controls = useAnimation();

  const handleTap = () => {
    setRipple(true);
    controls.start({ scale: 1.1, transition: { duration: 0.1 } });
    setTimeout(() => {
      setRipple(false);
      controls.start({ scale: 1 });
    }, 200);
  };

  return (
    <motion.button
      className="button post small"
      onTap={handleTap}
      initial={{ scale: 1 }}
      animate={controls}
    >
      {ripple && (
        <motion.div
          className="ripple"
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <FiPlus size={16} />
      <p className="caption semibold dynamic"> Add post </p>
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
      <p className='caption semibold dynamic' > Like{value == 'ghost' ? '' : 'd'} </p>
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
      <p className='caption semibold dynamic' > Comments </p>
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
      <p className='caption semibold dynamic' > Save{value == 'ghost' ? '' : 'd'} </p>
      <FiBookmark size={16} />
    </motion.button>
  )
}

export { Button, LikeButton, CommentButton, SaveButton, AddImgButton, AddPostButton }