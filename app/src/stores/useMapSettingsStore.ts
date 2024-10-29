import { create } from "zustand";

type MapSettingsStore = {
    isStatePolygonVisible: boolean,
    setIsStatesPolygonVisible: (isVisible: boolean) => void,
    
    isStatesPolygonHighlightingEnabled: boolean,
    setIsStatesPolygonHighlightingEnabled: (isEnabled: boolean) => void,

    isBaseMapEnabled: boolean,
    setIsBaseMapEnabled: (isEnabled: boolean) => void,

    isDynamicOpacityEnabled: boolean,
    setIsDynamicOpacityEnabled: (isEnabled: boolean) => void,

    isStateNameTextEnabled: boolean,
    setIsStateNameTextEnabled: (isEnabled: boolean) => void,
};

const useMapSettingsStore = create<MapSettingsStore>((set) => ({
    isStatePolygonVisible: true,
    isStatesPolygonHighlightingEnabled: true,
    isBaseMapEnabled: true,
    isDynamicOpacityEnabled: true,
    isStateNameTextEnabled: true,

    setIsStatesPolygonVisible: (isVisible: boolean) => set(() => ({ isStatePolygonVisible: isVisible })),
    setIsStatesPolygonHighlightingEnabled: (isEnabled: boolean) => set(() => ({ isStatesPolygonHighlightingEnabled: isEnabled })),
    setIsBaseMapEnabled: (isEnabled: boolean) => set(() => ({ isBaseMapEnabled: isEnabled })),
    setIsDynamicOpacityEnabled: (isEnabled: boolean) => set(() => ({ isDynamicOpacityEnabled: isEnabled })),
    setIsStateNameTextEnabled: (isEnabled: boolean) => set(() => ({ isStateNameTextEnabled: isEnabled })),
}));

export default useMapSettingsStore;