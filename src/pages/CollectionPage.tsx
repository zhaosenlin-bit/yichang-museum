import { useMemo, useState } from 'react';
import ExhibitCard from '../components/ExhibitCard';
import { artifacts } from '../data/collection';

export default function CollectionPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');

  const categories = useMemo(
    () => ['全部', ...Array.from(new Set(artifacts.map((a) => a.category)))],
    [],
  );

  const list = useMemo(() => {
    const q = query.trim();
    return artifacts.filter(
      (a) =>
        (category === '全部' || a.category === category) &&
        (q === '' ||
          a.title.includes(q) ||
          a.dynasty.includes(q) ||
          a.culture.includes(q) ||
          a.medium.includes(q)),
    );
  }, [query, category]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>藏品库</h1>
        <p>藏品元数据采用 Met / MoMA 开放数据模型：编号、时代、材质、尺寸、来源一应俱全。</p>
      </div>
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="搜索藏品名称、时代、材质…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? 'chip active' : 'chip'}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 0 }}>
        共 {list.length} 件藏品
      </p>
      {list.length > 0 ? (
        <div className="exhibit-grid">
          {list.map((a) => (
            <ExhibitCard key={a.id} artifact={a} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-dim)' }}>没有匹配的藏品，换个关键词试试。</p>
      )}
    </div>
  );
}
