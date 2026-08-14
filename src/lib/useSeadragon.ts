import { useEffect, useRef } from 'react';
import * as OpenSeadragonNS from 'openseadragon';

/**
 * openseadragon 是 CJS/UMD 模块，不同打包互操作下可能是 default 或命名空间形态。
 * 这里做运行时兼容取值，保留完整 Viewer / Options 类型。
 */
function createViewer(options: OpenSeadragonNS.Options): OpenSeadragonNS.Viewer {
  const mod = OpenSeadragonNS as unknown as {
    default?: unknown;
    [key: string]: unknown;
  };
  const factory = (mod.default ?? mod) as (
    o: OpenSeadragonNS.Options,
  ) => OpenSeadragonNS.Viewer;
  return factory(options);
}

/**
 * 藏品高清深缩放查看器（组合自 openseadragon/openseadragon）。
 * 支持滚轮缩放、拖拽平移、导航小地图；真实项目中可换成 IIIF / DZI 瓦片源。
 */
export function useSeadragon(imageUrl: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !imageUrl) return;

    const viewer = createViewer({
      element: el,
      prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@6.1.0/build/openseadragon/images/',
      tileSources: { type: 'image', url: imageUrl },
      showNavigator: true,
      navigatorSizeRatio: 0.18,
      defaultZoomLevel: 0.55,
      minZoomLevel: 0.25,
      maxZoomLevel: 10,
      animationTime: 0.4,
      springStiffness: 8,
      gestureSettingsMouse: { clickToZoom: false },
      gestureSettingsTouch: { pinchToZoom: true, flickEnabled: true },
    });

    return () => {
      viewer.destroy();
    };
  }, [imageUrl]);

  return containerRef;
}
