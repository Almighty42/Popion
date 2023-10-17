// Components
import { Post } from ".."
// Types
import { ReturnPostsProps } from "./PostInterface"

export const returnPosts = ({ refresh, postsInfo, userInfo, setLoadingPosts }: ReturnPostsProps) => {
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