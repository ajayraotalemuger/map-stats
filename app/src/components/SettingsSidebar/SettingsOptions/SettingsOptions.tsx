import useMapSettingsStore from "../../../stores/useMapSettingsStore";
import SettingsToggleOption from "./SettingsToggleOption/SettingsToggleOption";

import "./settingsOptions.css";

const SettingsOptions = () => {

    const { 
        isStatePolygonVisible, 
        setIsStatesPolygonVisible,
        isStatesPolygonHighlightingEnabled,
        setIsStatesPolygonHighlightingEnabled,
        isBaseMapEnabled,
        setIsBaseMapEnabled,
        isDynamicOpacityEnabled,
        setIsDynamicOpacityEnabled,
        isStateNameTextEnabled,
        setIsStateNameTextEnabled,
    } = useMapSettingsStore();

    return (
        <div className="settingsOptionsContainer">
            <SettingsToggleOption 
                label="Show Indian States"
                checked={isStatePolygonVisible}
                onChange={(_e, data) => {
                    if (typeof data.checked === "boolean") {
                        setIsStatesPolygonVisible(data.checked)
                    } 
                }}
            />
            <SettingsToggleOption 
                label="Enable Highlighting"
                checked={isStatesPolygonHighlightingEnabled}
                onChange={(_e, data) => {
                    if (typeof data.checked === "boolean") {
                        setIsStatesPolygonHighlightingEnabled(data.checked)
                    } 
                }}
            />
            <SettingsToggleOption 
                label="Show Base Map"
                checked={isBaseMapEnabled}
                onChange={(_e, data) => {
                    if (typeof data.checked === "boolean") {
                        setIsBaseMapEnabled(data.checked)
                    } 
                }}
            />
            <SettingsToggleOption 
                label="Enable Fade Effect"
                checked={isDynamicOpacityEnabled}
                onChange={(_e, data) => {
                    if (typeof data.checked === "boolean") {
                        setIsDynamicOpacityEnabled(data.checked)
                    } 
                }}
            />
            <SettingsToggleOption 
                label="Enable Name Text"
                checked={isStateNameTextEnabled}
                onChange={(_e, data) => {
                    if (typeof data.checked === "boolean") {
                        setIsStateNameTextEnabled(data.checked)
                    } 
                }}
            />
        </div>
    );
};

export default SettingsOptions;
