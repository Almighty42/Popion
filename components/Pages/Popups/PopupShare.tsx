// React
import { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { actions } from '@/redux/store';
// Components
import { Button } from '@/components/Layout/Simple/Buttons';
import Input from '@/components/Layout/Simple/Input';
// Icons
import { FiCheck, FiSearch, FiShare2, FiX } from 'react-icons/fi';
// Animation
import { animationOptions, popInVariant1 } from '@/lib/animations';
// Styles
// Other
import Avatar from 'react-avatar';
import { motion } from "framer-motion";

// TODO Implement share post logic

const PopupShare = () => {
    const dispatch = useDispatch()

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
            className="popupshare" >
            <div className="popupshare__header">
                <Input
                    size='small'
                    text='Input text here'
                    type='text'
                    border='colored'
                    icon={<FiSearch size={24} />}
                    iconSide='left' />
                <Button
                    type='ghost'
                    icon={<FiX size={16} />}
                    size='small'
                    text='Close'
                    execute={() => { dispatch(actions.modalActions.turnOff()) }} />
            </div>
            <div className='popupshare__listbody' >
                <ul className='popupshare__list' >
                    <ListItem state setState />
                    <hr />
                    <ListItem state setState />
                    <hr />
                    <ListItem state setState />
                </ul>
            </div>
        </motion.div>
    );
}
// TODO Fix setState to proper value
const ListItem = ({ state, setState }: { state: boolean, setState: any }) => {
    return (
        <li className='popupshare__item' >
            <Avatar size='32' round />
            <div className="popupshare__item__text">
                <p className='caption semibold' > Kristin Watson </p>
                <p className='caption captionBlue' > @username </p>
            </div>
            {state ?
                <Button
                    type='ghost'
                    animation
                    execute={() => { setState(false) }}
                    icon={<FiShare2 size={16} />}
                    size='small'
                    text='Share'
                    color='green' /> :
                <Button
                    type='primary'
                    color='green'
                    size='small'
                    text='Shared!'
                    icon={<FiCheck size={16} />}
                    animation />
            }
        </li>
    )
}

export default PopupShare;