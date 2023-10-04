// Next
import type { AppProps } from 'next/app'
// Redux
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// Toast
import { Toaster } from 'react-hot-toast';
// Styles
import '@/styles/globals.scss'
import '@/components/Interface/Auth/Auth.scss'
import '@/components/Interface/Home/Home.scss'
import '@/components/Interface/Popups/Popups.scss'
import '@/components/Layout/Complex/Complex.scss'
import '@/components/Layout/Simple/Simple.scss'
import '@/components/Interface/Other/Other.scss'
import '@/pages/users/User.scss'

export default function App({ Component, pageProps }: AppProps) {

  // TODO   Implement when blocking someone, that it automaticaly unfollows them
  // TODO   Implement ROOT layout
  // TODO   SEO
  // TODO   Posts show more button
  // TODO   Followers/Followings show more button
  // TODO   

  // TODO Implement createdAt functionality for posts
  // TODO Implement @mention functionality for posts ( if possible and if not too complicated )
  // TODO Implement #tag functionality for posts


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Component {...pageProps} />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
