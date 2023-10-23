// React
import { Dispatch, SetStateAction } from "react"
// Types
import { UserInfoProps } from "@/utils/interfaces"

//! TODO
//! Temporary interface
interface useFollowUserProps {
    add: boolean,
    userInfo: UserInfoProps,
    userId: string | undefined, 
    setToggle: Dispatch<SetStateAction<boolean>>,
    dispatch: any,
    followersCount?: number | undefined,
    followersNum: number,
    followingNum: number,
    targetName: string,
    targetUsername: string,
    setFollowersCount: Dispatch<SetStateAction<number>>,
    setFollowingCount: Dispatch<SetStateAction<number>>
}

interface ProfileProps {
    userObject: UserInfoProps
    userId: string
}
interface ProfileItemProps {
    type: 'Posts' | 'Mentions' | 'Likes' | 'Images' | 'Saved posts' | 'Tags',
    navbarState: string,
    execute(): void
}
interface ProfileDropdownProps {
    block: boolean,
    mute: boolean,
    setState: Dispatch<React.SetStateAction<boolean>>,
    ownerUsername: string,
    setMute: Dispatch<React.SetStateAction<boolean>>,
    setBlock: Dispatch<React.SetStateAction<boolean>>,
    ownerId: string,
    username: string
}

interface ProfileInfoProps {
    userObject: UserInfoProps,
    followCount: number | undefined,
    userId: string
}

interface ProfileNavbarProps {
    navbarState : string
    setNavbarState: Dispatch<SetStateAction<'Posts' | 'Mentions' | 'Likes' | 'Images' | 'Saved posts' | 'Tags'>>
    userInfo: UserInfoProps
    ownerProfileCheck: boolean
    isBlockedUser: boolean
    toggle: boolean
    useFollowUser({ add, userInfo, dispatch, userId, setToggle, followingNum, followersNum, targetName, targetUsername, setFollowersCount, setFollowingCount }: useFollowUserProps): Promise<void>
    useFollowUserProps1: {
        add: boolean,
        userInfo: UserInfoProps,
        dispatch: any,
        userId: string,
        setToggle: Dispatch<SetStateAction<boolean>>,
        followingNum: number,
        followersNum: number,
        targetName: string,
        targetUsername: string,
        setFollowersCount: Dispatch<SetStateAction<number>>,
        setFollowingCount: Dispatch<SetStateAction<number>>
    }
    useFollowUserProps2: {
        add: boolean,
        userInfo: UserInfoProps,
        dispatch: any,
        userId: string,
        setToggle: Dispatch<SetStateAction<boolean>>,
        followingNum: number,
        followersNum: number,
        targetName: string,
        targetUsername: string,
        setFollowersCount: Dispatch<SetStateAction<number>>,
        setFollowingCount: Dispatch<SetStateAction<number>>
    }
    setUserDropdownState: Dispatch<SetStateAction<boolean>>
    userDropdownState: boolean
}

export type { 
    ProfileProps, 
    ProfileDropdownProps, 
    ProfileItemProps,
    ProfileInfoProps,
    ProfileNavbarProps,
}