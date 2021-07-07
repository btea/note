[省市区县多级联动下钻](https://gallery.echartsjs.com/editor.html?c=xbxUJPSiG9)  
[各区域绘制地图数据json获取](https://hxkj.vip/demo/echartsMap/)  
[阿里云地图数据获取](http://datav.aliyun.com/tools/atlas/#&lat=35.02999636902566&lng=127.57324218750001&zoom=3)  

## 数据类型说明  

### 基本结构  
```json5
{ // 可以包括点线面, 一个大的集合
  "type": "FeatureCollection", // 定义这个是个geojson文件, 这里还可以是其他值下面会说
  "features": [] // 这里放要绘制的数据
}
```

### 描述一个点（Feature）  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",  // 表示这个对象是一个要素
      "properties": {}, // 这里放样式, 后面会专门说
      "geometry": { // 这里面放具体的数据
        "type": "Point",  // 专指画点
        "coordinates": [105.380859375, 31.57853542647338] // 默认是经度与纬度, 三维的话就是xyz三个值, 当然这里也不一定是经纬度(不同的坐标体系)中会讲为什么
      }
    },
  ]
}
```

### 描述多个点（FeatureCollection）  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "MultiPoint", // 多点, 也就是连续画多个同样的点
        "coordinates": [[105.380859375, 31.57853542647338],
        [105.580859375, 31.52853542647338]
        ]
      }
    },
  ]
}
```

### 描述一条线（LineString）  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString", // 这里所有的点会连接在一起形成线
        "coordinates": [[105.6005859375, 30.65681556429287],
        [107.95166015624999, 31.98944183792288],
        [109.3798828125, 30.031055426540206],
        [107.7978515625, 29.935895213372444]]
      }
    },
  ]
}
```

### 描述多条线
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "MultiLineString",
        "coordinates":
          [
            [
              [105.6005859375, 30.65681556429287],
              [107.95166015624999, 31.98944183792288],
              [109.3798828125, 30.031055426540206],
              [107.7978515625, 29.935895213372444]
            ],
            [
              [109.3798828125, 30.031055426540206],
              [107.1978515625, 31.235895213372444]
            ]
          ]
      }
    },
  ]
}
```

### 描述一个面(Polygon, 也叫多边形)  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon", // 注意这里是三维数组
        "coordinates": [
          [
            [106.10595703125, 33.33970700424026],
            [106.32568359375, 32.41706632846282],
            [108.03955078125, 32.2313896627376],
            [108.25927734375, 33.15594830078649],
            [106.10595703125, 33.33970700424026]
          ]
        ]
      }
    },
  ]
}
```
### 一个面里面有多个面(Polygon)  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -39.7265625,
              -3.162455530237848
            ],
            [
              127.96875,
              -3.162455530237848
            ],
            [
              127.96875,
              74.1160468394894
            ],
            [
              -39.7265625,
              74.1160468394894
            ],
            [
              -39.7265625,
              -3.162455530237848
            ]
          ],
          [
            [
              -22.5,
              15.961329081596647
            ],
            [
              110.74218749999999,
              15.961329081596647
            ],
            [
              110.74218749999999,
              70.8446726342528
            ],
            [
              -22.5,
              70.8446726342528
            ],
            [
              -22.5,
              15.961329081596647
            ]
          ]
        ]
      }
    }
  ]
}
```

### 描述多个面(MultiPolygon)  
```json5
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
          [
            [
              -39.7265625,
              -3.162455530237848
            ],
            [
              127.96875,
              -3.162455530237848
            ],
            [
              127.96875,
              74.1160468394894
            ],
            [
              -39.7265625,
              74.1160468394894
            ],
            [
              -39.7265625,
              -3.162455530237848
            ]
          ]
        ],
        [
          [
            [
              -22.5,
              15.961329081596647
            ],
            [
              110.74218749999999,
              15.961329081596647
            ],
            [
              110.74218749999999,
              70.8446726342528
            ],
            [
              -22.5,
              70.8446726342528
            ],
            [
              -22.5,
              15.961329081596647
            ]
          ]
        ]
        ]
      }
    }
  ]
}
```

### 描述一个组(geometries)  
```json5
{
  "type": "FeatureCollection",
  "features": [
    { // 可以包括点线面, 一个独立的集合
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [108.62, 31.02819]
        }, {
          "type": "LineString",
          "coordinates": [[108.896484375, 30.1071178870],
          [108.2184375, 30.91717870],
          [109.5184375, 31.2175780]]
        }
      ]
    }
  ]
 }
```

### 不同的样式(properties)  
```json5
{
  "type": "FeatureCollection",
  "features": [
     {
      "type": "Feature",
      "properties": { // 专门放属性
        "stroke": "#fa9661", // 外边颜色
        "stroke-width": 4.1, // 外边宽
        "stroke-opacity": 0.7, // 外边透明度
        "fill": "#9e290c",  // 填充色
        "fill-opacity": 0.7 // 填充色透明度
      },
      "geometry": {
        "type": "Point",  // 画点
        "coordinates": [105.380859375, 31.57853542647338]
      }
    },
  ]
}
```

参考：[揭开“前端绘制地图的神秘面纱”](https://mp.weixin.qq.com/s/nLmHPy9zKUPcP7bcMD_zdg)  

