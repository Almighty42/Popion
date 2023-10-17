// Icons
import { FiAtSign, FiBookmark, FiGrid, FiHash, FiHeart, FiImage } from "react-icons/fi"
// Types
import { ProfileItemProps } from "./UserInterface"

const ProfileNavbarItem = ({ type, navbarState, execute }: ProfileItemProps) => {
    return (
        <button className={type == navbarState ? 'profileNavbarItem selected' : 'profileNavbarItem'} onClick={() => { execute() }} >
            {type == 'Posts' ? <FiGrid size={20} /> :
                type == 'Mentions' ? <FiAtSign size={20} /> :
                    type == 'Likes' ? <FiHeart size={20} /> :
                        type == 'Images' ? <FiImage size={20} /> :
                            type == 'Saved posts' ? <FiBookmark size={20} /> :
                                <FiHash size={20} />
            }
            <p className="p2" > {type} </p>
        </button>
    )
}

export default ProfileNavbarItem