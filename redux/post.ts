//@ts-nocheck 
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    posts: [],
    likePost: false
  },
  reducers: {
    createPost: (state, action) => {
      return {
        posts: [
          ...state.posts,
          action.payload
        ]
      }
    },
    fetchPosts: (state, action) => {
      return {
        posts : [
          ...action.payload
        ]
      } 
    },
    likePost: (state, action) => {
      const array = state.posts.map((post) => {
        if (post.postId != action.payload.postId) return post;
        else if (action.payload.likePost) return { ...post, likeCount: post.likeCount + 1 }
        else if (!action.payload.likePost) return { ...post, likeCount: post.likeCount - 1 }
      })
       return {
        posts: array
       }
    },
    handleMute: (state, action) => {
      const array = state.posts.map((post) => {
        if (post.username != action.payload.username) return post;
        else if (action.payload.add) return { ...post, mute: true }
        else if (!action.payload.add) return { ...post, mute: false }
      })
      return {
        posts: array
      }
    },
    handleBlock: (state, action) => {
      const array = state.posts.map((post) => {
        if (post.username != action.payload.username) return post;
        else if (action.payload.add) return { ...post, block: true }
        else if (!action.payload.add) return { ...post, block: false }
      })
      return {
        posts: array
      }
    },
    handleDelete: (state, action) => {
      const array = state.posts.filter(post => post.postId != action.payload)
      return {
        posts: [
          ...array
        ]
      }
    },
    handleEdit: (state, action) => {
      const array = state.posts.map((post) => {
        if (post.postId != action.payload.postId) return post;
        else return { ...post, content: action.payload.content }
      })
      return {
        posts: array
      }
    },
    handleDeleteImage: (state, action) => {
      const array = state.posts.map((post) => {
        if (post.postId != action.payload) return post;
        else return { ...post, image: false }
      })
      return {
        posts: array
      }
    }
  },
});

export const postActions = {
  createPost: userSlice.actions.createPost,
  fetchPosts: userSlice.actions.fetchPosts,
  likePost: userSlice.actions.likePost,
  handleMute: userSlice.actions.handleMute,
  handleBlock: userSlice.actions.handleBlock,
  handleDelete: userSlice.actions.handleDelete,
  handleEdit: userSlice.actions.handleEdit,
  handleDeleteImage: userSlice.actions.handleDeleteImage,
};

export default userSlice.reducer;