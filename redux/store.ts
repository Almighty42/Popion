// Redux main
import { configureStore } from '@reduxjs/toolkit'
import modalReducers, { modalActions } from './modal';
import dropdownReducers, { dropdownActions } from './dropdown';
import feedReducers, { feedActions } from './feed';
import userReducers, { userActions } from './user';
import postReducers, { postActions } from './post';
import imageReducers, { imageActions } from './image';
import navbarReducers, { navbarActions } from './navbar'
// Redux persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducers)

const rootReducer = {
  modal: modalReducers,
  dropdown: dropdownReducers,
  feed: feedReducers,
  user: persistedReducer,
  post: postReducers,
  image: imageReducers,
  navbar: navbarReducers
};


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export const actions = {
  modalActions,
  dropdownActions,
  feedActions,
  userActions,
  postActions,
  imageActions,
  navbarActions
};

export type RootState = ReturnType<typeof store.getState>;

let persistor = persistStore(store)

export { store, persistor }