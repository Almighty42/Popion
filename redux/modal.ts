import { createSlice } from '@reduxjs/toolkit';

// TODO Fix redux logic for immutable data

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    window: '',
    userId: '',
    type: ''
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
    turnOnPassProps: (state, action) => {
      return {
        show: true,
        window: action.payload.window,
        userId: action.payload.userId,
        type: action.payload.type
      }
    }
  },
});

export const modalActions = {
    turnOn: modalSlice.actions.turnOn,
    turnOff: modalSlice.actions.turnOff,
    windowChange: modalSlice.actions.windowChange,
    turnOnPassProps: modalSlice.actions.turnOnPassProps,
};

export default modalSlice.reducer;