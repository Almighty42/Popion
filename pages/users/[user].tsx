// React
import { useEffect, useState } from "react";
// Components
import { returnPosts } from "@/components/Layout/Complex/Post/ReturnPosts";
import ProfileDropdown from "../../components/Pages/Users/ProfileDropdown";
import ProfileInfo from "../../components/Pages/Users/ProfileInfo";
import ProfileNavbar from "../../components/Pages/Users/ProfileNavbar";
// Firebase
import { firestore } from "@/lib/firebase";
// Redux
import { RootState, actions } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// Hooks
import { useFollowUser, useReturnFilterPosts, useReturnUserId, useReturnUserObject } from "@/lib/hooks";
// Types
import { ProfileProps } from "../../components/Pages/Users/UserInterface";
// Other
import { PostCompProps } from "@/utils/interfaces";
// Styles
import '@/components/Pages/Users/UserPage.scss';
import { useRouter } from "next/router";

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
        fallback: true
    }
}

export async function getStaticProps({ params }: { params: any }) {

    let userId = null;
    let userObject = null

    userId = await useReturnUserId({ username: params.user })
    userObject = await useReturnUserObject({ userId })
    //const testing = (await firestore.doc(`usernames/${params.user}`).get()).data()

    return {
        props: {
            userId,
            userObject
        },
    }

}
const UserPage = ({ userObject, userId }: ProfileProps) => {

    const router = useRouter()

    const [toggle, setToggle] = useState(false)
    const [ownerProfileCheck, setOwnerProfileCheck] = useState(false)
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

    const userInfo = useSelector((state: RootState) => state.user)
    const postsInfo = useSelector((state: RootState) => state.post);

    const [followersCount, setFollowersCount] = useState<number>(userObject.followersNum)
    const [followingCount, setFollowingCount] = useState<number>(userInfo.followingNum)

    useEffect(() => {
        dispatch(actions.modalActions.setLoadingState(true))
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
            const postsFetch: Array<PostCompProps> = await useReturnFilterPosts({ type: navbarState, userId })
            dispatch(actions.postActions.fetchPosts(postsFetch))
            setFollowCount(userObject.followersNum)
        }
        fetch()
        dispatch(actions.modalActions.setLoadingState(false))
    }, [])
    useEffect(() => {
        setLoadingPosts(true)
        const fetchPosts = async () => {
            const postsFetch: Array<PostCompProps> = await useReturnFilterPosts({ type: navbarState, userId })
            dispatch(actions.postActions.fetchPosts(postsFetch))
            setLoadingPosts(false)
        }
        fetchPosts()
    }, [navbarState])

    const returnProps = (addState: boolean) => {
        const props = {
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
        }
        return {
            ...props,
            add: addState,
        }
    }

    return (
        <div className="profile__frame" >
            <div className="profile__content">
                <ProfileInfo
                    userObject={userObject}
                    userId={userId}
                    followCount={followCount}
                />
                <div className="profile__actions">
                    <ProfileNavbar
                        isBlockedUser={isBlockedUser}
                        navbarState={navbarState}
                        ownerProfileCheck={ownerProfileCheck}
                        setNavbarState={setNavbarState}
                        setUserDropdownState={setUserDropdownState}
                        toggle={toggle}
                        useFollowUser={useFollowUser}
                        userDropdownState={userDropdownState}
                        userInfo={userInfo}
                        useFollowUserProps1={returnProps(true)}
                        useFollowUserProps2={returnProps(false)}
                    />
                    <div className="frame__feed">
                        {loadingPosts ?
                            returnPosts({ refresh: true, postsInfo, userInfo, setLoadingPosts }) :
                            returnPosts({ refresh: false, postsInfo, userInfo, setLoadingPosts })
                        }
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
                </div>
            </div>
        </div>
    );
}

export default UserPage;