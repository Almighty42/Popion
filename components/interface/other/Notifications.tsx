// Other
import Avatar from "react-avatar";
// Icons
import { FiAtSign, FiBell, FiChevronDown, FiHeart, FiMessageCircle, FiPlusCircle, FiUserPlus, FiX } from "react-icons/fi";
// Framer motion
import { motion } from 'framer-motion';
// Components
import { Button } from "../../base/Buttons";
// Redux
import { actions } from "@/redux/store";
import { useDispatch } from "react-redux";
// Animation 
import { popInVariant1, animationOptions } from "@/redux/other";

const NotificationTab = () => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <>
            <motion.div
                className="notificationTab tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="header">
                    <FiBell size={24} />
                    <button onClick={() => { dispatch(actions.modalActions.turnOn('notifications')); dispatch(actions.dropdownActions.flip('notifications')) }} >
                        <p className="p2 semibold" > Expand view </p>
                    </button>
                </div>
                <ul className="notificationList lists">
                    <hr />
                    <NotificationItem type='like' />
                    <hr />
                    <NotificationItem type='follow' />
                    <hr />
                    <NotificationItem type='mention' />
                    <hr />
                    <NotificationItem type='new-post' />
                    <hr />
                    <NotificationItem type='comment' />
                    <hr />
                    <NotificationItem type='system-info' />
                </ul>
            </motion.div>
        </>
    );
}

const NotificationItem = ({ type }: { type: 'like' | 'comment' | 'new-post' | 'follow' | 'mention' | 'system-info' | 'system-warning'; }) => {
    let text
    let icon

    switch (type) {
        case 'like':
            text = 'Liked your post'
            icon = <FiHeart size={24} />
            break;
        case 'comment':
            text = 'Commented on your post'
            icon = <FiMessageCircle size={24} />
            break;
        case 'follow':
            text = 'Followed you'
            icon = <FiUserPlus size={24} />
            break;
        case 'mention':
            text = 'Mentioned you in a post'
            icon = <FiAtSign size={24} />
            break;
        case 'new-post':
            text = 'Created a new post'
            icon = <FiPlusCircle size={24} />
            break;
        case 'system-info':
            text = 'Lorem ipsum dolor sit amet, consectetur adipisc'
            icon = <p className="subheading semibold" > <span>Pop</span>ion </p>
            break;
        case 'system-warning':
            text = 'Lorem ipsum dolor sit amet, consectetur adipisc'
            icon = <p className="subheading semibold" > <span>Pop</span>ion </p>
            break;
    }

    return (
        <li>
            <div className="itemInfo">
                <Avatar size="32" round />
                <div className="body">
                    <div className="info">
                        <p className="p1 semibold" > {type == 'system-info' || type == 'system-warning' ? 'Notification title' : 'Kristin Watson'} </p>
                        <p className="caption" > @username </p>
                    </div>
                    <p className="p1" > {text} </p>
                </div>
            </div>
            <div className={'icon ' + type}>
                {icon}
            </div>
        </li>
    )
}

const NotificationSection = () => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <motion.div 
        className="notificationSection section"
        initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
        >
            <div className="header">
                <Button type="primary" text="All" size="small" icon={<FiChevronDown size={16} />} animation />
                <Button type="ghost" text="Close" size="small" icon={<FiX size={16} />} execute={() => { dispatch(actions.modalActions.turnOff()) }} animation />
            </div>
            <ul className="notificationList lists" >
                <NotificationItem type='like' />
                <hr />
                <NotificationItem type='follow' />
                <hr />
                <NotificationItem type='mention' />
                <hr />
                <NotificationItem type='new-post' />
                <hr />
                <NotificationItem type='comment' />
                <hr />
                <NotificationItem type='system-info' />
            </ul>
        </motion.div>
    )
}

export { NotificationTab, NotificationSection };