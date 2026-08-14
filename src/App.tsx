import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import CollectionPage from './pages/CollectionPage';
import InteractivePage from './pages/InteractivePage';
import VisitPage from './pages/VisitPage';

// three.js 与 OpenSeadragon 体积较大，按页面懒加载，避免首屏加载过重
const ArtifactDetailPage = lazy(() => import('./pages/ArtifactDetailPage'));
const Hall3DPage = lazy(() => import('./pages/Hall3DPage'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 80, textAlign: 'center', color: 'var(--text-dim)' }}>
          加载中…
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="exhibitions" element={<ExhibitionsPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="artifact/:id" element={<ArtifactDetailPage />} />
          <Route path="hall" element={<Hall3DPage />} />
          <Route path="interactive" element={<InteractivePage />} />
          <Route path="visit" element={<VisitPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
