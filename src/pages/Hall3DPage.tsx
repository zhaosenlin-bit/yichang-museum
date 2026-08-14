import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Artifact } from '../data/collection';
import { artifacts } from '../data/collection';
import { MuseumHall } from '../three/MuseumHall';

export default function Hall3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hallRef = useRef<MuseumHall | null>(null);
  const [selected, setSelected] = useState<Artifact | null>(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hall = new MuseumHall({
      container,
      artifacts,
      onSelect: (a) => setSelected(a),
      onStatus: (s) => setStatus(s),
    });
    hallRef.current = hall;
    hall.init();

    return () => {
      hall.dispose();
      hallRef.current = null;
    };
  }, []);

  return (
    <div className="hall-page">
      <div ref={containerRef} className="hall-canvas" />

      <div className="hall-hud">
        <h4>3D 数字展厅 · 操作说明</h4>
        <p>
          <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> 移动 · <kbd>Shift</kbd> 加速
        </p>
        <p>
          <kbd>Space</kbd> 上升 · <kbd>C</kbd> 下降 · 鼠标左键拖拽视角
        </p>
        <p>点击展品查看详情</p>
        <p>
          <kbd>Shift</kbd>+<kbd>1</kbd>-<kbd>9</kbd> 保存视角 · <kbd>1</kbd>-<kbd>9</kbd> 读取视角
          （noclip 同款）
        </p>
        <p>
          <kbd>R</kbd> 自动环绕
        </p>
      </div>

      {status && <div className="hall-status">{status}</div>}

      <div className="hall-tools">
        <button className="btn" onClick={() => hallRef.current?.toggleAutoOrbit()}>
          🔄 自动环绕
        </button>
        <button className="btn" onClick={() => hallRef.current?.resetView()}>
          🏠 重置视角
        </button>
        <button className="btn" onClick={() => setSelected(null)}>
          ✕ 关闭弹窗
        </button>
      </div>

      {selected && (
        <div className="hall-modal">
          <img src={selected.image} alt={selected.title} />
          <h3>{selected.title}</h3>
          <p>
            {selected.dynasty} · {selected.culture} · {selected.medium}
          </p>
          <p>{selected.description}</p>
          <div className="modal-actions">
            <button className="btn solid" onClick={() => navigate(`/artifact/${selected.id}`)}>
              🔍 查看高清细节
            </button>
            <button className="btn" onClick={() => setSelected(null)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
