# 宜昌博物馆 · 数字文博平台

一个把 6 个高质量 GitHub 开源项目“组合”在一起的博物馆网站演示工程。

## 组合来源（6 个项目 → 6 个模块）

| GitHub 参考项目 | Star | 组合进来的能力 | 落点模块 |
|---|---|---|---|
| [Steve245270533/gallery](https://github.com/Steve245270533/gallery) | 777 | 第一人称 3D 数字展厅：WASD 行走、鼠标环视、Raycaster 点击展品、位置音频思路 | `/hall`（`src/three/MuseumHall.ts`） |
| [magcius/noclip.website](https://github.com/magcius/noclip.website) | 4.2k | 自由相机系统：`Shift+1-9` 保存视角、`1-9` 读取视角、`R` 自动环绕、升降/加速 | `/hall` 键盘与视角存档 |
| [wellcomecollection/wellcomecollection.org](https://github.com/wellcomecollection/wellcomecollection.org) | 43 | 真实博物馆官网信息架构：首页/展览/藏品/参观/资讯 | 全局路由与页面骨架 |
| [metmuseum/openaccess](https://github.com/metmuseum/openaccess) | 1.4k | 藏品元数据建模（编号/时代/年代/材质/尺寸/文化/来源） | `src/data/collection.ts` |
| [openseadragon/openseadragon](https://github.com/openseadragon/openseadragon) | 3.5k | 藏品高清深缩放：平滑缩放、拖拽、导航小地图 | `/artifact/:id`（`src/lib/useSeadragon.ts`） |
| [pengan1987/computer-museum-dnbwg](https://github.com/pengan1987/computer-museum-dnbwg) | 985 | “在线可玩展品”：编钟演奏、知识闯关等可交互内容 | `/interactive` |

## 快速开始

```bash
npm install
npm run dev      # 本地开发 http://localhost:5173
npm run build    # 生产构建（tsc + vite build）
npm run preview  # 预览构建产物
```

## 页面地图

- `/` 首页：Hero + 六大模块卡片 + 镇馆之宝 + 展览速览 + 资讯
- `/exhibitions` 展览：常设/临时展览卡片与状态
- `/collection` 藏品库：关键词搜索 + 分类筛选（Met 数据模型）
- `/artifact/:id` 藏品详情：OpenSeadragon 深缩放 + 元数据表 + 语音讲解
- `/hall` 3D 数字展厅：第一人称漫游 + 视角存档（noclip 同款）
- `/interactive` 互动体验：编钟演奏（WebAudio）+ 文物知识闯关
- `/visit` 参观服务：开放时间/预约/交通/楼层导览

## 技术栈

Vite + React 19 + TypeScript + react-router-dom（HashRouter）+ three.js + OpenSeadragon

## 项目结构

```
src/
├── data/collection.ts        # 藏品/展览/资讯数据（Met 风格字段）
├── components/               # Layout、ExhibitCard
├── pages/                    # 7 个页面
├── three/MuseumHall.ts       # 3D 展厅（three.js 场景 + 视角存档）
└── lib/useSeadragon.ts       # OpenSeadragon 深缩放 Hook
```

## 后续可替换为真实数据/资产

- 藏品图片：换成文物高清图，并把 OpenSeadragon 切到 IIIF/DZI 瓦片源
- 3D 场景：Blender 建模 → 烘焙贴图 → 导出 glb，替换 `MuseumHall` 中的几何体
- 全景展厅：接入 Pannellum / Photo-Sphere-Viewer 生成全景漫游
- 编钟音高：按出土测音数据替换 `bells` 频率
- 数据后端：把静态 JSON 换成 CMS / 数据库 + API

## 注意

本项目为演示工程，藏品信息与参观信息均为占位数据，正式上线前请以宜昌博物馆官方资料为准。
