## ToDoList

### 计划功能

- [x] ​    登录
- [x] ​    城市经纬度查询
- [x] ​    城市ID、国家代码查询
- [x] ​    城市的天气查询
- [x] ​    收藏管理
- [x] ​    城市入库
- [ ] ​    后台管理（待实现）
  - [ ] 管理入库城市列表
  - [ ] 管理用户
  - [ ] 管理用户收藏城市

### 近期目标

- [ ]    实现登录功能
  - [ ] 实现右上角显示用户名
- [x] ​    实现经纬度查询功能
- [x]    实现天气查询功能（实现）
- [x]    实现添加/显示/删除收藏功能（实现）
- [x] ​    加入NG-Zorro UI库（待实现）
- [x]    输入框（实现）
- [x] ​    按钮(实现)
- [x] ​    卡片（实现了收藏列表）
- [x] 6.引入全局消息提示组件
- [ ] 7.规范化设计登录界面

### 2024/04/30

- [x] ​    实现添加/删除/查看收藏城市
- [x] ​    引入全局提示组件
- [x] ​    降低组件耦合度

### 2024/04/18

- [x] ​    实现了登录、显示用户名
- [x] ​	引入NG-Zorro UI库

### 2024/04/19

- [x] ​    实现经纬度功能服务注入
- [ ] ​    实现天气查询服务注入

### 远期目标

- ​    1.设计Auth服务进行鉴权
- ​    2.设计管理员后台
- ​    3.设计BI大屏（bushi，这也太难了吧）
- ​    4.代码开源
- ​    5.录制实战视频进行知识输出（输入=>处理=>输出）
- ​    6.暂时没了

### 部署启动

```shell
git clone xxx

#安装项目依赖
npm install

#启动项目
ng serve
```


### 项目技术栈

- ​    前端：Angular 15 + NG-Zorro UI
- ​    后端：C# + ASP.NET + EF Core ORM
- ​    数据库：Postgresql

### 天气API

来自：https://open-meteo.com

传入：cityName

URL：https://geocoding-api.open-meteo.com/v1/search?name={cityName}

输出：

```json
{
  "id": 2038180,
  "name": "Changchun",
  "latitude": 43.88,
  "longitude": 125.32278,
  "elevation": 206,
  "feature_code": "PPLA",
  "country_code": "CN",
  "admin1_id": 2036500,
  "admin2_id": 2038176,
  "timezone": "Asia/Shanghai",
  "population": 4193073,
  "country_id": 1814991,
  "country": "China",
  "admin1": "Jilin",
  "admin2": "Changchun Shi"
}
```

传入：经纬度

API：https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m

返回：

```json
{
  "latitude": 43.9,
  "longitude": 125.3125,
  "generationtime_ms": 0.12099742889404297,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 212,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "temperature_2m": "°C",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "2024-04-30T17:00",
    "interval": 900,
    "temperature_2m": 8.2,
    "wind_speed_10m": 6.1
  }
    ...
}
```

