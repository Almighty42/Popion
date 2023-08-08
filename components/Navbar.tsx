import { LuHome } from 'react-icons/lu'
import { motion } from 'framer-motion';
import { FiUser, FiSettings, FiSearch, FiMessageCircle, FiBell, FiChevronDown, FiUserPlus, FiLogIn, FiMoon, FiLogOut } from 'react-icons/fi'
import '@/styles/Components.scss'
import Avatar from 'react-avatar';
import { Button } from './Buttons';
import { Dispatch, useState } from 'react';

interface NavbarProps {
    loggedIn: boolean
}
interface LinkItemProps {
    type: string,
    selected?: boolean,
}
interface ProfileButtonProps {
    toggle: boolean,
    setToggle: any,
}

const Navbar = ({ loggedIn }: NavbarProps) => {

    const [toggle, setToggle] = useState(false)

    const flip = () => {
        setToggle(!toggle)
    }

    return (
        <nav className='nav'>
            <div className='leftSection'>
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
            <div className='rightSection'>
                {loggedIn ? (
                    <>
                        <ul>
                            <SearchButton />
                            <ChatButton />
                            <NotificationButton />
                        </ul>
                        <ProfileButton toggle setToggle={flip} />
                    </>
                ) :
                    (
                        <>
                            <Button type='primary' icon={<FiUserPlus size={16} />} text='Register' size='small' />
                            <Button type='primary' icon={<FiLogIn size={16} />} text='Login' size='small' />
                        </>
                    )
                }
            </div>
            {toggle && <ProfileDropdown />}
        </nav>
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

const SearchButton = ({ }) => {
    return <button><FiSearch size={20} /></button>
}

const ChatButton = ({ }) => {
    return <button><FiMessageCircle size={20} /></button>
}

const NotificationButton = ({ }) => {
    return <button><FiBell size={20} /></button>
}

const ProfileButton = ({ toggle = false, setToggle }: ProfileButtonProps) => {

    const [drop, setDrop] = useState(false)

    return (
        <button className='profileButton' onClick={() => { setToggle(); setDrop(!drop) }} >
            <Avatar size='32' round />
            <p className='p1 semibold' > Name </p>
            <motion.div
                className="icon-container"
                initial={{ rotate: 0 }}
                animate={{ rotate: drop ? 180 : 0 }}
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