interface SettingsNavbarProps {
    selectedItem: 
    'Profile' |
    'Privacy' |
    'Notifications' |
    'Chat'
}
interface SettingsNavbarItemProps {
    type: 
    'Profile' |
    'Privacy' |
    'Notifications' |
    'Chat' |
    'Logout' |
    'Delete account',
    selected?: boolean
}
interface SettingsFrameProps {
    selectedFrame: 
    'Profile' |
    'Privacy' |
    'Notifications' |
    'Chat'
}

export type { 
    SettingsNavbarProps,
    SettingsNavbarItemProps,
    SettingsFrameProps
}