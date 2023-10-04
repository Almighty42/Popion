import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    window: 'default',
    loading: false
  },
  reducers: {
    windowChange: (state, action) => {
        state.window = action.payload;
    },
    setLoadingState: (state, action) => {
      if (action.payload.type) {
        state.loading = action.payload.value
      } else {
        state.loading = !state.loading
      }
    }
  },
});

export const feedActions = {
    windowChange: feedSlice.actions.windowChange,
    setLoadingState: feedSlice.actions.setLoadingState,
};

export default feedSlice.reducer;