// Redux
import { RootState, actions } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// Components
import { NotificationTab } from "@/components/Pages/Other/Notifications";
import { ChatsTab, MiniChatBox } from "@/components/Pages/Other/Chats";
import { SearchTab } from "@/components/Pages/Other/Search";
// Icons
import { FiLogOut, FiMoon, FiSettings, FiUser } from "react-icons/fi";
// Other
import { motion } from "framer-motion";
import Router from 'next/router'
// Styles
import './OtherComps.scss'
import { useReturnUserId } from "@/lib/hooks";
import { firestore } from "@/lib/firebase";

interface DropdownProps {
}

const Dropdown = ({  }: DropdownProps) => {

    const dropdownInfo = useSelector((state: RootState) => state.dropdown)

    // TODO When redirecting page stays unregistered for a second --> implement loading

    return (
        <>
            {dropdownInfo.show ?
                dropdownInfo.window == 'profile' ?
                    <ProfileDropdown /> :
                    dropdownInfo.window == 'notifications' ?
                        <NotificationTab /> :
                        dropdownInfo.window == 'chats' ?
                            <ChatsTab dropdownInfo={dropdownInfo} /> :
                            dropdownInfo.window == 'chatsBox' ?
                                <MiniChatBox dropdownInfo={dropdownInfo} /> :
                                dropdownInfo.window == 'search' ?
                                    <SearchTab /> : '' : ''}
        </>
    );
}

const ProfileDropdown = () => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state: RootState) => state.user)

    const handleLogout = async () => {
        const userId = await useReturnUserId({ username: userInfo.username })
        firestore.doc(`users/${userId}`).update({ savedPosts: [], likedPosts: [] })
        dispatch(actions.feedActions.setLoadingState({ type: true, value: true }))
        dispatch(actions.userActions.logoutUser(''));
        dispatch(actions.dropdownActions.flip(''))
        await Router.push("/")
    }

    return (
        <motion.div
            className="dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <button className='dropdown__item' >
                <FiUser size={24} />
                <p className='p2 semibold' > Profile </p>
            </button>
            <hr />
            {/* <button className='dropdown__item'>
                <FiSettings size={24} />
                <p className='p2 semibold' > Settings </p>
            </button>
            <hr /> */}
            <button className='dropdown__item' onClick={() => { handleLogout() }} >
                <FiLogOut size={24} />
                <p className='p2 semibold' > Logout </p>
            </button>
        </motion.div>
    )
}

export default Dropdown;