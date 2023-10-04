import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    state: ''
  },
  reducers: {
    changeNavbarState: (state, action) => {
        return {
            state: action.payload
        }
    }
  },
});

export const navbarActions = {
    changeNavbarState: navbarSlice.actions.changeNavbarState
  };

export default navbarSlice.reducer;