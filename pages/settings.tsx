// React
import { useEffect } from "react";
// Components
import SettingsNavbar from "@/components/Pages/Settings/SettingsNavbar";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "@/redux/store";
import SettingsFrame from "@/components/Pages/Settings/SettingsFrame";

const Settings = ({ props }: any) => {

  const dispatch = useDispatch()

  const settingsNavInfo : any = useSelector((state: RootState) => state.settingsNav)

  useEffect(() => {
    dispatch(actions.settingsNavActions.setWindow('Profile'))
    dispatch(actions.navbarActions.changeNavbarState('settings'))
  }, [])


  return (
    <>
      <SettingsNavbar selectedItem={settingsNavInfo.window} />
      <SettingsFrame selectedFrame={settingsNavInfo.window} />
    </>
  );
}

export default Settings;