import { Link, useParams } from 'react-router-dom';
import { artifacts } from '../data/collection';
import { useSeadragon } from '../lib/useSeadragon';

export default function ArtifactDetailPage() {
  const { id } = useParams();
  const index = artifacts.findIndex((a) => a.id === id);
  const artifact = index >= 0 ? artifacts[index] : null;
  const viewerRef = useSeadragon(artifact ? artifact.image : '');

  if (!artifact) {
    return (
      <div className="page">
        <h1>未找到该藏品</h1>
        <Link to="/collection">返回藏品库</Link>
      </div>
    );
  }

  const prev = artifacts[(index - 1 + artifacts.length) % artifacts.length];
  const next = artifacts[(index + 1) % artifacts.length];

  const meta: Array<[string, string]> = [
    ['藏品编号', artifact.objectID],
    ['时代', artifact.dynasty],
    ['年代', artifact.date],
    ['材质', artifact.medium],
    ['尺寸', artifact.dimensions],
    ['文化归属', artifact.culture],
    ['来源', artifact.provenance],
  ];

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(artifact.audioGuide);
      utter.lang = 'zh-CN';
      utter.rate = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="page artifact-detail">
      <div className="crumb">
        <Link to="/collection">藏品库</Link> / {artifact.title}
      </div>
      <h1>{artifact.title}</h1>

      <div className="detail-grid">
        <div className="viewer-panel">
          <div ref={viewerRef} className="seadragon-viewer" />
          <p className="hint">
            滚轮缩放 · 拖拽平移 · 右下角小地图 —— OpenSeadragon 深缩放引擎
          </p>
        </div>

        <div className="info-panel">
          <table className="meta-table">
            <tbody>
              {meta.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="desc-block">
            <h3>文物介绍</h3>
            <p>{artifact.description}</p>
          </div>

          <button className="btn solid" onClick={speak}>
            🔊 语音讲解
          </button>

          <div className="nav-btns">
            <Link to={`/artifact/${prev.id}`} className="btn">
              ← {prev.title}
            </Link>
            <Link to={`/artifact/${next.id}`} className="btn">
              {next.title} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
