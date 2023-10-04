import { Dispatch } from "react"

interface UserProps {
    avatarURL: string,
    bannedUsers: Array<string>,
    description: string,
    email: string,
    invisible: boolean,
    lastSeen: boolean,
    lastSeenList: Array<string>,
    mutedUsers: Array<string>,
    name: string,
    followersNum: number,
    followingNum: number,
    following: Array<string>,
    followers: Array<string>,
    savedPosts: Array<string>,
    likedPosts: Array<string>,
    username: string,
    visibleNotifications: {
      comments: boolean,
      follows: boolean,
      likes: boolean,
      mentions: boolean,
      posts: boolean
    },
    visibleTags: {
      images: boolean,
      likes: boolean,
      mentions: boolean,
      posts: boolean
    },
    loggedIn: boolean
}

interface PostProps {
  block: boolean,
commentCount: number
comments: Array<string>
content: string,
createdAt: string,
image: boolean,
likeCount: number,
likes: Array<string>,
mute: boolean,
name: string,
ownerId: string,
postId: string,
published: boolean,
updatedAt: string
userId: string
username: string
}

interface UseStateString {
  state: string,
  setState: Dispatch<React.SetStateAction<string>>
}

interface UseStateNumber {

}

interface UseStateBoolean {

}

export type { 
  UserProps,
  UseStateString,
  UseStateNumber,
  UseStateBoolean,
  PostProps
}