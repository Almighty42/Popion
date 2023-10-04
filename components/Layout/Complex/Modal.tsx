// Components
import { AuthLogin, AuthRegister } from "@/components/Interface/Auth"
import { NotificationSection } from "../../Interface/Other/Notifications";
import { ChatBox, ChatsSection } from "../../Interface/Other/Chats";
import { SearchSection } from "../../Interface/Other/Search";
import { PopupShare, PopupAddImage, PopupFollowList } from '@/components/Interface/Popups'
// Types
import { UserProps } from "@/lib/types";
// Other
import { Modal } from "react-overlays";
import { Dispatch, SetStateAction } from "react";

interface ModalBlockProps {
    modalInfo: {
        show: boolean,
        window: string
    };
    isMin: boolean,
    userId?: string | undefined,
    userObject? : UserProps | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>
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