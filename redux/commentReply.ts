import { createSlice } from '@reduxjs/toolkit';

const commentReplySlice = createSlice({
  name: 'commentReply',
  initialState: {
    commentId: '',
    selectedStep: 0
  },
  reducers: {
    selectStep: (state, action) => {
      return {
        commentId: action.payload.commentId,
        selectedStep: action.payload.step
      }
    }
  },
});

export const commentReplyActions = {
  selectStep: commentReplySlice.actions.selectStep
};

export default commentReplySlice.reducer;