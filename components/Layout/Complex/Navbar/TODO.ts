// TODO -> Components that are going to be implemented in the future inside of Navbar component
/*
const SearchButton = ({ ButtonProps: { dropdownInfo, isMin } }: { ButtonProps: ButtonsProps }) => {
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton'}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('searchBox'))
            } else {
                if (dropdownInfo.window == 'search' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('search'));
                else dispatch(actions.dropdownActions.windowChange('search'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiSearch size={20} /></motion.button>
}

const ChatButton = ({ ButtonProps: { dropdownInfo, isMin, isToggledWindow } }: { ButtonProps: ButtonsProps }) => {
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton ' + isToggledWindow('chats')}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('chats'))
            } else {
                if (dropdownInfo.window == 'chats' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('chats'));
                else dispatch(actions.dropdownActions.windowChange('chats'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiMessageCircle size={20} /></motion.button>
}

const NotificationButton = ({ ButtonProps: { dropdownInfo, isMin, isToggledWindow } }: { ButtonProps: ButtonsProps }) => {
    const dispatch = useDispatch()

    return <motion.button
        className={'dynamicButton ' + isToggledWindow('notifications')}
        onClick={() => {
            if (isMin) {
                dispatch(actions.modalActions.turnOn('notifications'))
            } else {
                if (dropdownInfo.window == 'notifications' || dropdownInfo.window == '') dispatch(actions.dropdownActions.flip('notifications'));
                else dispatch(actions.dropdownActions.windowChange('notifications'));
            }
        }}
        whileTap="pop"
        variants={popVariant2}
    ><FiBell size={20} /></motion.button>
}

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
*/