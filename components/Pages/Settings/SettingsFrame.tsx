
// Components
import Input from "@/components/Layout/Simple/Input";
// Types
import { SettingsFrameProps } from "./SettingsPageInterfaces";

const SettingsFrame = ({ selectedFrame }: SettingsFrameProps) => {
  return (
    <div className="settings--frame">

    </div>
  );
}

const ProfileFrame = () => {
    return (
        <>
            <div className="settings--frame__header">
                <h5 className="semibold" > Profile </h5>
                <hr />
            </div>
            <div className="settings--frame__content">
                <div className="settings--frame__input">
                    <p className="p2" > Name </p>
                    <Input size="large" text="Type your new name here..." iconSide="right" type="text"  />
                </div>
            </div>
        </>
    )
}

export default SettingsFrame;