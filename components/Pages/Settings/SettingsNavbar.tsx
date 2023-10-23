
// Icons
import { FiBell, FiLock, FiLogOut, FiMessageCircle, FiTrash2, FiUser } from 'react-icons/fi';
// Types
import { SettingsNavbarItemProps, SettingsNavbarProps } from './SettingsPageInterfaces';
// Redux
import { useDispatch } from 'react-redux';
import { actions } from '@/redux/store'; 
// Style
import './Settings.scss'
// Other
import Router from 'next/router'

const SettingsNavbar = ({ selectedItem }: SettingsNavbarProps) => {

  // TODO Implement Notifications and Chat logic

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(actions.feedActions.setLoadingState({ type: true, value: true }))
    dispatch(actions.modalActions.setLoadingState(true))
    dispatch(actions.userActions.logoutUser(''));
    dispatch(actions.dropdownActions.flip(''))
    await Router.push("/")
    dispatch(actions.modalActions.setLoadingState(false))
}

  return (
    <div className="settings--navbar" >
        <Item type='Profile' selected={selectedItem == 'Profile'} />
        <Item type='Privacy' selected={selectedItem == 'Privacy'} />
        {/* <Item type='Notifications' selected={selectedItem == 'Notifications'} />
        <Item type='Chat' selected={selectedItem == 'Chat'} /> */}
        <Item type='Logout' execute={async () => { await handleLogout() }} />
        <Item type='Delete account' />
    </div>
  );
}

const Item = ({ type, selected = false, execute = () => {} } : SettingsNavbarItemProps) => {

  const dispatch = useDispatch()

    return (
        <div 
        className={
            `settings--navbar__item
            ${type == 'Delete account' ? 'settings--navbar__item--delete' : ''}
            ${selected ? 'settings--navbar__item--selected' : ''}`
            } 
            onClick={() => {
              if (type != 'Delete account' && type != 'Logout')
              {
                dispatch(actions.settingsNavActions.setWindow(type))
              } else { execute() }
            }}
            >
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