// Components
import { Button } from "@/components/Layout/Simple/Buttons";
import ProfileNavbarItem from "./ProfileNavbarItem";
// Icons
import { FiMoreVertical, FiSend, FiUserPlus, FiUserX } from "react-icons/fi";
import { ProfileNavbarProps } from "./UserInterface";

const ProfileNavbar = ({ 
    navbarState,
    setNavbarState,
    userInfo,
    ownerProfileCheck,
    isBlockedUser,
    toggle,
    useFollowUser,
    useFollowUserProps1,
    useFollowUserProps2,
    setUserDropdownState,
    userDropdownState
 }: ProfileNavbarProps) => {
    return (
        <div className="profile__actions__navbar" >
            <div>
                <ProfileNavbarItem navbarState={navbarState} type="Posts" execute={() => { setNavbarState('Posts') }} />
                {/* <ProfileNavbarItem navbarState={navbarState} type="Mentions" execute={() => { setNavbarState('Mentions') }} /> */}
                <ProfileNavbarItem navbarState={navbarState} type="Likes" execute={() => { setNavbarState('Likes') }} />
                <ProfileNavbarItem navbarState={navbarState} type="Images" execute={() => { setNavbarState('Images') }} />
                <ProfileNavbarItem navbarState={navbarState} type="Saved posts" execute={() => { setNavbarState('Saved posts') }} />
                {/* <ProfileNavbarItem navbarState={navbarState} type="Tags" execute={() => { setNavbarState('Tags') }} /> */}
            </div>
            <div>
                {userInfo.loggedIn &&
                    <>
                        {!ownerProfileCheck &&
                            <>
                                {isBlockedUser ?
                                    <>
                                        <Button
                                            type="ghost"
                                            text="User blocked you"
                                            icon={<FiUserPlus size={16} />}
                                            size="small"
                                            color='disabled'
                                        />
                                    </> :
                                    <>
                                        {!toggle ?
                                            <Button
                                                type="ghost"
                                                text="Follow"
                                                icon={<FiUserPlus size={16} />}
                                                size="small"
                                                execute={() => {
                                                    //@ts-ignore
                                                    useFollowUser(useFollowUserProps1);
                                                }}
                                                animation /> :
                                            <Button
                                                type="primary"
                                                text="Unfollow"
                                                icon={<FiUserX size={16} />}
                                                size="small"
                                                execute={() => {
                                                    //@ts-ignore
                                                    useFollowUser(useFollowUserProps2);
                                                }}
                                                animation />
                                        }
                                        {/* <Button
                                            type="primary"
                                            text="Send message"
                                            icon={<FiSend size={16} />}
                                            size="small"
                                            animation /> */}
                                    </>
                                }
                                <button className="more" onClick={() => { setUserDropdownState(!userDropdownState) }} >
                                    <FiMoreVertical size={24} />
                                </button>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default ProfileNavbar;