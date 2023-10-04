// React
import { Dispatch, useEffect, useState } from "react";
// Firebase
import { firestore } from "@/lib/firebase";
import firebase from "firebase/compat/app";
// Redux
import { RootState, actions } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// Components
import { Button } from "@/components/Layout/Simple/Buttons";
import { Navbar, ModalBlock, Post } from "@/components/Layout/Complex";
// Icons
import { FiAtSign, FiBookmark, FiGrid, FiHash, FiHeart, FiImage, FiMoreVertical, FiSave, FiSend, FiShare2, FiSlash, FiUnlock, FiUserPlus, FiUserX, FiVolume2, FiVolumeX } from "react-icons/fi";
// Hooks
import { useFollowUser, usePostAlterArray, useReturnFilterPosts, useReturnUserId, useReturnUserObject } from "@/lib/hooks";
// Other
import { PostProps, UserProps } from "@/lib/types";
import Avatar from "react-avatar";
import ReactLoading from 'react-loading';
import { useMediaQuery } from "react-responsive";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

interface UserPageProps {
    userObject: UserProps,
    userId: string
}
interface ProfileNavbarItemProps {
    type: 'Posts' | 'Mentions' | 'Likes' | 'Images' | 'Saved posts' | 'Tags',
    navbarState: string,
    execute(): void
}
interface ProfileDropdownProps {
    block: boolean,
    mute: boolean,
    setState: Dispatch<React.SetStateAction<boolean>>,
    ownerUsername: string,
    setMute: Dispatch<React.SetStateAction<boolean>>,
    setBlock: Dispatch<React.SetStateAction<boolean>>,
    ownerId: string,
    username: string
}

const getAllUserIds = async () => {

    const userIds: Array<object> = []
    await firestore.collection("usernames").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            userIds.push({ params: { user: doc.id } })
        })
    })
    return userIds
}

export async function getStaticPaths() {
    const paths = await getAllUserIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: any }) {

    const userId = await useReturnUserId({ username: params.user })
    const userObject = await useReturnUserObject({ userId })

    return {
        props: {
            userObject,
            userId
        }
    }
}
const UserPage = ({ userObject, userId }: UserPageProps) => {
    console.log(userObject)
    const [toggle, setToggle] = useState(false)
    const [ownerProfileCheck, setOwnerProfileCheck] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)
    const [isBlockedUser, setIsBlockedUser] = useState(false)
    const [userDropdownState, setUserDropdownState] = useState(false)
    const [navbarState, setNavbarState] = useState<'Posts' | 'Mentions' | 'Likes' | 'Images' | 'Saved posts' | 'Tags'>('Posts')
    const [followCount, setFollowCount] = useState<number>()

    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)

    const dispatch = useDispatch()

    const isMinW = useMediaQuery({ query: '(max-width: 1151px)' })
    const isMinH = useMediaQuery({ query: '(max-height: 599px)' })
    const isMin = isMinW || isMinH ? true : false

    const [checkMin, setCheckMin] = useState(isMin)

    const userInfo = useSelector((state: RootState) => state.user)
    const modalInfo = useSelector((state: RootState) => state.modal);
    const postsInfo = useSelector((state: RootState) => state.post);

    const [followersCount, setFollowersCount] = useState<number>(userObject.followersNum)
    const [followingCount, setFollowingCount] = useState<number>(userInfo.followingNum)

    useEffect(() => {
        const fetch = async () => {
            if (userInfo.loggedIn) {
                const currentUserId = await useReturnUserId({ username: userInfo.username })
                if (currentUserId == userId) {
                    setOwnerProfileCheck(true)
                    dispatch(actions.navbarActions.changeNavbarState("profile"))
                } else {
                    dispatch(actions.navbarActions.changeNavbarState(""))
                    //@ts-ignore
                    if (userInfo.following.includes(userId)) { setToggle(true); setCheck1(false); setCheck2(true) }
                    else { setToggle(false); setCheck1(true); setCheck2(false) }

                    const mutedUsers = userInfo.mutedUsers
                    const blockedUsers = userInfo.bannedUsers

                    //@ts-ignore
                    if (mutedUsers.includes(userId)) setIsMuted(true);
                    //@ts-ignore
                    if (blockedUsers.includes(userId)) setIsBlocked(true);
                    //@ts-ignore
                    if (userObject.bannedUsers.includes(currentUserId)) setIsBlockedUser(true)

                }
            }
            const postsFetch: Array<PostProps> = await useReturnFilterPosts({ type: navbarState, userId })
            dispatch(actions.postActions.fetchPosts(postsFetch))
            setFollowCount(userObject.followersNum)
            setLoading(false)
        }
        fetch()
    }, [])
    useEffect(() => {
        setCheckMin(isMin)
    }, [isMin])
    useEffect(() => {
        setLoadingPosts(true)
        const fetchPosts = async () => {
            const postsFetch: Array<PostProps> = await useReturnFilterPosts({ type: navbarState, userId })
            dispatch(actions.postActions.fetchPosts(postsFetch))
            setLoadingPosts(false)
        }
        fetchPosts()
    }, [navbarState])

    const returnPosts = (refresh: boolean) => {
        if (refresh) {
            return
        } else {
            return postsInfo.posts.map((post: any) => (
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
            ));
        }
    }

    // TODO Format newly written code

    return (
        <>
            <ModalBlock isMin={isMin} modalInfo={modalInfo} userId={userId} userObject={userObject} setLoading={setLoading} />
            <div className="frame" >
                <Navbar loggedIn={userInfo.loggedIn} />
                {!loading ?
                    <div className="frame__body profile">
                        <div className="profile__frame" >
                            <div className="profile__content">
                                <div className="profile__info">
                                    <div className="profile__details">
                                        <Avatar size="96" round />
                                        <div className="name">
                                            <h4 className="semibold" > {userObject.name} </h4>
                                            <p className="p1" > @{userObject.username} </p>
                                        </div>
                                        <p className="p1" > {userObject.description} </p>
                                    </div>
                                    <div className="profile__follow" >
                                        <div className="profile__follow__section" onClick={() => { dispatch(actions.modalActions.turnOnPassProps({ window: "followList", userId, type: 'following' })) }}>
                                            <p className="p3" > {userObject.followingNum} </p>
                                            <p className="p1" > Following </p>
                                        </div>
                                        <div className="profile__follow__section" onClick={() => { dispatch(actions.modalActions.turnOnPassProps({ window: "followList", userId, type: 'followers' })) }}>
                                            <p className="p3" > {followCount} </p>
                                            <p className="p1" > Followers </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile__actions">
                                    <div className="profile__actions__navbar" >
                                        <div>
                                            <ProfileNavbarItem navbarState={navbarState} type="Posts" execute={() => { setNavbarState('Posts') }} />
                                            <ProfileNavbarItem navbarState={navbarState} type="Mentions" execute={() => { setNavbarState('Mentions') }} />
                                            <ProfileNavbarItem navbarState={navbarState} type="Likes" execute={() => { setNavbarState('Likes') }} />
                                            <ProfileNavbarItem navbarState={navbarState} type="Images" execute={() => { setNavbarState('Images') }} />
                                            <ProfileNavbarItem navbarState={navbarState} type="Saved posts" execute={() => { setNavbarState('Saved posts') }} />
                                            <ProfileNavbarItem navbarState={navbarState} type="Tags" execute={() => { setNavbarState('Tags') }} />
                                        </div>
                                        <div>
                                            {userInfo.loggedIn &&
                                                <>
                                                    {!ownerProfileCheck &&
                                                        <>
                                                            {isBlockedUser ?
                                                                <>
                                                                    <Button
                                                                        type="ghost"
                                                                        text="User blocked you"
                                                                        icon={<FiUserPlus size={16} />}
                                                                        size="small"
                                                                        color='disabled'
                                                                    />
                                                                </> :
                                                                <>
                                                                    {!toggle ?
                                                                        <Button
                                                                            type="ghost"
                                                                            text="Follow"
                                                                            icon={<FiUserPlus size={16} />}
                                                                            size="small"
                                                                            execute={() => {
                                                                                //@ts-ignore
                                                                                setFollowCount(followCount + 1)
                                                                                useFollowUser({
                                                                                    add: true,
                                                                                    setToggle,
                                                                                    userId,
                                                                                    userInfo,
                                                                                    dispatch,
                                                                                    followersCount,
                                                                                    targetName: userObject.name,
                                                                                    targetUsername: userObject.username,
                                                                                    followersNum: followersCount,
                                                                                    followingNum: followingCount,
                                                                                    setFollowersCount,
                                                                                    setFollowingCount,
                                                                                    state: check1
                                                                                });
                                                                            }}
                                                                            animation /> :
                                                                        <Button
                                                                            type="primary"
                                                                            text="Unfollow"
                                                                            icon={<FiUserX size={16} />}
                                                                            size="small"
                                                                            execute={() => {
                                                                                //@ts-ignore
                                                                                setFollowCount(followCount - 1)
                                                                                useFollowUser({
                                                                                    add: false,
                                                                                    setToggle,
                                                                                    userId,
                                                                                    userInfo,
                                                                                    dispatch,
                                                                                    followersCount,
                                                                                    targetName: userObject.name,
                                                                                    targetUsername: userObject.username,
                                                                                    followersNum: followersCount,
                                                                                    followingNum: followingCount,
                                                                                    setFollowersCount,
                                                                                    setFollowingCount,
                                                                                    state: check2
                                                                                });
                                                                            }}
                                                                            animation />
                                                                    }
                                                                    <Button
                                                                        type="primary"
                                                                        text="Send message"
                                                                        icon={<FiSend size={16} />}
                                                                        size="small"
                                                                        animation />
                                                                </>
                                                            }
                                                            <button className="more" onClick={() => { setUserDropdownState(!userDropdownState) }} >
                                                                <FiMoreVertical size={24} />
                                                            </button>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="frame__feed">
                                        {loadingPosts ? returnPosts(true) : returnPosts(false)}
                                    </div>
                                    {userDropdownState &&
                                        <ProfileDropdown
                                            block={isBlocked}
                                            mute={isMuted}
                                            setState={setUserDropdownState}
                                            ownerUsername={userObject.username}
                                            setMute={setIsMuted}
                                            setBlock={setIsBlocked}
                                            ownerId={userId}
                                            username={userInfo.username}
                                        />
                                    }
                                    {/* <Post /> */}
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className='loadingFrame'>
                        <ReactLoading type='spin' color='blue' height={'5%'} width={'5%'} />
                    </div>
                }

            </div>
        </>
    );
}

const ProfileNavbarItem = ({ type, navbarState, execute }: ProfileNavbarItemProps) => {
    return (
        <button className={type == navbarState ? 'profileNavbarItem selected' : 'profileNavbarItem'} onClick={() => { execute() }} >
            {type == 'Posts' ? <FiGrid size={20} /> :
                type == 'Mentions' ? <FiAtSign size={20} /> :
                    type == 'Likes' ? <FiHeart size={20} /> :
                        type == 'Images' ? <FiImage size={20} /> :
                            type == 'Saved posts' ? <FiBookmark size={20} /> :
                                <FiHash size={20} />
            }
            <p className="p2" > {type} </p>
        </button>
    )
}

const ProfileDropdown = ({ block, mute, setState, ownerUsername, setMute, setBlock, ownerId, username }: ProfileDropdownProps) => {

    const dispatch = useDispatch()

    const handleMuteUser = async () => {
        const userId = await useReturnUserId({ username })
        if (!mute) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${ownerUsername} is muted`)
            setMute(true)
            dispatch(actions.userActions.handleMuteUser({ add: true, content: ownerId }))

        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'mutedUsers', userId })
            toast.success(`${ownerUsername} is unmuted`)
            setMute(false)
            dispatch(actions.userActions.handleMuteUser({ add: false, content: ownerId }))
        }
    }
    const handleBlockUser = async () => {
        const userId = await useReturnUserId({ username })
        if (!block) {
            usePostAlterArray({ add: true, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${ownerUsername} is blocked`)
            setBlock(true)
            dispatch(actions.userActions.handleBlockUser({ add: true, content: ownerId }))
        } else {
            usePostAlterArray({ add: false, docId: ownerId, type: 'blockedUsers', userId })
            toast.success(`${ownerUsername} is unblocked`)
            setBlock(false)
            dispatch(actions.userActions.handleBlockUser({ add: false, content: ownerId }))
        }
    }
    const handleSharePost = async () => {
        dispatch(actions.modalActions.turnOn('sharePost'))
    }

    return (
        <motion.div
            className="profile__dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {!block &&
                <>
                    <button onClick={() => { handleMuteUser(); setState(false) }} >
                        {mute ?
                            <>
                                <FiVolume2 size={24} />
                                <p className='p2 semibold' > Unmute user </p>
                            </> :
                            <>
                                <FiVolumeX size={24} />
                                <p className='p2 semibold' > Mute user </p>
                            </>
                        }
                    </button>
                    <hr />
                </>
            }
            <button onClick={() => { handleBlockUser(); setState(false) }} >
                {block ?
                    <>
                        <FiUnlock size={24} />
                        <p className='p2 semibold' > Unblock user </p>
                    </> :
                    <>
                        <FiSlash size={24} />
                        <p className='p2 semibold' > Block user </p>
                    </>
                }
            </button>
            <hr />
            <button onClick={() => { handleSharePost(); setState(false) }} >
                <FiShare2 size={24} />
                <p className='p2 semibold' > Share user </p>
            </button>
        </motion.div>
    )
}

export default UserPage;