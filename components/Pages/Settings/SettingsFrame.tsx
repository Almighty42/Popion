
// Components
import Input from "@/components/Layout/Simple/Input";
// Types
import { SettingsFrameProps } from "./SettingsPageInterfaces";
// Icons
import { FiAtSign, FiCheck, FiGrid, FiHeart, FiImage, FiMail, FiPlus, FiSmile, FiUser, FiX } from "react-icons/fi";
import { Button } from "@/components/Layout/Simple/Buttons";
import ProfileFrame from "./ProfileFrame";
import PrivacyFrame from "./PrivacyFrame";

const SettingsFrame = ({ selectedFrame }: SettingsFrameProps) => {

    return (
        <div className="settings--frame">
            {selectedFrame == "Profile" ?
            <ProfileFrame /> :
            <PrivacyFrame />
            }
        </div>
    );
}

export default SettingsFrame;