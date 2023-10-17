// Redux
import { actions } from "@/redux/store";
import { useDispatch } from "react-redux";
// Types
import { ProfileInfoProps } from "./UserInterface";
// Other
import Avatar from "react-avatar";

const ProfileInfo = ({ userObject, followCount, userId }: ProfileInfoProps) => {

    const dispatch = useDispatch()

    return (
        <div className="profile__info">
            <div className="profile__details">
                <Avatar size="96" round />
                <div className="name">
                    <h4 className="semibold" > {userObject.name} </h4>
                    <p className="p1" > @{userObject.username} </p>
                </div>
                <p className="p1" > {userObject.description} </p>
            </div>
            <div className="profile__follow" >
                <div className="profile__follow__section" onClick={() => { dispatch(actions.modalActions.turnOnPassProps({ window: "followList", userId, type: 'following' })) }}>
                    <p className="p3" > {userObject.followingNum} </p>
                    <p className="p1" > Following </p>
                </div>
                <div className="profile__follow__section" onClick={() => { dispatch(actions.modalActions.turnOnPassProps({ window: "followList", userId, type: 'followers' })) }}>
                    <p className="p3" > {followCount} </p>
                    <p className="p1" > Followers </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;