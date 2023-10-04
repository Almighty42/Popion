//@ts-nocheck 
import { createSlice } from '@reduxjs/toolkit';

import { userInitialState } from './userInitialState';

const userSlice = createSlice({
  name: 'user',
  initialState: {
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
  },
  reducers: {
    assignUser: (state, action) => {
      state.name = action.payload.name
      state.username = action.payload.username
      state.email = action.payload.email
      state.loggedIn = action.payload.loggedIn
    },
    fetchUser: (state, action) => {
      return {
        ...action.payload
      }
    },
    logoutUser: (state, action: any) => {
      return { ...state, ...userInitialState }
    },
    handleSavePost: (state, action) => {
      if (action.payload.add) {
        return {
          ...state,
          savedPosts: [
            ...state.savedPosts,
            action.payload.content
          ]
        }
      } else {
        const clonedArray = state.savedPosts.filter((post) => post != action.payload.content)
        return {
          ...state,
          savedPosts: [
            ...clonedArray
          ]
        }
      }
    },
    handleLikePost: (state, action) => {
      if (action.payload.add) {
        return {
          ...state,
          likedPosts: [
            ...state.likedPosts,
            action.payload.content
          ]
        }
      } else {
        const clonedArray = state.likedPosts.filter((post) => post != action.payload.content)
        return {
          ...state,
          likedPosts: [
            ...clonedArray
          ]
        }
      }
    },
    handleMuteUser: (state, action) => {
      if (action.payload.add) {
          return {
            ...state,
            mutedUsers: [
              ...state.mutedUsers,
              action.payload.content
            ]
          }
        } else {
        const clonedArray = state.mutedUsers.filter((user) => user != action.payload.content)
        return {
          ...state,
          mutedUsers: [
            ...clonedArray
          ]
        }
      }
    },
    handleBlockUser: (state, action) => {
      if (action.payload.add) {
          return {
            ...state,
            bannedUsers: [
              ...state.bannedUsers,
              action.payload.content
            ]
          }
        } else {
        const clonedArray = state.bannedUsers.filter((user) => user != action.payload.content)
        return {
          ...state,
          bannedUsers: [
            ...clonedArray
          ]
        }
      }
    },
    handleFollow: (state, action) => {
      if (action.payload.add) {
        return {
          ...state,
          followingNum: state.followingNum + 1,
          following: [
            ...state.following,   
            action.payload.content
          ]
        }
      } else {
        const clonedArray = state.following.filter((user) => user != action.payload.content)
        return {
          ...state,
          followingNum: state.followingNum - 1,
          following: [
            ...clonedArray
          ]
        }
      }
    }
  },
});

export const userActions = {
  assignUser: userSlice.actions.assignUser,
  fetchUser: userSlice.actions.fetchUser,
  handleSavePost: userSlice.actions.handleSavePost,
  handleLikePost: userSlice.actions.handleLikePost,
  logoutUser: userSlice.actions.logoutUser,
  handleMuteUser: userSlice.actions.handleMuteUser,
  handleBlockUser: userSlice.actions.handleBlockUser,
  handleFollow: userSlice.actions.handleFollow,
};

export default userSlice.reducer;