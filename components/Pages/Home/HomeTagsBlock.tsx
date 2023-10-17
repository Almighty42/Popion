// React
import { useEffect, useState } from "react";
// Icons
import { FiSettings } from "react-icons/fi";
// Other
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebase";
import ReactLoading from 'react-loading';

// TODO ---> Connect component to firestore and implement functionality
// TODO ---> Cleanup code

interface HomeTagsBlockProps {
    loggedIn: boolean,
    subscribedTags: Array<string>
}

interface TagProps {
    text: string,
    subscribers: number
}

interface useStateProps {
    tagName: string,
    tagSubscribers: number
}



const HomeTagsBlock = ({ loggedIn, subscribedTags }: HomeTagsBlockProps) => {

    // TODO     Enable show more button when loading more then 5 posts
    // TODO     Implement settings for tags

    const [tags, setTags] = useState<Array<useStateProps>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const tagsArray = subscribedTags.map(async (tag) => {
                const tagRef = (await firestore.doc(`tags/${tag}`).get()).data()
                return {
                    tagName: tag,
                    tagSubscribers: tagRef?.postsNum
                }
            })

            const resolvedArray = await Promise.all(tagsArray)

            setTags(resolvedArray)
            setLoading(false)
        }
        fetch()
    }, [])


    return (
        <div className="tagsblock">
            <div className="tagsblock__header">
                <h5 className="semibold" > {loggedIn ? 'For you' : 'Trending tags'} </h5>
                <h6 className="semibold" > {loggedIn ? 'For you' : 'Trending tags'} </h6>
                {loggedIn &&
                    <button>
                        <FiSettings size={24} />
                    </button>
                }
            </div>
            <div className="tagsblock__tags">
                {!loading ?
                    <>
                        {tags.map((tag) => <Tag text={'#' + tag.tagName} subscribers={tag.tagSubscribers} />)}
                    </> :
                    <div className="tagsblock__loading">
                        <ReactLoading type='spin' color='blue' height={'50%'} width={'15%'} />
                    </div>
                }
            </div>
            {/* {loggedIn &&
                <button>
                    <p className="tagsblock__showmore p2 semibold" > Show more </p>
                </button>
            } */}
        </div>
    );
}

const Tag = ({ text, subscribers }: TagProps) => {

    const router = useRouter()

    return (
        <div className="tagsblock__tag" onClick={() => { router.push(`/tags/${text.slice(1)}`) }} >
            <p className="p3 semibold" > {text} </p>
            <p className="p1 semibold"> {subscribers} Posts </p>
        </div>
    )
}

export default HomeTagsBlock;