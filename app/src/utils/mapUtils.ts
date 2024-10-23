import * as turfProjection from "@turf/projection";
import { CreateVectorLayerUsingGeoJsonProps } from "../types";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import tinycolor from "tinycolor2";
import View from "ol/View";
import { ZOOM_FADE_EFFECT_PARAMS } from "./constants";
import GeoJson from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";

const view = new View();

export const converToWgs84 = (coordinates: Array<number>) => turfProjection.toWgs84(coordinates) ;

export const converToMercator = (coordinates: Array<number>) => turfProjection.toMercator(coordinates);

export const createStaticStyles = (color: string) => {
    return createStylesWithOpactiy({
        fillColor: color,
        strokeColor: color,
        fillOpacity: ZOOM_FADE_EFFECT_PARAMS.START_OPACITY,
        strokeOpacity: ZOOM_FADE_EFFECT_PARAMS.START_OPACITY
    });
};

export const createDynamicStyles = (color: string) => {
    
    const styleFunction = (_feature: Feature<Geometry>, resolution: number) => {

        let currentZoomLevel = view?.getZoomForResolution(resolution)?.toFixed(2) || 6;
        currentZoomLevel = +currentZoomLevel;

        let currentOpacity: number;
        
        if (currentZoomLevel < ZOOM_FADE_EFFECT_PARAMS.START_ZOOM) {
            currentOpacity = ZOOM_FADE_EFFECT_PARAMS.START_OPACITY
        }
        else if (currentZoomLevel > ZOOM_FADE_EFFECT_PARAMS.END_ZOOM) {
            currentOpacity = ZOOM_FADE_EFFECT_PARAMS.END_OPACITY
        }
        else {
            currentOpacity = getLinearInterpolatedOpacity(
                +currentZoomLevel,
                ZOOM_FADE_EFFECT_PARAMS.START_ZOOM,
                ZOOM_FADE_EFFECT_PARAMS.START_OPACITY,
                ZOOM_FADE_EFFECT_PARAMS.END_ZOOM,
                ZOOM_FADE_EFFECT_PARAMS.END_OPACITY
            );
        }

        const styleColor = tinycolor(color);
        styleColor.setAlpha(currentOpacity);
       
        const styleColorString = styleColor.toHex8String();

        return createStyle(styleColorString, styleColorString);
    }

    return styleFunction;
};

export const createVectorLayerUsingGeoJson = ({ geoJsonName, onFeaturesLoadEnd }: CreateVectorLayerUsingGeoJsonProps) => {
    const source = new VectorSource({
        url: `/geoJsons/${geoJsonName}`,
        format: new GeoJson()
    });

    const vectorLayer = new VectorLayer({
        source: source
    });

    if (onFeaturesLoadEnd) {
        source.on("featuresloadend", onFeaturesLoadEnd);
    }

    vectorLayer.set("isStateFeatureLayer", true, true);

    return vectorLayer;
}

const HEX_CODES = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

export const generateRandomColors = (count: number) => {

    const generatedColours = [];

    for (let i=0; i < count; i++) {
        
        let colorString = "";

        for (let j=0; j < 6; j++) {
            colorString  = colorString + HEX_CODES[Math.floor(Math.random() * 16)];
        }

        generatedColours.push("#" + colorString);
    }

    return generatedColours;
};

type CreateStylesWithOpactiy = {
    fillColor: string,
    strokeColor: string,
    fillOpacity?: number,
    strokeOpacity?: number,
    strokeWidth?: number
};

export const createStylesWithOpactiy = ({
   fillColor,
   strokeColor,
   fillOpacity = 1,
   strokeOpacity = 1,
   strokeWidth = 1, 
}: CreateStylesWithOpactiy) => {
    const fillColorWithAlpha = tinycolor(fillColor);
    fillColorWithAlpha.setAlpha(fillOpacity);

    const strokeColorWithAlpha = tinycolor(strokeColor);
    strokeColorWithAlpha.setAlpha(strokeOpacity);

    return createStyle(fillColorWithAlpha.toHex8String(), strokeColorWithAlpha.toHex8String(), strokeWidth);
};

export const createStyle = (fillColor: string, strokeColor: string, strokeWidth?: number) => {
    return new Style({
        fill: new Fill({
            color: fillColor
        }),
        stroke: new Stroke({
            color: strokeColor,
            width: strokeWidth || 1
        })
    });
};

const getLinearInterpolatedOpacity = (
    currentZoom: number, 
    startZoom: number, 
    startZoomOpacity: number, 
    endZoom: number, 
    endZoomOpacity: number
) => startZoomOpacity + ((currentZoom - startZoom)*(endZoomOpacity - startZoomOpacity))/(endZoom - startZoom);