// Styles
import '@/styles/globals.scss'
import '@/styles/Base.scss'
import '@/styles/Auth.scss'
import '@/styles/Other.scss'
import '@/styles/Profile.scss'
// Next
import type { AppProps } from 'next/app'
import { useState } from 'react';
// Redux
import { Provider } from 'react-redux';
import store from '@/redux/store'
// App frame
import Frame from './frame';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Frame />
        <Component {...pageProps} />
    </Provider>
  );
}
