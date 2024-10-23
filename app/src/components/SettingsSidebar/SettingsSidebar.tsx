import { useState } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import SettingsHeader from "./SettingsHeader/SettingsHeader";

import "./settingsSidebar.css";
import SettingsOptions from "./SettingsOptions/SettingsOptions";

const SettingsSidebar = () => {
  const [open, setOpen] = useState(false);

  const renderSettingsOptions = () => {
    return (
      <div className="settingsContainer">
        <SettingsHeader onClose={() => setOpen((prev) => !prev)} />
        <Divider />
        <SettingsOptions />
      </div>
    );
  };

  return (
    <>
      {open ? (
        renderSettingsOptions()
      ) : (
        <Button
          className="settingsBtn"
          color="blue"
          size="big"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon className="settingIcon" name="settings" />
          Settings
        </Button>
      )}
    </>
  );
};

export default SettingsSidebar;


