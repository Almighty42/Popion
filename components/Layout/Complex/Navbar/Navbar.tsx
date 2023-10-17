// React
import { useEffect } from 'react';
// Redux
import { RootState, actions } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
// Components
import ProfileButton from './ProfileButton';
import NavbarItem from './NavbarItem';
import { Button } from '../../Simple/Buttons';
import Dropdown from '../Other/Dropdown';
// Icons
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
// Types
import { ButtonsProps, NavbarProps } from './NavbarInterface';
// Other
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
// Styles
import './Navbar.scss'

const Navbar = (props: NavbarProps) => {
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
        return <NavbarItem type={type} selected={selected} execute={execute} />
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar__left'>
                    {/* 
                    // TODO Implement responsive design for mobile
                    <Menu>
                        <p> Element 1 </p>
                        <p> Element 2 </p>
                        <p> Element 3 </p>
                    </Menu> */}
                    <h3 className='navbar__left__header' > <span>Pop</span>ion </h3>
                    <ul className='navbar__left__actions' >
                        {returnLinkItem('home', navbarInfo.state,async () => { await router.push('/') })}
                        {props.loggedIn && (
                            <>
                                {returnLinkItem('profile', navbarInfo.state,
                                async () => { await router.push(`/users/${userInfo.username}`) } )}
                                {returnLinkItem('settings', navbarInfo.state,
                                async () => { await router.push('/settings') } )}
                            </>
                        )}
                    </ul>
                </div>
                <div className='navbar__right'>
                    {props.loggedIn ? (
                        <>
                            <ul>
                                {/* <SearchButton ButtonProps={ButtonProps} />
                                <ChatButton ButtonProps={ButtonProps} />
                                <NotificationButton ButtonProps={ButtonProps} /> */}
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

export default Navbar;