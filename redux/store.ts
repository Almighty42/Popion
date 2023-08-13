import { configureStore } from '@reduxjs/toolkit'
import modalReducers, { modalActions } from './modal/modalReducers';
import dropdownReducers, { dropdownActions } from './dropdown/dropdownReducers';
import feedReducers, { feedActions } from './feed/feedReducers';

const rootReducer = {
  modal: modalReducers,
  dropdown: dropdownReducers,
  feed: feedReducers
};

const store = configureStore({
  reducer: rootReducer
})

export const actions = {
  modalActions,
  dropdownActions,
  feedActions
};

export type RootState = ReturnType<typeof store.getState>;

export default store;