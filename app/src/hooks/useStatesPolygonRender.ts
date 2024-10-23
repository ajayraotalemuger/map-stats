import { useEffect, useRef, useState } from "react";
import { 
    createStaticStyles,
    createDynamicStyles, 
    createVectorLayerUsingGeoJson, 
    generateRandomColors, 
    createStyle
} from "../utils/mapUtils";
import VectorLayer from "ol/layer/Vector";
import Feature, { FeatureLike } from "ol/Feature";
import { EventsKey } from "ol/events";
import { Pixel } from "ol/pixel";
import { useStatesPolygonRenderProps } from "../types";

const useStatesPolygonRender = ({ 
    olMap, 
    isVisible = true,
    isDynamicOpacityEnabled = true,
    isHighlightingEnabled = true,
    onFeaturesLoad,
    featuresLoaded
}: useStatesPolygonRenderProps ) => {

    const [statesVectorLayer, setStatesVectorLayer] = useState<VectorLayer<Feature> | undefined>();

    // ref to keep track of feature currently getting highlighted
    const stateFeatureRef = useRef<Feature | FeatureLike>();

    // ref to keep track of function instance currently attached to pointer move event listener
    const listenerKeyRef = useRef<EventsKey>();

    // display layer based on isVisible flag
    useEffect(() => {
        if (statesVectorLayer) {
            statesVectorLayer.setVisible(isVisible);
        }
    }, [statesVectorLayer, isVisible]);

    // create vector layers for state polygons and apply them on map
    useEffect(() => {

        if (olMap) {

            const vectorLayer = createVectorLayerUsingGeoJson({
                geoJsonName: "indianStates",
                onFeaturesLoadEnd: () => onFeaturesLoad()
            });

            if (vectorLayer) {
                olMap.addLayer(vectorLayer);
                setStatesVectorLayer(vectorLayer);
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [olMap]);

    // set randomly generated color to each of the state polygon feature
    useEffect(() => {
        
        if (statesVectorLayer && featuresLoaded) {
            statesVectorLayer.getSource()?.forEachFeature((feature) => {
                const color = (generateRandomColors(1))[0];
                feature.set("color", color);
            });
        }

    }, [statesVectorLayer, featuresLoaded]);

    // enable or disable fade in/fade out effect of state polygon features in map
    useEffect(() => {
        if (statesVectorLayer && featuresLoaded) {
            statesVectorLayer.getSource()?.forEachFeature((feature) => {
                const color = feature.get("color");

                if (isDynamicOpacityEnabled) {
                    feature.setStyle(createDynamicStyles(color));
                } else {
                    feature.setStyle(createStaticStyles(color));
                }
            });
        }

    }, [isDynamicOpacityEnabled, statesVectorLayer, featuresLoaded]);

    // attach pointer move event on map to highlight state polygons when hovered over it
    useEffect(() => {
        if (olMap) {

            const handlePointerMove = (event: { pixel: Pixel; }) => {

                olMap.forEachFeatureAtPixel(event.pixel, (feature) => {

                    // reset the style function in the previoulsy highlighted state feature
                    if (stateFeatureRef.current) {
                        highlightStateFeature(stateFeatureRef.current, false, isDynamicOpacityEnabled);
                    }

                    highlightStateFeature(feature, true, isDynamicOpacityEnabled);
                    stateFeatureRef.current = feature;
                    
                    return true;
                }, 
                {
                    layerFilter: (layer) => !!layer.get("isStateFeatureLayer")
                });

                // reset highlight on the last hovered state feature before moving cursor away from all the state features
                const hasFeatures = olMap.hasFeatureAtPixel(event.pixel, {
                    layerFilter: (layer) => !!layer.get("isStateFeatureLayer")
                });

                if (!hasFeatures && stateFeatureRef.current) {
                    highlightStateFeature(stateFeatureRef.current, false, isDynamicOpacityEnabled);
                    stateFeatureRef.current = undefined;
                }
            }

            // unlisten to the previously added event listener
            if (listenerKeyRef.current?.listener) {
                olMap.un("pointermove", listenerKeyRef.current?.listener);
            }

            if (isHighlightingEnabled) {
                listenerKeyRef.current = olMap.on("pointermove", handlePointerMove);
            } else if (stateFeatureRef.current) {
                // de highlight previously highlighted feature if flag is switched off
                highlightStateFeature(stateFeatureRef.current, false, isDynamicOpacityEnabled);
                stateFeatureRef.current = undefined;
            }

        }
    }, [olMap, isHighlightingEnabled, isDynamicOpacityEnabled]);

    const highlightStateFeature = (feature: Feature | FeatureLike, highlight: boolean, isDynamic: boolean) => {
        
        if (highlight) {
            // update the feature's styling to highlighting form
            const color = feature.get("color");
            const style = createStyle(color + "CC", color + "FF", 3);
            feature.setStyle(style);
        }
        else {
            // update back the feature's style function to static or dynamic styling based on isDynamic flag
            const color = feature.get("color");
            if (isDynamic) {
                feature.setStyle(createDynamicStyles(color));
            } else {
                feature.setStyle(createStaticStyles(color));
            }
        }
    };
};

export default useStatesPolygonRender;