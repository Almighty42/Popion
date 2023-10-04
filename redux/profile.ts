//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    posts: [],
  },
  reducers: {
    fetchPosts: (state, action) => {
        return {
            posts : [
                ...action.payload
            ]
        }
    }
  },
});

export const imageActions = {
    uploadImage: imageSlice.actions.uploadImage,
  };

export default imageSlice.reducer;