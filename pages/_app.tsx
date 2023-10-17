// Next
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
// Redux
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// Toast
import { Toaster } from 'react-hot-toast';
// Styles
import '@/styles/globals.scss'
import '@/components/Pages/Auth/Auth.scss'
import '@/components/Pages/Home/Home.scss'
import '@/components/Pages/Popups/Popups.scss'
import '@/components/Layout/Simple/Simple.scss'
import '@/components/Pages/Other/Other.scss'
import '@/pages/tags/Tag.scss'
import { Layout } from './Layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  // TODO   Implement when blocking someone, that it automaticaly unfollows them
  // TODO   Implement ROOT layout
  // TODO   SEO
  // TODO   Posts show more button
  // TODO   Followers/Followings show more button
  // TODO   Remove @tscheck-ignore from entire project ( Wherever possible)
  // TODO   Make it obvious that there are more posts to scroll over
  // TODO   When logging out and logging back in posts are ( possibly ) not re-rendered which leads to user being able to edit post which isnt his

  // TODO   Navbar - when clicking return to last page button ( possibily to next page as well ) selected item in navbar stays the same
  // TODO   When clicking one of those items, it should trigger loading state on the current page

  // TODO Implement createdAt functionality for posts
  // TODO Implement @mention functionality for posts ( if possible and if not too complicated )
  // TODO Implement #tag functionality for posts

  //* Tags todo list
  // ? TODO Implement autocorrect when typing in hashtags
  // ? TODO Force certain formating for hashtags ( for example hashtags must start with capital letter )

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Layout>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
