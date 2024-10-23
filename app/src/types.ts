import { Feature, Map } from "ol";
import { Geometry } from "ol/geom";
import { VectorSourceEvent } from "ol/source/Vector";
import { FormEvent } from "react";
import { CheckboxProps } from "semantic-ui-react";

export type InitalizeMapProps = {
  extent: Array<number>;
};

export type PolygonGeometry = {
  type: string,
  coordinates:  Array<Array<Array<Array<number>>>>
};

export type useStatesPolygonRenderProps = {
  olMap: Map | undefined,
  isVisible?: boolean,
  isDynamicOpacityEnabled?: boolean,
  isHighlightingEnabled?: boolean,
  onFeaturesLoad: () => void,
  featuresLoaded: boolean,
};

export type useStatesTextRenderProps = {
  olMap: Map | undefined,
  featuresLoaded: boolean,
};

export type UseMapInteractionsProps = {
  olMap: Map | undefined,
  isHighlightingEnabled?: boolean
};

export type CreateVectorLayerUsingGeoJsonProps = {
  geoJsonName: string,
  onFeaturesLoadEnd?: ((event: VectorSourceEvent<Feature<Geometry>>) => unknown) | undefined
};

export type SettingsHeaderProps = {
  onClose: () => void
};

export type SettingsToggleOptionProps = {
  label: string,
  checked: boolean,
  onChange: (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => void
};