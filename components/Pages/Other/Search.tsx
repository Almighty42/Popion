// React
import { useState } from "react";
// Icons
import { FiCompass, FiGrid, FiHash, FiSearch, FiUser, FiUserCheck, FiUserPlus, FiX } from "react-icons/fi";
// Components
import { Button } from "../../Layout/Simple/Buttons";
import Input from "../../Layout/Simple/Input";
// Redux
import { actions } from "@/redux/store";
import { useDispatch } from "react-redux";
// Other
import Avatar from "react-avatar";
// Framer motion
import { motion } from "framer-motion";
// Animation
import { popInVariant1, animationOptions } from "@/lib/animations";

// TODO ---> Connect component to firestore and setup search functionality
// TODO ---> Cleanup code

interface SearchItemProps {
    type: 'tag' | 'user' | 'post',
    text: string,
    icon: 'search' | 'nav',
    onClick?: () => void
}

const SearchTab = () => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <motion.div 
        className="searchTab tab" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        >
            <div className="header">
                <Input size="small" text="Input text here" type="text" icon={<FiSearch size={20} />} border="colored" iconSide="left" />
                <Button type="ghost" size="small" text="Close" icon={<FiX size={16} />} execute={() => { dispatch(actions.dropdownActions.flip('search')) }} />
            </div>
            <ul className="searchOptions">
                <SearchItem type="tag" icon="search" text="Minions" onClick={() => { dispatch(actions.feedActions.windowChange('searchHeader'));dispatch(actions.dropdownActions.flip('')) }} />
                <hr />
                <SearchItem type="tag" icon="nav" text="Search 'Minions' in tags'" />
                <hr />
                <SearchItem type="user" icon="search" text="Name example" onClick={() => { dispatch(actions.feedActions.windowChange('userSearch'));dispatch(actions.dropdownActions.flip('')) }} />
                <hr />
                <SearchItem type="post" icon="nav" text="Search 'Post content' in posts" onClick={() => { dispatch(actions.feedActions.windowChange('postSearch'));dispatch(actions.dropdownActions.flip('')) }} />
                <hr />
            </ul>
        </motion.div>
    );
}

const SearchItem = ({ type, text, icon, onClick } : SearchItemProps) => {
    return (
        <li onClick={onClick} >
            <div className="leftInfo">
                {type == 'post' ?
                <FiGrid size={24} /> :
                type == 'tag' ?
                <FiHash size={24} /> :
                <Avatar size="24" round />
                }
                <p className="p2" > {text} </p>
            </div>
            {icon == 'nav' ?
            <FiCompass size={24} /> : <FiSearch size={24} />
            }
        </li>
    )
}

const SearchSection = () => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <motion.div
        className="searchTab section"
        initial="hidden"
        animate="visible"
        variants={popInVariant1}
        transition={animationOptions}>
            <div className="header">
                <Input size="small" text="Input text here" type="text" icon={<FiSearch size={20} />} border="colored" iconSide="left" />
                <Button type="ghost" size="small" text="Close" icon={<FiX size={16} />} execute={() => { dispatch(actions.modalActions.turnOff( )) }} />
            </div>
            <ul className="searchOptions">
                <SearchItem type="tag" icon="search" text="Minions" onClick={() => { dispatch(actions.feedActions.windowChange('searchHeader'));dispatch(actions.dropdownActions.flip(''));dispatch(actions.modalActions.turnOff()) }} />
                <hr />
                <SearchItem type="tag" icon="nav" text="Search 'Minions' in tags'" />
                <hr />
                <SearchItem type="user" icon="search" text="Name example" onClick={() => { dispatch(actions.feedActions.windowChange('userSearch'));dispatch(actions.dropdownActions.flip(''));dispatch(actions.modalActions.turnOff()) }} />
                <hr />
                <SearchItem type="post" icon="nav" text="Search 'Post content' in posts" onClick={() => { dispatch(actions.feedActions.windowChange('postSearch'));dispatch(actions.dropdownActions.flip(''));dispatch(actions.modalActions.turnOff()) }} />
                <hr />
            </ul>
        </motion.div>
    )
}

const SearchHeader = ({ type, checkMin }: { type: 'tags' | 'users' | 'posts', checkMin: boolean; }) => {
    // Dispatch
    const dispatch = useDispatch()

    return (
        <div className="searchHeader">
            <div className="searchInfo">
                <h4 className='semibold' > {!checkMin ? 'Search results : ' : ''}“Mini” </h4>
                <div>
                    {type == 'tags' ? <FiHash size={24} /> : type == 'users' ? <FiUser size={24} /> : <FiGrid size={24} />}
                    <h6 className='semibold' > Tags </h6>
                </div>
            </div>
            <button onClick={() => { dispatch(actions.feedActions.windowChange('default')) }} >
                <FiX size={24} />
            </button>
        </div>
    );
}

const TagBlock = ({ checkMin } : { checkMin: boolean }) => {
    // useState
    const [toggle, setToggle] = useState(false)

    return (
        <div className="tagBlock searchBlock" >
            <div>
                <FiHash size={24} />
                <h5 className="semibold" > Minion </h5>
            </div>
            <div>
                <div className="block">
                    <p className="p3 semibold" > 3000 </p>
                    <p className="caption" > Subscribers </p>
                </div>
                <div className="block">
                    <p className="p3 semibold" > 3000 </p>
                    <p className="caption" > Posts </p>
                </div>
                {!checkMin ?
                    toggle ?
                    <Button type="primary" text="Unsubscribe" icon={<FiUserCheck size={16} />} size="small" execute={() => { setToggle(false) }} animation /> :
                    <Button type="ghost" text="Subscribe" icon={<FiUserPlus size={16} />} size="small" execute={() => { setToggle(true) }} animation /> : ''
                }
            </div>
        </div>
    )
}

const UserBlock = ({ checkMin } : { checkMin: boolean }) => {
    // useState
    const [toggle, setToggle] = useState(false)

    return (
        <div className="userBlock searchBlock">
            <div>
                <Avatar size='40' round />
                <div>
                    <h5 className="semibold" > Minion </h5>
                    <p className="p1" > @username </p>
                </div>
            </div>
            <div>
                <div className="block">
                    <p className="p3 semibold" > 3000 </p>
                    <p className="caption" > Follows </p>
                </div>
                <div className="block">
                    <p className="p3 semibold" > 3000 </p>
                    <p className="caption" > Followers </p>
                </div>
                {!checkMin ?
                <div className="block">
                    <p className="p3 semibold" > 3000 </p>
                    <p className="caption" > Posts </p>
                </div> : ''
                }
                {!checkMin ? toggle ?
                    <Button type="primary" text="Unfollow" icon={<FiUserCheck size={16} />} size="small" execute={() => { setToggle(false) }} animation /> :
                    <Button type="ghost" text="Follow" icon={<FiUserPlus size={16} />} size="small" execute={() => { setToggle(true) }} animation /> : ''
                }
            </div>
        </div>
    )
}



export { SearchSection, SearchTab, SearchHeader, TagBlock, UserBlock };