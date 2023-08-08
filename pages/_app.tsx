import AddPost from '@/components/Home/AddPost';
import OnlineSection from '@/components/Home/OnlineSection';
import Post from '@/components/Home/Post';
import ProfileSection from '@/components/Home/ProfileSection';
import TagsSection from '@/components/Home/TagsSection';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='frame' >
      <Navbar loggedIn={true} />
      <div className="bodyFrame">
        <div className="leftFrame">
          <ProfileSection loggedIn={true} />
          <OnlineSection loggedIn={true} />
        </div>
        <div className="centerFrame">
          <AddPost props />
          <div className="feed">
            <Post props />
            <Post props />
            <Post props />
            <Post props />
            <Post props />
            <button>
              <h6 className='semibold'> Show more </h6>
            </button>
          </div>
        </div>
        <div className="rightFrame">
          <TagsSection props />
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}
