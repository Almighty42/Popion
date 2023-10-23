// React
import { Dispatch, SetStateAction } from "react";
// Components
import { AuthLogin, AuthRegister } from "@/components/Pages/Auth"
import { NotificationSection } from "../../../Pages/Other/Notifications";
import { ChatBox, ChatsSection } from "../../../Pages/Other/Chats";
import { SearchSection } from "../../../Pages/Other/Search";
import { PopupShare, PopupAddImage, PopupFollowList } from '@/components/Pages/Popups'
// Types
import { UserInfoProps } from "@/utils/interfaces";
// Other
import { Modal } from "react-overlays";
// Styles
import './OtherComps.scss'

interface ModalBlockProps {
    modalInfo: {
        show: boolean,
        window: string
    };
    isMin: boolean,
    userId?: string | undefined,
    userObject? : UserInfoProps | undefined,
    setLoading?: Dispatch<SetStateAction<boolean>>
}

const ModalBlock = ({ modalInfo, isMin, userId, userObject, setLoading }: ModalBlockProps) => {

    return (
        <Modal
            className="modal"
            show={modalInfo.show}
        >
            {modalInfo.window == 'register' ?
                <AuthRegister isMin={isMin} /> :
                modalInfo.window == 'login' ?
                    <AuthLogin isMin={isMin} /> :
                    modalInfo.window == 'notifications' ?
                        <NotificationSection /> :
                        modalInfo.window == 'chats' ?
                            <ChatsSection modalInfo={modalInfo} /> :
                            modalInfo.window == 'chatsBox' ?
                                <ChatBox /> :
                                modalInfo.window == 'searchBox' ?
                                    <SearchSection /> :
                                    modalInfo.window == 'sharePost' ?
                                        <PopupShare /> :
                                        modalInfo.window == 'addImage' ?
                                            <PopupAddImage /> :
                                            modalInfo.window == 'followList' ?
                                                <PopupFollowList userId={userId} userObject={userObject} setLoading={setLoading} /> : <p> Empty </p>
            }
        </Modal>
    );
}

export default ModalBlock;