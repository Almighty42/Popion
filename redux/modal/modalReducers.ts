import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    window: '',
  },
  reducers: {
    turnOn: (state, action) => {
      state.show = true;
      state.window = action.payload;
    },
    turnOff: (state) => {
      state.show = false;
      state.window = '';
    },
    windowChange: (state, action) => {
      state.window = action.payload;
    },
  },
});

export const modalActions = {
    turnOn: modalSlice.actions.turnOn,
    turnOff: modalSlice.actions.turnOff,
    windowChange: modalSlice.actions.windowChange,
  };

export default modalSlice.reducer;