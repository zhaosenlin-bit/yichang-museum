import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/exhibitions', label: '展览' },
  { to: '/collection', label: '藏品' },
  { to: '/hall', label: '3D展厅' },
  { to: '/interactive', label: '互动体验' },
  { to: '/visit', label: '参观服务' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">🏛️</span>
          <span className="brand-text">
            宜昌博物馆<small>数字文博平台</small>
          </span>
        </Link>
        <nav className={open ? 'site-nav open' : 'site-nav'}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="菜单">
          ☰
        </button>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <h4>宜昌博物馆 · 数字文博平台</h4>
            <p>巴楚文化 / 三峡文明 / 3D 数字展厅（演示项目）</p>
          </div>
          <div className="footer-links">
            <span>组合参考：</span>
            <a href="https://github.com/Steve245270533/gallery" target="_blank" rel="noreferrer">gallery</a>
            <a href="https://github.com/magcius/noclip.website" target="_blank" rel="noreferrer">noclip.website</a>
            <a href="https://github.com/wellcomecollection/wellcomecollection.org" target="_blank" rel="noreferrer">wellcomecollection.org</a>
            <a href="https://github.com/metmuseum/openaccess" target="_blank" rel="noreferrer">metmuseum/openaccess</a>
            <a href="https://github.com/openseadragon/openseadragon" target="_blank" rel="noreferrer">openseadragon</a>
            <a href="https://github.com/pengan1987/computer-museum-dnbwg" target="_blank" rel="noreferrer">computer-museum-dnbwg</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
