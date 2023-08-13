// React
import { useEffect } from 'react';
// Components
import { Button } from '@/components/base/Buttons';
import { SearchTab } from '@/components/interface/other/Search';
import { ChatsTab, MiniChatBox } from '@/components/interface/other/Chats';
import { NotificationTab } from '@/components/interface/other/Notifications';
// Redux
import { RootState, actions } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
// Icons
import { FiUser, FiSettings, FiSearch, FiMessageCircle, FiBell, FiChevronDown, FiUserPlus, FiLogIn, FiMoon, FiLogOut } from 'react-icons/fi'
import { LuHome } from 'react-icons/lu'
// Framer motion
import { motion } from 'framer-motion';
// Styles
// Other
import { useMediaQuery } from 'react-responsive'
import Avatar from 'react-avatar';
import { slide as Menu } from 'react-burger-menu'
// Animation
import { popVariant2 } from '@/redux/other';

// Interface
interface LinkItemProps {
    type: string,
    selected?: boolean,
}
interface ButtonsProps {
    dropdownInfo: { show: boolean, window: string }
    isMin: boolean
    isToggledWindow(type: 'chats' | 'notifications' | 'profile'): string | boolean
}

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => {
    // Dispatch
    const dispatch = useDispatch()

    // Redux info
    const dropdownInfo = useSelector((state: RootState) => state.dropdown);

    // Check if window is small
    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    // useEffect for switching between dropdown menus and full screen menus
    useEffect(() => {
        if (isMin) {
            if (dropdownInfo.window == 'notifications') {
                dispatch(actions.modalActions.turnOn('notifications'))
                dispatch(actions.dropdownActions.flip(''))
            } else if (dropdownInfo.window == 'chats') {
                dispatch(actions.modalActions.turnOn('chats'))
                dispatch(actions.dropdownActions.flip(''))
            } else if (dropdownInfo.window == 'chatsBox') {
                dispatch(actions.modalActions.turnOn('chatsBox'))
                dispatch(actions.dropdownActions.flip(''))
            } else if (dropdownInfo.window == 'search') {
                dispatch(actions.modalActions.turnOn('searchBox'))
                dispatch(actions.dropdownActions.flip(''))
            }
        }
    }, [isMin])

    // Check if window is active and returns a helper className
    const isToggledWindow = (type: 'chats' | 'notifications' | 'profile') => {
        switch (type) {
            case 'chats':
                if (dropdownInfo.window == 'chats' || dropdownInfo.window == 'chatsBox') return ' clicked'; else return ''
            case 'notifications':
                if (dropdownInfo.window == 'notifications') return ' clicked'; else return '';
            case 'profile':
                if (dropdownInfo.window == 'profile') return true; else return false;
            default:
                return ''
        }
    }

    // Button props
    const ButtonProps: ButtonsProps = {
        dropdownInfo,
        isMin,
        isToggledWindow
    }

    return (
        <>
            <nav className='navbar'>
                <div className='leftNav'>
                    {/* <Menu>
                        <p> Element 1 </p>
                        <p> Element 2 </p>
                        <p> Element 3 </p>
                    </Menu> */}
                    <h3> <span>Pop</span>ion </h3>
                    <ul>
                        <LinkItem type='home' selected />
                        {loggedIn && (
                            <>
                                <LinkItem type='profile' />
                                <LinkItem type='settings' />
                            </>
                        )}
                    </ul>
                </div>
                <div className='rightNav'>
                    {loggedIn ? (
                        <>
                            <ul>
                                <SearchButton ButtonProps={ButtonProps} />
                                <ChatButton ButtonProps={ButtonProps} />
                                <NotificationButton ButtonProps={ButtonProps} />
                            </ul>
                            <ProfileButton ButtonProps={ButtonProps} />
                        </>
                    ) :
                        (
                            <>
                                <Button type='primary' icon={<FiUserPlus size={16} />} text='Register' size='small' execute={() => { dispatch(actions.modalActions.turnOn('register')) }} animation />
                                <Button type='primary' icon={<FiLogIn size={16} />} text='Login' size='small' execute={() => { dispatch(actions.modalActions.turnOn('login')) }} animation />
                            </>
                        )
                    }
                </div>
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
            </nav>
        </>
    );
}

const LinkItem = ({ type, selected = false }: LinkItemProps) => {
    return <li className={selected ? 'selected' : ''} > {type == 'home' ?
        <a>
            <LuHome size={20} /> <p className='p2' > Home </p>
        </a> : type == 'profile' ?
            <a>
                <FiUser size={20} /> <p className='p2' > Profile </p>
            </a> :
            <a>
                <FiSettings size={20} /> <p className='p2' > Settings </p>
            </a>
    } </li>
}

const SearchButton = ({ ButtonProps: { dropdownInfo, isMin } }: { ButtonProps: ButtonsProps }) => {
    // Dispatch
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton'}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('searchBox'))
            } else {
                if (dropdownInfo.window == 'search' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('search'));
                else dispatch(actions.dropdownActions.windowChange('search'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiSearch size={20} /></motion.button>
}

const ChatButton = ({ ButtonProps: { dropdownInfo, isMin, isToggledWindow } }: { ButtonProps: ButtonsProps }) => {
    // Dispatch
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton ' + isToggledWindow('chats')}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('chats'))
            } else {
                if (dropdownInfo.window == 'chats' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('chats'));
                else dispatch(actions.dropdownActions.windowChange('chats'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiMessageCircle size={20} /></motion.button>
}

const NotificationButton = ({ ButtonProps: { dropdownInfo, isMin, isToggledWindow } }: { ButtonProps: ButtonsProps }) => {
    // Dispatch
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton ' + isToggledWindow('notifications')}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('notifications'))
            } else {
                if (dropdownInfo.window == 'notifications' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('notifications'));
                else dispatch(actions.dropdownActions.windowChange('notifications'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiBell size={20} /></motion.button>
}

const ProfileButton = ({ ButtonProps: { dropdownInfo, isToggledWindow } }: { ButtonProps: ButtonsProps }) => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <button className='profileButton'
            onClick={() => {
                if (dropdownInfo.window == 'profile' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('profile'));
                else dispatch(actions.dropdownActions.windowChange('profile'))
            }} >
            <Avatar size='32' round />
            <p className='p1 semibold' > Name </p>
            <motion.div
                className="icon-container"
                initial={{ rotate: 0 }}
                animate={{ rotate: isToggledWindow('profile') ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <FiChevronDown size={20} />
            </motion.div>
        </button>
    )
}

const ProfileDropdown = () => {
    return (
        <motion.div
            className="dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >            <button>
                <FiUser size={24} />
                <p className='p2 semibold' > Profile </p>
            </button>
            <hr />
            <button>
                <FiSettings size={24} />
                <p className='p2 semibold' > Settings </p>
            </button>
            <hr />
            <button>
                <FiMoon size={24} />
                <p className='p2 semibold' > Night mode </p>
            </button>
            <hr />
            <button>
                <FiLogOut size={24} />
                <p className='p2 semibold' > Logout </p>
            </button>
        </motion.div>
    )
}


export default Navbar;