import { FiSettings } from "react-icons/fi";

interface TagsSectionProps {
    props: any;
}

const TagsSection = ({ props }: TagsSectionProps) => {
    return (
        <div className="tagsSection">
            <div className="header">
                <h5 className="semibold" > For you </h5>
                <button>
                    <FiSettings size={24} />
                </button>
            </div>
            <div className="tags">
                <h6 className="semibold"> Trending in Serbia </h6>
                <Tag text='#Minions' />
                <Tag text='#CrniCerak' />
            </div>
            <hr />
            <div className="tags">
                <h6 className="semibold"> MMA - trending </h6>
                <Tag text='#ConnorMcgregor' />
                <Tag text='#JonJones' />
            </div>
            <button>
                <p className="p2 semibold" > Show more </p>
            </button>
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