import { Header, Icon } from "semantic-ui-react";
import { SettingsHeaderProps } from "../../../types";

import "./settingsHeader.css";

const SettingsHeader = ({ onClose }: SettingsHeaderProps) => {
  return (
    <div className="settingsHeaderContainer">
      <div className="settingsHeaderText">
        <Icon className="settingIcon" name="settings" />
        <Header as="h2">Settings</Header>
      </div>
      <div className="settingsCloseBtnContainer" onClick={onClose}>
        <Icon name="close" size="large" />
      </div>
    </div>
  );
};

export default SettingsHeader;
