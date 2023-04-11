<h1 align="center">GeoJSON TypeScript 支持</h1>
<p align="center">易用 & 完整</p>

## :sparkles: 特性

- 📦 开箱即用的 ts 类型支持，GeoJSON 创建函数
- 📐 遵循直觉的、简约的 Api 设计
- 🔨 完整的 TypeScript 支持，更好的体验

## 示例

1. 创建几何对象
```ts
const pointGeometry = point<{ id: string }>([120.4737, 31.2304], {
  id: "1",
});
const featureGeoJSON = feature<Point>(pointGeometry);
```

2. 表示一个点和多个点的 `FeatureCollection` 集合：
```ts
type PointType = FeatureCollection<Point | MultiPoint, GeoJsonProperties<T>>;
```
