import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { useEffect, useRef, useState } from "react";
import { defaults } from 'ol/control/defaults';
import { Extent } from "ol/extent";
import { EXTENT_INDIA } from "../utils/constants";
import { converToMercator } from "../utils/mapUtils";
import { InitalizeMapProps } from "../types";

const useOlMap = () => {

    const [olMap, setOlMap] = useState<Map>();
    const mapRef = useRef();

    useEffect(() => {
        const extentMercator = [ ...converToMercator([EXTENT_INDIA[0], EXTENT_INDIA[1]]), ...converToMercator([EXTENT_INDIA[2], EXTENT_INDIA[3]])];
        initializeMap({ extent: extentMercator });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initializeMap = ({ extent }: InitalizeMapProps) => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        attributions: ['© <a href="https://openlayers.org" target="_blank" rel="noopener noreferrer">OpenLayers</a> | © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'], 
                        attributionsCollapsible: false,
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }),
                    properties: {
                        isTileLayer: true
                    },
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
                extent,
                enableRotation: false,
                maxZoom: 24,
                minZoom: 5,
            }),
            controls: defaults({
                zoom: false,
                attributionOptions: {
                    className: "ol-attribution mapAttributions"
                }
            })
        });

        setOlMap(map);
    };

    const getCurrentExtent = () => {

        let extent: Extent | undefined = undefined;
        
        if (olMap) {
            extent = olMap.getView().calculateExtent();
        }

        return extent;
    };

    const updateTileLayerVisibility = (isVisible: boolean) => {
        if (olMap) {
            // get the currently applied tile layer
            const layers = olMap.getAllLayers();
            const tileLayer = layers.find((layer) => layer.get("isTileLayer"));

            if (tileLayer && tileLayer?.isVisible() !== isVisible) {
                tileLayer.setVisible(isVisible);
            }
        } 
    };

    return {
        mapRef,
        olMap,
        getCurrentExtent,
        updateTileLayerVisibility,
    };
};

export default useOlMap;