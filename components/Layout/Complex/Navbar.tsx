// React
import { useEffect, useState } from 'react';
// Redux
import { RootState, actions } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { Button } from '../Simple/Buttons';
import Dropdown from './Dropdown';
// Icons
import { FiUser, FiSettings, FiSearch, FiMessageCircle, FiBell, FiChevronDown, FiUserPlus, FiLogIn, FiMoon, FiLogOut } from 'react-icons/fi'
import { LuHome } from 'react-icons/lu'
// Animation
import { popVariant2 } from '@/lib/animations';
// Types
import { UserProps } from '@/lib/types';
// Hooks
import { useReturnUserId } from '@/lib/hooks';
// Other
import Router from 'next/router'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'
import Avatar from 'react-avatar';

interface NavbarProps {
    loggedIn: boolean,
}
interface LinkItemProps {
    type: string,
    selected?: boolean,
    execute(): void
}
interface ButtonsProps {
    dropdownInfo: { show: boolean, window: string }
    isMin: boolean
    isToggledWindow(type: 'chats' | 'notifications' | 'profile'): string | boolean,
    userInfo?: UserProps
}

const Navbar = ({ loggedIn }: NavbarProps) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const dropdownInfo = useSelector((state: RootState) => state.dropdown);
    const userInfo = useSelector((state: RootState) => state.user)
    const navbarInfo = useSelector((state: RootState) => state.navbar)

    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    //* useEffect for switching between dropdown menus and full screen menus
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

    const ButtonProps: ButtonsProps = {
        dropdownInfo,
        isMin,
        isToggledWindow,
        userInfo
    }

    const returnLinkItem = ( type : string, state : string, execute : any ) => {
        const selected = type == state
        return <LinkItem type={type} selected={selected} execute={execute} />
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar__left'>
                    {/* <Menu>
                        <p> Element 1 </p>
                        <p> Element 2 </p>
                        <p> Element 3 </p>
                    </Menu> */}
                    <h3 className='navbar__left__header' > <span>Pop</span>ion </h3>
                    <ul className='navbar__left__actions' >
                        {returnLinkItem('home', navbarInfo.state,async () => { await router.push('/') })}
                        {loggedIn && (
                            <>
                                {returnLinkItem('profile', navbarInfo.state,
                                async () => { await router.push(`/users/${userInfo.username}`); window.location.reload() } )}
                                {returnLinkItem('settings', navbarInfo.state,
                                async () => { await router.push('/settings'); window.location.reload() } )}
                            </>
                        )}
                    </ul>
                </div>
                <div className='navbar__right'>
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
                                <Button 
                                type='primary' 
                                icon={<FiUserPlus 
                                size={16} />} 
                                text='Register' 
                                size='small' 
                                execute={() => { dispatch(actions.modalActions.turnOn('register')) }} 
                                animation />
                                <Button 
                                type='primary' 
                                icon={<FiLogIn size={16} />} 
                                text='Login' 
                                size='small' 
                                execute={() => { dispatch(actions.modalActions.turnOn('login')) }} 
                                animation />
                            </>
                        )
                    }
                </div>
                <Dropdown />
            </nav>
        </>
    );
}

const LinkItem = ({ type, selected = false, execute }: LinkItemProps) => {
    return <li className={selected ? 'navbar__left__item navbar__left__actions-selected' : 'navbar__left__item'} > {type == 'home' ?
        <a onClick={() => { execute() }} >
            <LuHome size={20} /> <p className='p2' > Home </p>
        </a> : type == 'profile' ?
            <a onClick={() => { execute() }} >
                <FiUser size={20} /> <p className='p2' > Profile </p>
            </a> :
            <a onClick={() => { execute() }} >
                <FiSettings size={20} /> <p className='p2' > Settings </p>
            </a>
    } </li>
}

const SearchButton = ({ ButtonProps: { dropdownInfo, isMin } }: { ButtonProps: ButtonsProps }) => {
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

const ProfileButton = ({ ButtonProps: { dropdownInfo, isToggledWindow, userInfo } }: { ButtonProps: ButtonsProps }) => {
    const dispatch = useDispatch()

    return (
        <button className='navbar__right__profilebutton'
            onClick={() => {
                if (dropdownInfo.window == 'profile' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('profile'));
                else dispatch(actions.dropdownActions.windowChange('profile'))
            }} >
            <Avatar size='32' round />
            <p className='p1 semibold' > {userInfo?.name} </p>
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

export default Navbar;