import { FiSettings } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

interface TagsSectionProps {
    loggedIn: boolean;
}

const TagsSection = ({ loggedIn }: TagsSectionProps) => {

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
                {/* {isDesktop ?
                <h6 className="semibold"> Trending in Serbia </h6> :
                <p className="p1 semibold"> Trending in Serbia </p>                
                } */}
                <Tag text='#Minions' />
                <Tag text='#CrniCerak' />
            </div>
            <hr />
            <div className="tags">
            {/* {isDesktop ?
                <h6 className="semibold"> MMA - trending </h6> :
                <p className="p1 semibold"> MMA - trending </p>                
                } */}
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