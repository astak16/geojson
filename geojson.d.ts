type Position = number[];
type BBox2d = [number, number, number, number];
type BBox3d = [number, number, number, number, number, number];
type BBox = BBox2d | BBox3d;

export type Id = string | number;

export type GeoJSON = Geometry | Feature | FeatureCollection;

export type GeoJsonTypes = GeoJSON["type"];

export type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

export type GeoJsonGeometryTypes = Geometry["type"];

export type GeometryObject = Geometry;

export type GeoJsonProperties<T extends { [key: string]: any } = {}> = T | null;

export interface GeoJsonObject {
  type: GeoJsonTypes;
  bbox?: BBox | undefined;
}

export interface Point extends GeoJsonObject {
  type: "Point";
  coordinates: Position;
}

export interface MultiPoint extends GeoJsonObject {
  type: "MultiPoint";
  coordinates: Position[];
}

interface LineString extends GeoJsonObject {
  type: "LineString";
  coordinates: Position[];
}

interface MultiLineString extends GeoJsonObject {
  type: "MultiLineString";
  coordinates: Position[][];
}

interface Polygon extends GeoJsonObject {
  type: "Polygon";
  coordinates: Position[][];
}

interface MultiPolygon extends GeoJsonObject {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

interface GeometryCollection extends GeoJsonObject {
  type: "GeometryCollection";
  geometries: Geometry[];
}

export interface Feature<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties
> extends GeoJsonObject {
  type: "Feature";
  geometry: G;
  id?: string | number | undefined;
  properties: P;
}

export interface FeatureCollection<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties
> extends GeoJsonObject {
  type: "FeatureCollection";
  features: Array<Feature<G, P>>;
}
