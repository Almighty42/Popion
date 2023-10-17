// Icons
import { FiArrowLeft, FiEye, FiMessageCircle, FiSend, FiX } from "react-icons/fi";
// Framer motion
import { motion } from 'framer-motion';
// Other
import Avatar from "react-avatar";
// Redux
import { useDispatch } from "react-redux";
import { actions } from "@/redux/store";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
import Input from "@/components/Layout/Simple/Input";
// Animation
import { popInVariant1, animationOptions } from "@/lib/animations";

// TODO ---> Connect component to firestore and setup chat functionality
// TODO ---> Cleanup code

const ChatsTab = ({ dropdownInfo }: { dropdownInfo: { show: boolean, window: string } }) => {
    // Dispatch
    const dispatch = useDispatch()

    // Opens chat window
    const triggerWindow = () => {
        if (dropdownInfo.show) {
            dispatch(actions.dropdownActions.windowChange('chatsBox'))
        }
    }

    return (
        <motion.div
            className="chatsTab tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="header">
                <FiMessageCircle size={24} />
                <button onClick={() => { dispatch(actions.modalActions.turnOn('chats')); dispatch(actions.dropdownActions.flip('chats')) }} >
                    <p className="p2 semibold" > Expand view </p>
                </button>
            </div>
            <ul className="chatsList lists">
                <hr />
                <ChatsItem notification onClick={triggerWindow} />
                <hr />
                <ChatsItem />
                <hr />
                <ChatsItem />
                <hr />
                <ChatsItem />
            </ul>
        </motion.div>
    );
}

const ChatsItem = ({ notification, onClick } : { notification?: boolean, onClick?: () => void }) => {
    return (
        <li onClick={onClick} >
            <div className="body">
                <Avatar size="48" round />
                <div className="info">
                    <p className="p2 semibold" > Name </p>
                    <p className="caption" > Kako si brate &#x2022; 8h </p>
                </div>
            </div>
            {notification && <span className="dot" > &#x2022; </span>}
        </li>
    )
}

const ChatsSection = ({ modalInfo } : { modalInfo: { show: boolean, window: string } } ) => {
    // Dispatch
    const dispatch = useDispatch()

    // Opens chat window
    const triggerWindow = () => {
        if (modalInfo.show) {
            dispatch(actions.modalActions.windowChange('chatsBox'))
        }
    }

    return (
        <motion.div
            className="chatsSection section"
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
        >
            <div className="header">
                <FiMessageCircle size={24} />
                <Button type="ghost" text="Close" size="small" icon={<FiX size={16} />} execute={() => { dispatch(actions.modalActions.turnOff()) }} animation />
            </div>
            <div className="chatsList lists">
                <hr />
                <ChatsItem onClick={triggerWindow} />
                <hr />
                <ChatsItem />
                <hr />
                <ChatsItem />
            </div>
        </motion.div>
    )
}

const MiniChatBox = ({ dropdownInfo } : any) => {
    // Dispatch
    const dispatch = useDispatch()

    // Opens chat window
    const triggerWindow = () => {
        if (dropdownInfo.show) {
            dispatch(actions.dropdownActions.windowChange('chats'))
        }
    }

    return (
        <motion.div
            className="chatBoxTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="header">
                <div className="info">
                    <button onClick={() => { triggerWindow() }} >
                        <FiArrowLeft size={24} />
                    </button>
                    <Avatar size="40" round />
                    <div className="name">
                        <p className="p2 semibold" > Name </p>
                        <div className="lastActive">
                            <FiEye size={16} />
                            <p className="caption" > Online </p>
                        </div>
                    </div>
                </div>
                <button onClick={() => { dispatch(actions.modalActions.turnOn('chatsBox')); dispatch(actions.dropdownActions.flip('chatsBox')) }} >
                    <p className="p2 semibold" > Expand view </p>
                </button>
            </div>
            <div className="box">
                <div className="boxFrame">
                    <MessageBox side="left" />
                </div>
            </div>
            <div className="actions">
                <Avatar size="32" round />
                <Input size="small" text="Type your message here..." type="text" border="uncolored" />
                <Button type="primary" text="send" icon={<FiSend size={16} />} size="small" animation />
            </div>
        </motion.div>
    )
}

const ChatBox = () => {
    // Dispatch
    const dispatch = useDispatch()
    
    return (
        <motion.div
            className="chatBox"
            initial="hidden"
            animate="visible"
            variants={popInVariant1}
            transition={animationOptions}
        >
            <div className="header">
                <div className="info">
                    <button onClick={() => { dispatch(actions.modalActions.windowChange('chats')) }} >
                        <FiArrowLeft size={24} />
                    </button>
                    <Avatar size="40" round />
                    <div className="name">
                        <p className="p2 semibold" > Name </p>
                        <div className="lastActive">
                            <FiEye size={16} />
                            <p className="caption" > Online </p>
                        </div>
                    </div>
                </div>
                <Button type="ghost" size="small" icon={<FiX size={16} />} text="Close" animation execute={() => { dispatch(actions.modalActions.turnOff()) }} />
            </div>
            <div className="box">
                <div className="boxFrame">
                    <MessageBox side="left" />
                </div>
            </div>
            <div className="actions">
                <Avatar size="32" round />
                <Input size="small" text="Type your message here..." type="text" border="uncolored" />
                <Button type="primary" text="send" icon={<FiSend size={16} />} size="small" animation />
            </div>
        </motion.div>
    )
}

const MessageBox = ({ side } : { side: 'left' | 'right' }) => {
    return (
        <div className="messageBox">
            <Avatar size="32" round/>
            <div className="messages">
                <div className="message"> <p className="p1" > Whats up </p> </div>
                <div className="message"> <p className="p1" > Hey buddy I need your help </p> </div>
            </div>
        </div>
    )
}

export { ChatsTab, ChatsSection, ChatBox, MiniChatBox }