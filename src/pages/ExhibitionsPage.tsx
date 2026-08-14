import { exhibitions } from '../data/collection';

function badgeClass(status: string) {
  if (status === '展出中') return 'live';
  if (status === '即将开展') return 'upcoming';
  return 'ended';
}

export default function ExhibitionsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>展览</h1>
        <p>常设展览与临时特展一览，支持线上预约与数字导览。</p>
      </div>
      <div className="exhibit-grid">
        {exhibitions.map((ex) => (
          <div className="exh-card" key={ex.id}>
            <div className="exh-media">
              <img src={ex.image} alt={ex.title} loading="lazy" />
            </div>
            <div className="exh-body">
              <span className={'badge ' + badgeClass(ex.status)}>{ex.status}</span>
              <h3>{ex.title}</h3>
              <div className="exh-meta">
                {ex.period} · {ex.location}
              </div>
              <p>{ex.intro}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
