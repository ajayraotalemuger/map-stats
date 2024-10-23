import { Checkbox } from "semantic-ui-react";
import { SettingsToggleOptionProps } from "../../../../types";

import "./settingsToggleOption.css";

const SettingsToggleOption = ({
    label,
    checked,
    onChange,
}: SettingsToggleOptionProps) => {
    return (
        <div className="settingToggleOptionContainer">
            <p>{label}</p>
            <Checkbox 
                toggle 
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};

export default SettingsToggleOption;