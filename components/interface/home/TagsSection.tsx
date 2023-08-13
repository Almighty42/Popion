// Icons
import { FiSettings } from "react-icons/fi";

const TagsSection = ({ loggedIn }: { loggedIn: boolean }) => {
    return (
        <div className="tagsSection">
            <div className="header">
                <h5 className="semibold" > {loggedIn ? 'For you' : 'Trending tags'} </h5>
                <h6 className="semibold" > {loggedIn ? 'For you' : 'Trending tags'} </h6>
                {loggedIn &&
                    <button>
                        <FiSettings size={24} />
                    </button>
                }
            </div>
            <div className="tags">
                <Tag text='#Minions' />
                <Tag text='#CrniCerak' />
            </div>
            <hr />
            <div className="tags">
                <Tag text='#ConnorMcgregor' />
                <Tag text='#JonJones' />
            </div>
            {loggedIn &&
                <button>
                    <p className="p2 semibold" > Show more </p>
                </button>
            }
        </div>
    );
}

const Tag = ({ text }: { text: string }) => {
    return (
        <div className="tag">
            <p className="p3 semibold" > {text} </p>
            <p className="p1 semibold"> 321 Posts </p>
        </div>
    )
}

export default TagsSection;