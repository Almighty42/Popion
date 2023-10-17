// Types
import { LinkItemProps } from "./NavbarInterface"
// Icons
import { LuHome } from "react-icons/lu"
import { FiSettings, FiUser } from "react-icons/fi"

const NavbarItem = ({ type, selected = false, execute }: LinkItemProps) => {
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

export default NavbarItem