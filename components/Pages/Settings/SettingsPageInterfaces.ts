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
    selected?: boolean,
    execute?(): void
}
interface SettingsFrameProps {
    selectedFrame: 
    'Profile' |
    'Privacy' |
    'Notifications' |
    'Chat'
}
type tagsObject = {
    posts: boolean,
    mentions: boolean,
    likes: boolean,
    images: boolean
}
interface SettingsInputProps {
    type: 'name' | 'username' | 'email' | 'description',
    value: any,
    onChange(e : any): void
}
interface SettingsTagProps {
    type: 'Posts' | 'Mentions' | 'Likes' | 'Images', 
    selected: boolean,
    execute(): void
}

export type { 
    SettingsNavbarProps,
    SettingsNavbarItemProps,
    SettingsFrameProps,
    tagsObject,
    SettingsInputProps,
    SettingsTagProps
}