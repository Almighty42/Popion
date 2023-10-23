// Components
import { Button } from "@/components/Layout/Simple/Buttons";
// Icons
import { FiGitBranch, FiKey, FiLock, FiSlash, FiVolumeX } from "react-icons/fi";

const PrivacyFrame = () => {

  return (
    <>
      <div className="settings--frame__header">
        <h5 className="semibold" > Privacy </h5>
        <hr />
      </div>
      <div className="settings--frame__content">
        <Button 
        type="ghost" 
        icon={<FiLock size={16} />} 
        size="regular" 
        text="Switch to a private account" 
        border="border-hidden" />
        <Button 
        type="ghost" 
        icon={<FiVolumeX size={16} />} 
        size="regular" 
        text="Manage muted accounts" 
        border="border-hidden" />
        <Button 
        type="ghost" 
        icon={<FiSlash size={16} />} 
        size="regular" 
        text="Manage blocked accounts" 
        border="border-hidden"
        color="red"/>
        <Button 
        type="ghost" 
        icon={<FiKey size={16} />} 
        size="regular" 
        text="Change password" 
        border="border-hidden" />
        <Button 
        type="ghost" 
        icon={<FiGitBranch size={16} />} 
        size="regular" 
        text="Setup two-factor authentication ( 2FA )" 
        border="border-hidden" />
      </div>
    </>
  );
}

export default PrivacyFrame;