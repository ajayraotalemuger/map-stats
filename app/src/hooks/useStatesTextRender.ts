import { useEffect } from "react";
import { useStatesTextRenderProps } from "../types";
import { Feature, Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import { Geometry, Point } from "ol/geom";
import { getCenter } from "ol/extent";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import VectorSource from "ol/source/Vector";

const TEXT_STYLE = {
    size: "11px",
    fill: {
        color: "#E61A4C"
    },
    fontName: "Arial, sans-serif",
    font: "bold 11px Arial, sans-serif",
    stroke: {
        color: "#FFFFFF",
        width: 1
    }
};

const useStatesTextRender = ({
    olMap,
    featuresLoaded
}: useStatesTextRenderProps) => {

    useEffect(() => {

        if (olMap && featuresLoaded) {
            // get states polygon vector layer
            const statesVectorLayer = getStatesVectorLayer(olMap);

            if (statesVectorLayer && statesVectorLayer instanceof VectorLayer) {

                const textFeatures: Feature[] = [];

                statesVectorLayer.getSource()?.forEachFeature((feature) => {
                    const textFeature = createTextFeature(feature, feature.get("st_nm"));

                    if (textFeature) {
                        textFeatures.push(textFeature);
                    }
                });

                if (textFeatures.length) {
                    const textSource = new VectorSource({
                        features: textFeatures
                    });

                    const textLayer = new VectorLayer({
                        source: textSource,
                    });

                    textLayer.set("isStatesTextLayer", true);

                    olMap.addLayer(textLayer);
                }
            }
        }

    }, [olMap, featuresLoaded]);

    const getStatesVectorLayer = (olMap: Map) => {

        const allLayers = olMap.getAllLayers();

        const statesVectorLayer = allLayers.find((layer) => layer.get("isStateFeatureLayer"));

        return statesVectorLayer;
    };

    const createTextFeature = (feature: Feature<Geometry>, text: string) => {
       
        const extent = feature.getGeometry()?.getExtent();

        if (extent) {
            const center = getCenter(extent);

            const textPoint = new Point(center);

            const textStyle = new Text({
                font: TEXT_STYLE.font,
                text,
                fill: new Fill(TEXT_STYLE.fill),
                stroke: new Stroke(TEXT_STYLE.stroke),
            });

            const style = new Style({
                text: textStyle,
                geometry: textPoint
            });

            const feature = new Feature({
                geometry: textPoint
            });

            feature.setStyle(style);

            return feature;
        }
    };

};

export default useStatesTextRender;