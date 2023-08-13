// React
import { useEffect, useState } from 'react';
// Components
import Login from '@/components/interface/auth/Login';
import Register from '@/components/interface/auth/Register';
import AddPost from '@/components/interface/home/AddPost';
import OnlineSection from '@/components/interface/home/OnlineSection';
import Post from '@/components/base/Layout/Post';
import ProfileSection from '@/components/interface/home/ProfileSection';
import TagsSection from '@/components/interface/home/TagsSection';
import Navbar from '@/components/base/Layout/Navbar';
import { NotificationSection } from '@/components/interface/other/Notifications';
import { ChatBox, ChatsSection } from '@/components/interface/other/Chats';
import { SearchSection, SearchHeader, TagBlock, UserBlock } from '@/components/interface/other/Search'
// Other
import { useMediaQuery } from 'react-responsive';
import { Modal } from 'react-overlays';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Profile from '@/components/interface/profile/Profile';

export default function Frame() {
    // Redux info
    const modalInfo = useSelector((state: RootState) => state.modal);
    const feedInfo = useSelector((state: RootState) => state.feed)

    // Check if window is small
    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    // useState
    const [checkMin, setCheckMin] = useState(isMin)

    // useEffect
    useEffect(() => {
        setCheckMin(isMin)
    }, [isMin])

    return (
        <>
            <Modal
                className="modal"
                show={modalInfo.show}
            >
                {modalInfo.window == 'register' ?
                    <Register /> :
                    modalInfo.window == 'login' ?
                        <Login /> :
                        modalInfo.window == 'notifications' ?
                            <NotificationSection /> :
                            modalInfo.window == 'chats' ?
                                <ChatsSection modalInfo={modalInfo} /> :
                                modalInfo.window == 'chatsBox' ?
                                    <ChatBox /> :
                                    modalInfo.window == 'searchBox' ?
                                        <SearchSection /> : <p> Empty </p>
                }
            </Modal>
            <div className='frame' >
                <Navbar loggedIn={true} />
                <div className="bodyFrame">
                    {/* <div className="leftFrame">
                        <ProfileSection loggedIn={false} />
                        <OnlineSection loggedIn={true} />
                    </div>
                    <div className="centerFrame">
                        {feedInfo.window == 'default' ?
                            <>
                                <AddPost />
                                <div className="feed">
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                    <Post />
                                    <button>
                                        <h6 className='semibold'> Show more </h6>
                                    </button>
                                </div>
                            </> :
                            feedInfo.window == 'searchHeader' ?
                                <>
                                    <SearchHeader type='tags' checkMin={checkMin} />
                                    <TagBlock checkMin={checkMin} />
                                    <TagBlock checkMin={checkMin} />
                                    <TagBlock checkMin={checkMin} />
                                </> :
                                feedInfo.window == 'userSearch' ?
                                    <>
                                        <SearchHeader type='users' checkMin={checkMin} />
                                        <UserBlock checkMin={checkMin} />
                                        <UserBlock checkMin={checkMin} />
                                        <UserBlock checkMin={checkMin} />
                                    </> :
                                    feedInfo.window == 'postSearch' ?
                                        <>
                                            <SearchHeader type='posts' checkMin={checkMin} />
                                            <div className="feed">
                                                <Post />
                                                <Post />
                                                <Post />
                                                <button>
                                                    <h6 className='semibold'> Show more </h6>
                                                </button>
                                            </div>
                                        </> : ''
                        }
                    </div>
                    <div className="rightFrame">
                        <TagsSection loggedIn={true} />
                    </div> */}
                    <Profile />
                </div>
            </div >
        </>
    );
}
