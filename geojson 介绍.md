## 简介

`GeoJSON` 是一种使用 `JSON` 来编码各种地理数据结构的格式，是一种轻量级的数据交换格式，可以用来表示几何对象、属性数据、空间参考系统等信息

由两种对象组成：`Geometry`（几何对象）和 `Feature`（空间行状）

- 几何对象用来描述地理空间中的点、线、面等几何形状
- 空间行状用来描述一个有界的实体，包括几何对象和其他属性信息

几何对象类型有：

- 点：`Point`
- 多点：`MultiPoint`
- 线：`LineString`
- 多线：`MultiLineString`
- 面：`Polygon`
- 多面：`MultiPolygon`
- 几何集合：`GeometryCollection`

空间行状类型有：

- 空间行状：`Feature`
- 空间形状集合：`FeatureCollection`

### 举例

几何对象和空间行状可以相互嵌套

```js
const GeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [121.4737, 31.2304] },
      properties: { id: 1 },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [121.4837, 31.2504] },
      properties: { id: 2 },
    },
  ],
};
```

## 空间行状

### FeatureCollection

`FeatureCollection` 是 `Feature` 对象的集合，用来表示一组 `Feature` 对象

由 `type` 和 `features` 两个属性组成：

- `type` 属性的值为 `FeatureCollection`
- `features` 属性的值为 `Feature` 对象的数组

```js
const FeatureCollectionJSON = {
  type: "FeatureCollection",
  features: [feature],
};
```

### Feature

`Feature` 对象用来表示几何对象的属性信息

由 `type`、`geometry` 和 `properties` 三个属性组成：

- `type` 属性的值为 `Feature`，
- `geometry` 属性的值为 `Geometry` 几何对象
- `properties` 属性的值为属性对象（可选）

```js
const FeatureJSON = {
  type: "Feature",
  geometry: { type: "Point", coordinates: [121.4737, 31.2304] },
  properties: { id: 1 },
};
```

## 几何对象

### Point

`Point` 用来表示一个点

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `Point`
- `coordinates` 属性的值为一个数组，数组的第一个元素为经度，第二个元素为纬度

```js
const PointJSON = {
  type: "Point",
  coordinates: [121.4737, 31.2304],
};
```

### MultiPoint

`MultiPoint` 用来表示多个点

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `MultiPoint`
- `coordinates` 属性的值为一个数组，数组的每个元素都是一个点的坐标

```js
const MultiPointJSON = {
  type: "MultiPoint",
  coordinates: [
    [121.4737, 31.2304],
    [121.4837, 31.2504],
  ],
};
```

### LineString

`LineString` 用来表示一条线

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `LineString`
- `coordinates` 属性的值为一个数组，数组的每个元素都是一个点的坐标

```js
const LineStringJSON = {
  type: "LineString",
  coordinates: [
    [121.4737, 31.2304],
    [121.4837, 31.2504],
  ],
};
```

### MultiLineString

`MultiLineString` 用来表示多条线

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `MultiLineString`
- `coordinates` 属性的值为一个数组，数组的每个元素都是一个线的坐标数组

```js
const MultiLineStringJSON = {
  type: "MultiLineString",
  coordinates: [
    [
      [121.4737, 31.2304],
      [121.4837, 31.2504],
    ],
    [
      [121.4727, 31.2314],
      [121.4827, 31.2514],
    ],
  ],
};
```

### Polygon

`Polygon` 用来表示一个面

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `Polygon`
- `coordinates` 属性的值为一个数组，数组的第一个元素为外环的坐标数组，后面的元素为内环的坐标数组

`polygon` 的坐标数组的第一个元素和最后一个元素是相同的，表示闭合

```js
const PolygonJSON = {
  type: "Polygon",
  coordinates: [
    [
      [121.4737, 31.2304],
      [121.4837, 31.2504],
      [121.4937, 31.2304],
      [121.4737, 31.2304],
    ],
    [
      [121.4717, 31.2314],
      [121.4827, 31.2524],
      [121.4937, 31.2334],
      [121.4757, 31.2344],
    ],
  ],
};
```

### MultiPolygon

`MultiPolygon` 用来表示多个面

由 `type` 和 `coordinates` 两个属性组成：

- `type` 属性的值为 `MultiPolygon`
- `coordinates` 属性的值为一个数组，数组的每个元素都是一个面的坐标数组

```js
const MultiPolygonJSON = {
  type: "MultiPolygon",
  coordinates: [
    [
      [
        [121.4737, 31.2304],
        [121.4837, 31.2504],
        [121.4937, 31.2304],
        [121.4737, 31.2304],
      ],
      [
        [121.4737, 31.2304],
        [121.4837, 31.2504],
        [121.4937, 31.2304],
        [121.4737, 31.2304],
      ],
    ],
    [
      [
        [121.4737, 31.2304],
        [121.4837, 31.2504],
        [121.4937, 31.2304],
        [121.4737, 31.2304],
      ],
      [
        [121.4737, 31.2304],
        [121.4837, 31.2504],
        [121.4937, 31.2304],
        [121.4737, 31.2304],
      ],
    ],
  ],
};
```

### GeometryCollection

`GeometryCollection` 用来表示几何对象的集合

由 `type` 和 `geometries` 两个属性组成：

- `type` 属性的值为 `GeometryCollection`
- `geometries` 属性的值为几何对象的数组

```js
const GeometryCollectionJSON = {
  type: "GeometryCollection",
  geometries: [
    { type: "Point", coordinates: [121.4737, 31.2304] },
    {
      type: "LineString",
      coordinates: [
        [121.4737, 31.2304],
        [121.4837, 31.2504],
      ],
    },
  ],
};
```

## 可选属性

这些属性都是 `GeoJSON` 的扩展属性，不是 `GeoJSON` 规范的一部分

- `id` 属性，用来描述 `FeatureCollection` 的唯一标识
- `bbox` 属性，用来描述 `FeatureCollection` 的边界框
  - 四至坐标，一般用来做数据裁剪
  - 这是一组左上角和右下角的坐标，示例：`[minLon, minLat, maxLon, maxLat]`
- `properties` 属性，用来描述 `FeatureCollection` 的属性
- `crs` 属性，用来描述坐标参考系

## 其他

### coordinate

`coordinate` 是一个数组，表示一个点的坐标，数组的长度表示坐标的维度，一般是 `2` 维或 `3` 维

- `2` 维：`[lon, lat]`
- `3` 维：`[lon, lat, height]`

`coordinate` 的第一个元素表示经度，第二个元素表示纬度，第三个元素表示高度

坐标顺序是 `[lon, lat]`，这个是推荐顺序，可由 `crs` 属性指定

`coordinates` 是多维数组：

- 点：`[lon, lat]`
- 线：`[[lon, lat], [lon, lat]]`
- 面：`[[[lon, lat], [lon, lat]]]`
- 多面：`[[[[lon, lat], [lon, lat]]]]`

### 坐标参考系

最常使用的坐标系是 `EPSG:4326` 和 `EPSG:3857`：

- `EPSG:4326` 是 `WGS84`（CGCS2000，大地） 坐标系，是 `GeoJSON` 规范的默认坐标系
- `EPSG:3857` 是 `Web Mercator`（墨卡托） 坐标系，是 `OpenLayers` 的默认坐标系

它们的区别：

- `EPSG:4326` 是经纬度坐标系，`EPSG:3857` 是投影坐标系
- `EPSG:4326` 的坐标范围是 `[-180, -90, 180, 90]`，`EPSG:3857` 的坐标范围是 `[-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]`
- `EPSG:4326` 的坐标单位是度，`EPSG:3857` 的坐标单位是米
- `EPSG:4326` 的坐标原点是 `[0, 0]`，`EPSG:3857` 的坐标原点是 `[-20037508.342789244, -20037508.342789244]`
- `EPSG:4326` 的坐标轴方向是 `[x, y]`，`EPSG:3857` 的坐标轴方向是 `[x, -y]`

### 参考

- [GeoJSON](https://geojson.org/)
- [GeoJSON 格式](https://geojson.org/geojson-spec.html)
- [GeoJSON 格式规范](https://tools.ietf.org/html/rfc7946)
- [EPSG 4326 vs EPSG 3857 (投影，数据集，坐标系)](https://github.com/penouc/blog/issues/1)
- [turf.js](https://github.com/Turfjs/turf)
