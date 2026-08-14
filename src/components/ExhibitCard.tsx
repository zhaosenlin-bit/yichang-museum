import { Link } from 'react-router-dom';
import type { Artifact } from '../data/collection';

export default function ExhibitCard({ artifact }: { artifact: Artifact }) {
  return (
    <Link to={`/artifact/${artifact.id}`} className="exhibit-card">
      <div className="exhibit-media">
        <img src={artifact.image} alt={artifact.title} loading="lazy" />
      </div>
      <div className="exhibit-info">
        <h3>{artifact.title}</h3>
        <p className="meta">
          {artifact.dynasty} · {artifact.culture}
        </p>
        <p className="medium">{artifact.medium}</p>
      </div>
    </Link>
  );
}
