export const userInitialState = {
    avatarURL: '',
    bannedUsers: [],
    description: '',
    email: '',
    invisible: false,
    lastSeen: false,
    lastSeenList: [],
    mutedUsers: [],
    name: '',
    followersNum: 0,
    followingNum: 0,
    following: [],
    followers: [],
    savedPosts: [],
    likedPosts: [],
    username: '',
    visibleNotifications: {
      comments: true,
      follows: true,
      likes: true,
      mentions: true,
      posts: true
    },
    visibleTags: {
      images: true,
      likes: true,
      mentions: true,
      posts: true
    },
    loggedIn: false,
}