// React
import { Dispatch, SetStateAction } from "react"
// Types
import { PostType } from "@/utils/types"
import { UserInfoProps } from "@/utils/interfaces"

interface PostProps {
    name: string,
    username: string,
    createdAt: string,
    content: string,
    commentCount: number,
    postId: string,
    userInfo: UserInfoProps,
    likeCount: number,
    mute: boolean,
    block: boolean,
    ownerId: string,
    image: boolean,
    setLoadingPosts: Dispatch<React.SetStateAction<boolean>>
}
interface PostDropdownProps {
    currentUserOwner: boolean,
    loggedIn: boolean,
    postId: string,
    ownerUsername: string,
    content: string,
    setState: Dispatch<React.SetStateAction<boolean>>,
    username: string,
    mute: boolean,
    block: boolean,
    initializeEditPost(): void,
    imageValue: boolean,
    setLoadingPosts: Dispatch<React.SetStateAction<boolean>>
}
interface PostDropdownItemProps {
    type: 
    'Show post' |
    'Edit post' |
    'Open profile' |
    'Copy text' |
    'Mute user' |
    'Block user' |
    'Share post' |
    'Delete post',
    handleFunction(): void
    setState: Dispatch<SetStateAction<boolean>>,
    muteState: boolean,
    blockState: boolean
}
interface ReturnPostsProps {
    refresh: boolean
    postsInfo: { posts: Array<PostType>, likePost: boolean }
    userInfo: UserInfoProps
    setLoadingPosts: Dispatch<SetStateAction<boolean>>
}

export type { PostProps, PostDropdownProps, PostDropdownItemProps, ReturnPostsProps }