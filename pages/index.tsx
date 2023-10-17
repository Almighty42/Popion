// React
import React, { ReactElement, useEffect, useState } from 'react';
// Firebase
import { firestore, postToJSON } from '@/lib/firebase';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from '@/redux/store';
// Components
import { HomeAddPost, HomeOnlineBlock, HomeProfileBlock, HomeTagsBlock } from '@/components/Pages/Home';
import { Post, Navbar, ModalBlock } from "@/components/Layout/Complex"
import { SearchHeader, TagBlock, UserBlock } from '@/components/Pages/Other/Search'
// Other
import ReactLoading from 'react-loading';

import { NestedLayout, withNestedLayout } from './Layout';
import { returnPosts } from '@/components/Layout/Complex/Post/ReturnPosts';

interface HomeProps {
    data: any
}

export async function getServerSideProps() {
    const postsQuery = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(10);

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
        props: { data: posts }
    }
}

const Home = ({ data } : HomeProps) => {

    const dispatch = useDispatch()

    const [posts, setPosts] = useState(data)
    const [loadingPosts, setLoadingPosts] = useState(true)

    const userInfo = useSelector((state: RootState) => state.user)
    const postsInfo = useSelector((state: RootState) => state.post)

    useEffect(() => {
        dispatch(actions.modalActions.setLoadingState(true))
        dispatch(actions.navbarActions.changeNavbarState("home"))
        dispatch(actions.postActions.fetchPosts(posts))
        dispatch(actions.modalActions.setLoadingState(false))
        setLoadingPosts(false)
    }, [])
    

    return (
        <>  
            {userInfo.loggedIn && <HomeAddPost userInfo={userInfo} />}
            <div className="frame__feed">
                {loadingPosts ? 
                returnPosts({ postsInfo, refresh: true, userInfo, setLoadingPosts }) : 
                returnPosts({ postsInfo, refresh: false, userInfo, setLoadingPosts })}
                <button>
                    <h6 className='semibold'> Show more </h6>
                </button>
            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <NestedLayout> {page} </NestedLayout>
}

export default withNestedLayout(Home)


/* 
<>
            <ModalBlock isMin={isMin} modalInfo={modalInfo} setLoading={setLoadingPosts} />
            <div className='frame' >
                <Navbar loggedIn={userInfo.loggedIn} />
                {!feedInfo.loading ? (
                    <div className="frame__body">

                        <div className="frame__side">
                            <HomeProfileBlock loggedIn={userInfo.loggedIn} />
                            {userInfo.loggedIn && <HomeOnlineBlock />}
                        </div>
                        <div className="frame__center">
                            {feedInfo.window == 'default' ?
                                <>
                                    {userInfo.loggedIn && <HomeAddPost userInfo={userInfo} />}
                                    <div className="frame__feed">
                                        {loadingPosts ? returnPosts(true) : returnPosts(false)}
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
                                                    <button>
                                                        <h6 className='semibold'> Show more </h6>
                                                    </button>
                                                </div>
                                            </> : ''
                            }
                        </div>
                        <div className="frame__side">
                            <HomeTagsBlock loggedIn={userInfo.loggedIn} />
                        </div>
                    </div>
                ) : (
                    <div className='frame__loading'>
                        <ReactLoading type='spin' color='blue' height={'5%'} width={'5%'} />
                    </div>
                )}
            </div >
        </> 
        
        
        const dispatch = useDispatch()
    const [posts, setPosts] = useState(props.posts)
    const [loadingPosts, setLoadingPosts] = useState(false)

    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    const [checkMin, setCheckMin] = useState(isMin)

    const modalInfo = useSelector((state: RootState) => state.modal);
    const feedInfo = useSelector((state: RootState) => state.feed)
    const userInfo = useSelector((state: RootState) => state.user)
    const postsInfo = useSelector((state: RootState) => state.post)

    useEffect(() => {
        setCheckMin(isMin)
    }, [isMin])
    useEffect(() => {
        dispatch(actions.navbarActions.changeNavbarState("home"))
        setLoadingPosts(true)
        dispatch(actions.postActions.fetchPosts(posts))
        setLoadingPosts(false)
    }, [])

    const returnPosts = (refresh: boolean) => {
        return refresh ? '' : postsInfo.posts.map((post: any) => (
            <>
                <Post
                    name={post.name}
                    username={post.username}
                    content={post.content}
                    createdAt={post.createdAt}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    postId={post.postId}
                    userInfo={userInfo}
                    mute={post.mute}
                    block={post.block}
                    ownerId={post.ownerId}
                    image={post.image}
                    setLoadingPosts={setLoadingPosts}
                />
            </>
        ))
    }

*/