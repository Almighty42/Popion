// Components
import { Button } from "@/components/base/Buttons";
// React
import { useState } from "react";
// Icons
import { FiAtSign, FiGrid, FiHeart, FiImage, FiMoreVertical, FiSend, FiTag, FiUserPlus, FiUserX } from "react-icons/fi";
// Other
import Avatar from "react-avatar";
import Post from "@/components/base/Layout/Post";

const Profile = () => {
    const [toggle, setToggle] = useState(true)

    return (
        <div className="profile" >
            <img className="banner" src="./Banner.png" />
            <div className="profileFrame">
                <div className="profileInfo">
                    <div className="profileDetails">
                        <Avatar size="96" round />
                        <div className="name">
                            <h4 className="semibold" > Name </h4>
                            <p className="p1" > @username </p>
                        </div>
                        <p className="p1" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className="profileFollowSection" >
                        <div className="profileFollow">
                            <p className="p3" > 1,103 </p>
                            <p className="p1" > Following </p>
                        </div>
                        <div className="profileFollow">
                            <p className="p3" > 1,103 </p>
                            <p className="p1" > Followers </p>
                        </div>
                    </div>
                </div>
                <div className="profileActions">
                    <div className="profileNavbar" >
                        <div>
                            <ProfileNavbarItem type="Posts" selected="selected" />
                            <ProfileNavbarItem type="Mentions" />
                            <ProfileNavbarItem type="Likes" />
                            <ProfileNavbarItem type="Images" />
                        </div>
                        <div>
                            {toggle ?
                                <Button type="ghost" text="Follow" icon={<FiUserPlus size={16} />} size="small" execute={() => { setToggle(false) }} animation /> :
                                <Button type="primary" text="Unfollow" icon={<FiUserX size={16} />} size="small" execute={() => { setToggle(true) }} animation />
                            }
                            <Button type="primary" text="Send message" icon={<FiSend size={16} />} size="small" animation />
                            <button className="more" >
                                <FiMoreVertical size={24} />
                            </button>
                        </div>
                    </div>
                    <Post />
                </div>
            </div>
        </div>
    );
}

const ProfileNavbarItem = ({ type, selected = '' }: { type: 'Posts' | 'Mentions' | 'Likes' | 'Images', selected?: 'selected' | '' }) => {
    return (
        <button className={'profileNavbarItem ' + selected}>
            {type == 'Posts' ? <FiGrid size={20} /> : type == 'Mentions' ? <FiAtSign size={20} /> : type == 'Likes' ? <FiHeart size={20} /> : <FiImage size={20} />}
            <p className="p2" > {type} </p>
        </button>
    )
}

export default Profile;