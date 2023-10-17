// Types
import { UserInfoProps } from "@/utils/interfaces"

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
    userInfo?: UserInfoProps
}

export type { NavbarProps, LinkItemProps, ButtonsProps }