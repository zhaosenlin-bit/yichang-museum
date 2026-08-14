import { Link } from 'react-router-dom';
import ExhibitCard from '../components/ExhibitCard';
import { artifacts, exhibitions, news } from '../data/collection';

const features = [
  {
    icon: '🏛️',
    title: '3D 数字展厅',
    desc: '第一人称漫步巴楚展厅：WASD 行走、鼠标环视、点击文物查看详情（参考 gallery）。',
    to: '/hall',
  },
  {
    icon: '🧭',
    title: '自由相机与视角存档',
    desc: 'noclip 式相机控制：保存/读取导览视角、自动环绕，一键分享最佳机位。',
    to: '/hall',
  },
  {
    icon: '📷',
    title: '藏品高清深缩放',
    desc: 'OpenSeadragon 深缩放引擎，青铜纹饰与书画细节纤毫毕现。',
    to: '/artifact/chunyu',
  },
  {
    icon: '🗂️',
    title: '藏品数据库',
    desc: 'Met 大都会博物馆式藏品元数据建模，支持检索与分类浏览。',
    to: '/collection',
  },
  {
    icon: '🎮',
    title: '互动展品',
    desc: '编钟演奏、知识闯关等“能玩的文物”，把展品从图片变成体验。',
    to: '/interactive',
  },
  {
    icon: '📰',
    title: '官网信息架构',
    desc: '首页、展览、参观、资讯一体化的博物馆官网结构。',
    to: '/visit',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(images/hero.jpg)' }} />
        <div className="hero-content">
          <h1>宜昌博物馆 · 数字文博平台</h1>
          <p>巴楚文化 · 三峡文明 · 云端漫步 19 万年的时光</p>
          <div className="hero-cta">
            <Link to="/hall" className="btn solid">
              🏛️ 进入 3D 数字展厅
            </Link>
            <Link to="/collection" className="btn">
              浏览藏品库
            </Link>
            <Link to="/interactive" className="btn">
              互动体验
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <div className="section-title">
          <h2>六大模块 · 组合自 6 个高质量开源项目</h2>
        </div>
        <div className="feature-grid">
          {features.map((f) => (
            <Link to={f.to} key={f.title} className="feature-card">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Link>
          ))}
        </div>

        <div className="section-title">
          <h2>镇馆之宝</h2>
          <Link to="/collection" className="btn">
            查看全部 →
          </Link>
        </div>
        <div className="exhibit-grid">
          {artifacts.slice(0, 4).map((a) => (
            <ExhibitCard key={a.id} artifact={a} />
          ))}
        </div>

        <div className="section-title">
          <h2>展览速览</h2>
          <Link to="/exhibitions" className="btn">
            全部展览 →
          </Link>
        </div>
        <div className="exhibit-grid">
          {exhibitions.slice(0, 2).map((ex) => (
            <div className="exh-card" key={ex.id}>
              <div className="exh-media">
                <img src={ex.image} alt={ex.title} loading="lazy" />
              </div>
              <div className="exh-body">
                <span className={'badge ' + (ex.status === '展出中' ? 'live' : 'upcoming')}>
                  {ex.status}
                </span>
                <h3>{ex.title}</h3>
                <div className="exh-meta">
                  {ex.period} · {ex.location}
                </div>
                <p>{ex.intro}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">
          <h2>馆内资讯</h2>
        </div>
        <ul className="news-list">
          {news.map((n) => (
            <li key={n.id}>
              <span className="tag">{n.tag}</span>
              <span>{n.title}</span>
              <span className="date">{n.date}</span>
            </li>
          ))}
        </ul>

        <div className="visit-strip">
          <div className="item">
            <strong>开放时间</strong>
            09:00 - 17:00（周一闭馆）
          </div>
          <div className="item">
            <strong>地址</strong>
            宜昌市伍家岗区柏临河路
          </div>
          <div className="item">
            <strong>预约方式</strong>
            官方公众号 · 数字平台在线预约
          </div>
          <Link to="/visit" className="btn solid">
            参观指南 →
          </Link>
        </div>
      </div>
    </div>
  );
}
