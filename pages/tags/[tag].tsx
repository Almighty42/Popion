import { Navbar, Post } from "@/components/Layout/Complex";
import { Button } from "@/components/Layout/Simple/Buttons";
import { firestore, postToJSON } from "@/lib/firebase";
import { useFollowTag, useReturnTagObject, useReturnUserId,  } from "@/lib/hooks";
import { RootState, actions } from "@/redux/store";
import { ReactElement, useEffect, useState } from "react";
import { FiHash, FiTag, FiUserMinus, FiUserPlus, FiUserX, FiX } from "react-icons/fi";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import { NestedLayout, withNestedLayout } from "../Layout";
import { useRouter } from "next/router";
import { returnPosts } from "@/components/Layout/Complex/Post/ReturnPosts";

interface TagProps {
    tagObject: any;
    tagName: string;
    posts: any
}

const getAllTags = async () => {
    const tagIds: Array<object> = []
    await firestore.collection("tags").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tagIds.push({ params: { tag: doc.id } })
        })
    })
    return tagIds
}

export async function getStaticPaths() {
    const paths = await getAllTags()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: any }) {

    const tagObject = await useReturnTagObject({ tag: params.tag })

    const postsQuery = await firestore
        .collectionGroup("posts")
        .where("postId", "in", tagObject?.posts)

    const posts = (await postsQuery.get()).docs.map(postToJSON)

    return {
        props: {
            tagObject,
            tagName: params.tag,
            posts
        }
    }
}

const Tag = ({ tagObject, tagName, posts }: TagProps) => {

    const dispatch = useDispatch()
    const router = useRouter()

    // TODO Implement loading functionality

    const [loading, setLoading] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [tagFollowState, setTagFollowState] = useState(false)

    const userInfo = useSelector((state: RootState) => state.user)
    const postsInfo = useSelector((state: RootState) => state.post)

    useEffect(() => {
        //@ts-ignore
        const isUserSubscribed = userInfo.subscribedTags.includes(tagName)
        setTagFollowState(isUserSubscribed)

        dispatch(actions.modalActions.setLoadingState(true))
        dispatch(actions.navbarActions.changeNavbarState("home"))
        dispatch(actions.postActions.fetchPosts(posts))
        dispatch(actions.modalActions.setLoadingState(false))
        setLoadingPosts(false)
    }, [])

    const handleSubscribe = async () => {
        setTagFollowState(!tagFollowState)
        const userId = await useReturnUserId({ username: userInfo.username })
        useFollowTag({ dispatch, state: tagFollowState, tagName, userId })
    }

    return (
        <>
            <div className="tag-frame__search">
                <div className="tag-frame__info">
                    <FiHash size={24} />
                    <h4 className="semibold" > {tagName} </h4>
                    <Button
                    type={tagFollowState ? 'primary' : 'ghost'}
                    animation
                    icon={tagFollowState ? <FiUserX size={16} /> : <FiUserPlus size={16} />}
                    text={tagFollowState ? "Unsubscribe" : "Subscribe"}
                    size="small"
                    execute={handleSubscribe}
                    />
                </div>
                <button onClick={() => { router.push('/') }} >
                    <FiX size={24} />
                </button>
            </div>
            <div className="tag-frame__feed">
                {loadingPosts ? 
                returnPosts({ postsInfo, refresh: true, userInfo, setLoadingPosts }) : 
                returnPosts({ postsInfo, refresh: false, userInfo, setLoadingPosts })}
                <button>
                    <h6 className='semibold'> Show more </h6>
                </button>
            </div>
        </>
    );
}

Tag.getLayout = function getLayout(page: ReactElement) {
    return <NestedLayout> {page} </NestedLayout>
}

export default withNestedLayout(Tag)

/* const Item = () => {
    return (
        <>
            <div className="tag">
                <div className="tag__title">
                    <FiHash size={24} />
                    <h5 className="semibold" > Minion </h5>
                </div>
                <div className="tag__actions">
                    <div className="tag__follow-info">
                        <p className="p3 semibold" > 3000 </p>
                        <p className="caption" > Subscribers </p>
                    </div>
                    <div className="tag__follow-info">
                        <p className="p3 semibold" > 3000 </p>
                        <p className="caption" > Posts </p>
                    </div>
                    <Button
                        type="ghost"
                        animation
                        text="Subscribe"
                        icon={<FiUserPlus size={16} />}
                        size="small"
                    />
                </div>
            </div>
        </>
    )
} */