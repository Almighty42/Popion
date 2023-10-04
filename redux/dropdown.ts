import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    show: false,
    window: '',
  },
  reducers: {
    flip: (state, action) => {
      if (state.show) {

        state.show = false;
        state.window = ''
      } else {
        state.show = true;
        state.window = action.payload
      }
    },
    windowChange: (state, action) => {
      state.window = action.payload;
    }
  },
});

export const dropdownActions = {
    flip: dropdownSlice.actions.flip,
    windowChange: dropdownSlice.actions.windowChange
  };

export default dropdownSlice.reducer;