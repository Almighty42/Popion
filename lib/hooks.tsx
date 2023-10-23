import { firestore, postToJSON } from "@/lib/firebase";
import { Dispatch, SetStateAction, useState } from "react";
import { UserInfoProps, PostCompProps } from "@/utils/interfaces"
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { actions } from "@/redux/store";

interface returnUserIdProps {
    username: string
}
interface useReturnTagObject {
    tag: string
}
interface returnPostObjectProps {
    userId: string,
    postId: string
}
interface returnUserObject {
    userId: string
}
interface returnFilterPosts {
    type: 'Posts' | 'Mentions' | 'Likes' | 'Images' | 'Saved posts' | 'Tags',
    userId: string
}
interface postAlterArrayProps {
    type: 'savedPosts' | 'likedPosts' | 'mutedUsers' | 'blockedUsers',
    userId: string,
    docId: string,
    add: boolean
}
interface postAlterCountProps {
    type: 'increment' | 'deincrement',
    userId: string,
    postId: string
}
interface setPostButtonProps {
    array: Array<string>,
    postId: string,
    setState: Dispatch<React.SetStateAction<string>>
}
interface editPostProps {
    userId: string,
    postId: string,
    content: string
}
interface useFollowUserProps {
    add: boolean,
    userInfo: UserInfoProps,
    userId: string | undefined, 
    setToggle: Dispatch<SetStateAction<boolean>>,
    dispatch: any,
    followersCount?: number | undefined,
    followersNum: number,
    followingNum: number,
    targetName: string,
    targetUsername: string
    setFollowersCount: Dispatch<SetStateAction<number>>,
    setFollowingCount: Dispatch<SetStateAction<number>>
}
interface useFollowTagProps {
    dispatch: any,
    state: boolean,
    tagName: string,
    userId: string
}

export const useReturnUserId = async ({ username }: returnUserIdProps) => {
    const userId = (await firestore.doc(`usernames/${username}`).get()).data()?.uid
    return userId
}

export const useReturnTagObject = async ({ tag } : useReturnTagObject) => {
    const tagObject = (await firestore.doc(`tags/${tag}`).get()).data()
    return tagObject
}

export const useReturnPostObject = async ({ userId, postId }: returnPostObjectProps) => {
    const postObject = (await firestore.doc(`users/${userId}/posts/${postId}`).get()).data()
    return postObject
}

export const useReturnUserObject = async ({ userId }: returnUserObject) => {
    const userObject = (await firestore.doc(`users/${userId}`).get()).data()
    return userObject
}

export const useReturnFilterPosts = async ({ type, userId }: returnFilterPosts): Promise<Array<PostCompProps>> => {
    if (type == 'Posts') {
        const postsQuery = firestore.collectionGroup("posts").where("userId", "==", userId).limit(10)
        const posts = (await postsQuery.get()).docs.map(postToJSON);
        return [
            ...posts
        ]
    } else if (type == 'Mentions') {
        return []
    } else if (type == 'Likes') {
        // TODO Implement loading only 10 posts at a time

        const userRef = (await firestore.doc(`users/${userId}`).get()).data()
        const postIds = await userRef?.likedPosts
        const posts : Array<any> = postIds.map( async (postId : any) => { 
            const postRef = firestore.collectionGroup("posts").where("postId", "==", postId)
            const post = (await postRef.get()).docs.map(postToJSON)
            return post[0]
        })
        const resolvedPosts = await Promise.all(posts)
        return [
            ...resolvedPosts
        ]
    } else if (type == 'Images') {
        const postsQuery = firestore.collectionGroup("posts").where("userId", "==", userId).where("image", "==", true).limit(10)
        const posts = (await postsQuery.get()).docs.map(postToJSON);
        return [
            ...posts
        ]
    } else if (type == 'Saved posts') {
        // TODO Implement loading only 10 posts at a time

        const userRef = (await firestore.doc(`users/${userId}`).get()).data()
        const postIds = await userRef?.savedPosts
        const posts : Array<any> = postIds.map( async (postId : any) => { 
            const postRef = firestore.collectionGroup("posts").where("postId", "==", postId)
            const post = (await postRef.get()).docs.map(postToJSON)
            return post[0]
        })
        const resolvedPosts = await Promise.all(posts)

        return [
            ...resolvedPosts
        ]
    } else if (type == 'Tags') {
        const userRef = (await firestore.doc(`users/${userId}`).get()).data()
        const userTags = userRef?.subscribedTags
        const posts : Array<any> = userTags.map(async (tag: string) => {
            const postsWithTag = (await firestore.collectionGroup("posts").where("tags", "array-contains", tag).get()).docs.map(postToJSON)
            return [
                ...postsWithTag
            ]
        })

        const resolvedPosts = await Promise.all(posts.map(async (array) => {
            return array
        }))

        return [
            ...resolvedPosts[0]
        ]
    } else {
        return []
    }
        
}

export const usePostAlterArray = async ({ type, userId, docId, add }: postAlterArrayProps) => {
    if (add) {
        if (type == 'savedPosts') {
            firestore.doc(`users/${userId}`).update({ savedPosts: firebase.firestore.FieldValue.arrayUnion(docId) });
            firestore.doc(`users/${userId}/savedPosts/${docId}`).set({ postId: docId, userId })
        }
        else if (type == 'likedPosts') firestore.doc(`users/${userId}`).update({ likedPosts: firebase.firestore.FieldValue.arrayUnion(docId) });
        else if (type == 'mutedUsers') firestore.doc(`users/${userId}`).update({ mutedUsers: firebase.firestore.FieldValue.arrayUnion(docId) });
        else if (type == 'blockedUsers') firestore.doc(`users/${userId}`).update({ bannedUsers: firebase.firestore.FieldValue.arrayUnion(docId) });
    } else {
        if (type == 'savedPosts') {
            firestore.doc(`users/${userId}`).update({ savedPosts: firebase.firestore.FieldValue.arrayRemove(docId) });
            firestore.doc(`users/${userId}/savedPosts/${docId}`).delete()
        }
        else if (type == 'likedPosts') firestore.doc(`users/${userId}`).update({ likedPosts: firebase.firestore.FieldValue.arrayRemove(docId) })
        else if (type == 'mutedUsers') firestore.doc(`users/${userId}`).update({ mutedUsers: firebase.firestore.FieldValue.arrayRemove(docId) });
        else if (type == 'blockedUsers') firestore.doc(`users/${userId}`).update({ bannedUsers: firebase.firestore.FieldValue.arrayRemove(docId) });
    }
}

export const usePostAlterCount = async ({ type, userId, postId }: postAlterCountProps) => {
    if (type == "increment") firestore.doc(`users/${userId}/posts/${postId}`).update({ likeCount: firebase.firestore.FieldValue.increment(1) })
    else if (type == 'deincrement') firestore.doc(`users/${userId}/posts/${postId}`).update({ likeCount: firebase.firestore.FieldValue.increment(-1) })
}

export const useSetPostButton = ({ array, postId, setState }: setPostButtonProps) => {
    if (array.includes(postId)) {
        setState('primary')
    } else {
        setState('ghost')
    }
}

export const useEditPost = async ({ userId, postId, content }: editPostProps) => {
    firestore.doc(`users/${userId}/posts/${postId}`).update({ content })
}

export const useFollowUser = async ({ add, userInfo, dispatch, userId, setToggle, followingNum, followersNum, targetName, targetUsername, setFollowersCount, setFollowingCount }: useFollowUserProps) => {

    
    const currentUserId = await useReturnUserId({ username: userInfo.username })
    if (add) {
            dispatch(actions.userActions.handleFollow({ add: true, content: userId }))
            setToggle(true)
            await firestore.doc(`users/${userId}/followers/${currentUserId}`).set({ name: userInfo.name, username: userInfo.username, userId: currentUserId })
            await firestore.doc(`users/${currentUserId}/following/${userId}`).set({ name: targetName, username: targetUsername, userId }).then(() => {
            firestore.doc(`users/${userId}`).collection("followers").get().then((res) => { 
                firestore.doc(`users/${userId}`).update({ followersNum: res.size })    
            })
            firestore.doc(`users/${currentUserId}`).collection("following").get().then((res) => { 
                firestore.doc(`users/${currentUserId}`).update({ followingNum: res.size })    
            })
            })
            setFollowersCount(followersNum + 1)
            setFollowingCount(followingNum + 1)
        } else {
            dispatch(actions.userActions.handleFollow({ add: false, content: userId }))
            setToggle(false)
            await firestore.doc(`users/${userId}/followers/${currentUserId}`).delete()
            await firestore.doc(`users/${currentUserId}/following/${userId}`).delete().then(() => {
            firestore.doc(`users/${userId}`).collection("followers").get().then((res) => { 
                firestore.doc(`users/${userId}`).update({ followersNum: res.size })
            })
            firestore.doc(`users/${currentUserId}`).collection("following").get().then((res) => { 
                firestore.doc(`users/${currentUserId}`).update({ followingNum: res.size })    
            })
            })
            setFollowersCount(followersNum - 1)
            setFollowingCount(followingNum - 1)
            firestore.doc(`users/${userId}/followers/${currentUserId}`).delete()
            firestore.doc(`users/${currentUserId}/following/${userId}`).delete()

        }
}

export const useFollowTag = ({ dispatch, state, tagName, userId } : useFollowTagProps) => {
    if (state) {
        dispatch(actions.userActions.handleFollowTag({ add: false, content: tagName }))
        firestore.doc(`users/${userId}`).update({ subscribedTags: firebase.firestore.FieldValue.arrayRemove(tagName) })
    } else {
        dispatch(actions.userActions.handleFollowTag({ add: true, content: tagName }))
        firestore.doc(`users/${userId}`).update({ subscribedTags: firebase.firestore.FieldValue.arrayUnion(tagName) })
    }
}