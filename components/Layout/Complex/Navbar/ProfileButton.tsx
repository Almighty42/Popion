// Redux
import { useDispatch } from "react-redux";
import { ButtonsProps } from "./NavbarInterface";
// Icons
import { FiChevronDown } from "react-icons/fi";
// Types
import { actions } from "@/redux/store";
// Other
import Avatar from "react-avatar";
import { motion } from 'framer-motion';

const ProfileButton = ({ ButtonProps: { dropdownInfo, isToggledWindow, userInfo } }: { ButtonProps: ButtonsProps }) => {
    const dispatch = useDispatch()

    return (
        <button className='navbar__right__profilebutton'
            onClick={() => {
                if (dropdownInfo.window == 'profile' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('profile'));
                else dispatch(actions.dropdownActions.windowChange('profile'))
            }} >
            <Avatar size='32' round />
            <p className='p1 semibold' > {userInfo?.name} </p>
            <motion.div
                className="icon-container"
                initial={{ rotate: 0 }}
                animate={{ rotate: isToggledWindow('profile') ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <FiChevronDown size={20} />
            </motion.div>
        </button>
    )
}

export default ProfileButton