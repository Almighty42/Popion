import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    window: 'default',
  },
  reducers: {
    windowChange: (state, action) => {
        state.window = action.payload;
    },
  },
});

export const feedActions = {
    windowChange: feedSlice.actions.windowChange,
};

export default feedSlice.reducer;