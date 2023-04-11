import {
  BBox,
  Feature,
  FeatureCollection,
  GeoJsonGeometryTypes,
  GeoJsonProperties,
  Geometry,
  GeometryCollection,
  Id,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  Position,
} from "./geojson";

export function isNumber(num: any): boolean {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}

export function featureCollection<G extends Geometry, P = GeoJsonProperties>(
  features: Array<Feature<G, P>>,
  options: { bbox?: BBox; id?: Id } = {}
): FeatureCollection<G, P> {
  const fc: any = { type: "FeatureCollection" };
  if (options.id) {
    fc.id = options.id;
  }
  if (options.bbox) {
    fc.bbox = options.bbox;
  }
  fc.features = features;
  return fc;
}

export function feature<G extends Geometry, P = GeoJsonProperties>(
  geometry: G | null,
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<G, P> {
  const feat: any = { type: "Feature" };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || {};
  feat.geometry = geometry;
  return feat;
}

export function geometryCollection<P = GeoJsonProperties>(
  geometries: Array<
    Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
  >,
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<GeometryCollection, P> {
  const geometry: GeometryCollection = {
    type: "GeometryCollection",
    geometries,
  };
  return feature(geometry, properties, options);
}

export function geometry(
  type: Omit<GeoJsonGeometryTypes, "GeometryCollection">,
  coordinates: Position | Position[] | Position[][] | Position[][][],
  _options: Record<string, never> = {}
): Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon {
  switch (type) {
    case "Point":
      return point(coordinates as Position).geometry;
    case "LineString":
      return lineString(coordinates as Position[]).geometry;
    case "Polygon":
      return polygon(coordinates as Position[][]).geometry;
    case "MultiPoint":
      return multiPoint(coordinates as Position[]).geometry;
    case "MultiLineString":
      return multiLineString(coordinates as Position[][]).geometry;
    case "MultiPolygon":
      return multiPolygon(coordinates as Position[][][]).geometry;
    default:
      throw new Error(type + " 无效");
  }
}

export function point<P = GeoJsonProperties>(
  coordinates: Position,
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<Point, P> {
  if (!coordinates) {
    throw new Error("坐标不能加载");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("坐标不是数组");
  }
  if (coordinates.length < 2) {
    throw new Error("坐标至少有 2 个数字");
  }
  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
    throw new Error("坐标必须是数字");
  }

  const geometry: Point = {
    type: "Point",
    coordinates,
  };
  return feature(geometry, properties, options);
}

export function points<P = GeoJsonProperties>(
  coordinates: Position[],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): FeatureCollection<Point, P> {
  return featureCollection(
    coordinates.map((coords) => point(coords, properties)),
    options
  );
}

export function multiPoint<P = GeoJsonProperties>(
  coordinates: Position[],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<MultiPoint, P> {
  const geometry: MultiPoint = {
    type: "MultiPoint",
    coordinates,
  };
  return feature(geometry, properties, options);
}

export function lineString<P = GeoJsonProperties>(
  coordinates: Position[],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<LineString, P> {
  if (coordinates.length < 2) {
    throw new Error("坐标必须是 2 个或以上点的数组");
  }
  const geometry: LineString = {
    type: "LineString",
    coordinates,
  };
  return feature(geometry, properties, options);
}

export function lineStrings<P = GeoJsonProperties>(
  coordinates: Position[][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): FeatureCollection<LineString, P> {
  return featureCollection(
    coordinates.map((coords) => lineString(coords, properties)),
    options
  );
}

export function multiLineString<P = GeoJsonProperties>(
  coordinates: Position[][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<MultiLineString, P> {
  const geometry: MultiLineString = {
    type: "MultiLineString",
    coordinates,
  };
  return feature(geometry, properties, options);
}

export function polygon<P = GeoJsonProperties>(
  coordinates: Position[][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<Polygon, P> {
  for (const ring of coordinates) {
    if (ring.length < 4) {
      throw new Error("每一个多边形至少要有 4 个点");
    }

    if (ring[ring.length - 1].length !== ring[0].length) {
      throw new Error("第一个点和最后一个点不相同");
    }

    for (let j = 0; j < ring[ring.length - 1].length; j++) {
      // 检查第一个位置和最后一个位置经纬度是否相同
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error("第一个点和最后一个点不相同");
      }
    }
  }
  const geometry: Polygon = {
    type: "Polygon",
    coordinates,
  };
  return feature(geometry, properties, options);
}

export function polygons<P = GeoJsonProperties>(
  coordinates: Position[][][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): FeatureCollection<Polygon, P> {
  return featureCollection(
    coordinates.map((coords) => polygon(coords, properties)),
    options
  );
}

export function multiPolygon<P = GeoJsonProperties>(
  coordinates: Position[][][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<MultiPolygon, P> {
  const geometry: MultiPolygon = {
    type: "MultiPolygon",
    coordinates,
  };
  return feature(geometry, properties, options);
}
