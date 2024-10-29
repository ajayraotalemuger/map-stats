import { useEffect, useState } from "react";
import SettingsSidebar from "../components/SettingsSidebar/SettingsSidebar";
import useOlMap from "../hooks/useOlMap";
import useStatesPolygonRender from "../hooks/useStatesPolygonRender";
import useMapSettingsStore from "../stores/useMapSettingsStore";

import "./mapPage.css";
import useStatesTextRender from "../hooks/useStatesTextRender";

const MapPage = () => {

    // flag to keep track of state polygon features load status
    const [featuresLoaded, setFeaturesLoaded] = useState<boolean>(false);

    const { 
        mapRef, 
        olMap,
        updateTileLayerVisibility
    } = useOlMap();
    
    const { 
        isStatePolygonVisible,
        isStatesPolygonHighlightingEnabled,
        isBaseMapEnabled,
        isDynamicOpacityEnabled,
        isStateNameTextEnabled,
     } = useMapSettingsStore();

     // show or hide base tile layer based on isBaseMapEnabled flag
    useEffect(() => {
        updateTileLayerVisibility(isBaseMapEnabled);
    }, [isBaseMapEnabled, updateTileLayerVisibility]);

    useStatesPolygonRender({ 
        olMap, 
        isVisible: isStatePolygonVisible,
        isDynamicOpacityEnabled: isDynamicOpacityEnabled,
        isHighlightingEnabled: isStatesPolygonHighlightingEnabled,
        featuresLoaded,
        onFeaturesLoad: () => setFeaturesLoaded(true)
    });

    useStatesTextRender({
        olMap,
        featuresLoaded,
        enableText: isStateNameTextEnabled
    });

    return (
        <div className="map-container" ref={mapRef}>
            <SettingsSidebar />
        </div>
    );
};

export default MapPage;
