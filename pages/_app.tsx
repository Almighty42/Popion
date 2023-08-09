import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import AddPost from '@/components/Home/AddPost';
import OnlineSection from '@/components/Home/OnlineSection';
import Post from '@/components/Home/Post';
import ProfileSection from '@/components/Home/ProfileSection';
import TagsSection from '@/components/Home/TagsSection';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { Modal } from 'react-overlays';
import { useMediaQuery } from 'react-responsive';

export default function App({ Component, pageProps }: AppProps) {

  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useState(false)

  var handleClose = () => setShowModal(false);

  var handleSave = () => {
    console.log("success");
  };

  const renderBackdrop = (props: any) => <div className="backdrop" {...props} />;

  return (
    <>
      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        {auth ?
        <Register setShowModal={setShowModal} /> :
        <Login setShowModal={setShowModal} />
        }
      </Modal>
      <div className='frame' >
        <Navbar loggedIn={false} setShowModal={setShowModal} setAuth={setAuth} />
        <div className="bodyFrame">
          <div className="leftFrame">
            <ProfileSection loggedIn={false} setShowModal={setShowModal}  setAuth={setAuth} />
            {/* <OnlineSection loggedIn={false} /> */}
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
          {/* {isDesktop &&        
        <div className="rightFrame">
          <TagsSection loggedIn />
        </div>
        } */}
          <div className="rightFrame">
            <TagsSection loggedIn={false} />
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
