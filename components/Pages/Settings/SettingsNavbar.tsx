
// Icons
import { FiBell, FiLock, FiLogOut, FiMessageCircle, FiTrash2, FiUser } from 'react-icons/fi';
// Types
import { SettingsNavbarItemProps, SettingsNavbarProps } from './SettingsPageInterfaces';
// Style
import './Settings.scss'

const SettingsNavbar = ({ selectedItem }: SettingsNavbarProps) => {
  return (
    <div className="settings--navbar" >
        <Item type='Profile' selected={selectedItem == 'Profile'} />
        <Item type='Privacy' selected={selectedItem == 'Privacy'} />
        <Item type='Notifications' selected={selectedItem == 'Notifications'} />
        <Item type='Chat' selected={selectedItem == 'Chat'} />
        <Item type='Logout' />
        <Item type='Delete account' />
    </div>
  );
}

const Item = ({ type, selected = false } : SettingsNavbarItemProps) => {
    return (
        <div 
        className={
            `settings-navbar__item
            ${type == 'Delete account' ? 'settings-navbar__item--delete' : ''}
            ${selected ? 'settings-navbar__item--selected' : ''}`
            } >
            {type == 'Profile' ?
            <><FiUser size={16} /> <p> Profile </p> </> :
            type == 'Privacy' ?
            <><FiLock size={16} /> <p> Privacy </p> </> :
            type == 'Notifications' ?
            <><FiBell size={16} /> <p> Notifications </p> </> :
            type == 'Chat' ?
            <><FiMessageCircle size={16} /> <p> Chat </p> </> :
            type == 'Logout' ?
            <><FiLogOut size={16} /> <p> Logout </p> </> :
            type == 'Delete account' && 
            <><FiTrash2 size={16} /> <p> Delete account </p> </>
            }
        </div>
    )
}

export default SettingsNavbar;