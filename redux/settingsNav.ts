import { createSlice } from '@reduxjs/toolkit';

const settingsNavSlice = createSlice({
  name: 'settings',
  initialState: {
    window: 'Profile'
  },
  reducers: {
    setWindow: (state, action) => {
      return {
        window: action.payload
      }
    }
  },
});

export const settingsNavActions = {
    setWindow: settingsNavSlice.actions.setWindow,
  };

export default settingsNavSlice.reducer;