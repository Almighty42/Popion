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
  // TODO   Remove @tscheck-ignore from entire project ( Wherever possible)

  // TODO Implement createdAt functionality for posts
  // TODO Implement @mention functionality for posts ( if possible and if not too complicated )
  // TODO Implement #tag functionality for posts
``
  //* Tags todo list
  // TODO   Visible tag in text of the post once the post has been published
  // TODO   Adding those posts to firestore ( Make a sketch of the data model for tags beforehand )
  // TODO   [Tag].tsx page dynamically generated
  // TODO   Make clicking the tag open up [Tag].tsx
  // TODO   Implement user-follow-tag functionality in [Tag].tsx in front-end and data structure in back-end
  // TODO   Show list of posts in tags section under [user].tsx and also allow users to filter tags there
  // TODO   Show tag and other information in HomeTagsBlock.tsx
  // ? TODO Implement autocorrect when typing in hashtags
  // ? TODO Force certain formating for hashtags ( for example hashtags must start with capital letter )


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Component {...pageProps} />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
