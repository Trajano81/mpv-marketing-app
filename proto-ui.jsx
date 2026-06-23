/* Prototipo — UI compartida: Icon, Sidebar, Topbar, Stepper, controles. */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5M5 9.5V20h5v-6h4v6h5V9.5"/>',
  box: '<path d="M3.5 7 12 3l8.5 4-8.5 4-8.5-4ZM3.5 7v10l8.5 4 8.5-4V7M12 11v10"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-7"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5"/>',
  users: '<path d="M16 18v-1.5A3.5 3.5 0 0 0 12.5 13h-5A3.5 3.5 0 0 0 4 16.5V18M10 9.5A3 3 0 1 0 10 3.5a3 3 0 0 0 0 6ZM19.5 18v-1.4a3.2 3.2 0 0 0-2.4-3.1M15.5 3.7a3.2 3.2 0 0 1 0 6.1"/>',
  gear: '<path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="m19.2 14-.6 1.4 1 1.7-1.7 1.7-1.7-1-1.4.6-.6 1.9h-2.4l-.6-1.9-1.4-.6-1.7 1-1.7-1.7 1-1.7L4.8 14l-1.9-.6v-2.4l1.9-.6.6-1.4-1-1.7 1.7-1.7 1.7 1 1.4-.6.6-1.9h2.4l.6 1.9 1.4.6 1.7-1 1.7 1.7-1 1.7.6 1.4 1.9.6v2.4l-1.9.6Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.5-4.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>',
  play: '<path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" stroke="none"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-4.5 4 3 3-2.5 4 3.5"/>',
  download: '<path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"/>',
  share: '<path d="M8.5 13.5 15 17M15 7 8.5 10.5M18 7a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM8.5 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM18 17a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  up: '<path d="M12 19V5m0 0-6 6m6-6 6 6"/>',
  down: '<path d="M12 5v14m0 0 6-6m-6 6-6-6"/>',
  check: '<path d="M5 12.5 10 17l9-10"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3L14 9V3"/>',
  arrowR: '<path d="M5 12h14m0 0-6-6m6 6-6 6"/>',
  arrowL: '<path d="M19 12H5m0 0 6-6m-6 6 6 6"/>',
  upload: '<path d="M12 16V5m0 0L8 9m4-4 4 4M5 19h14"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  edit: '<path d="M4 20h4L18 10l-4-4L4 16v4ZM13.5 6.5l4 4"/>',
  sliders: '<path d="M4 8h10M18 8h2M4 16h2M10 16h10M14 5v6M8 13v6"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  tv: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M12 6V3"/>',
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  hash: '<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
  doc: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  brand: '<path d="M3 9l9-6 9 6-9 6-9-6Z"/><path d="M3 9v6l9 6 9-6V9"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3Z"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.5-.2-.8-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7.3-9-7.3Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7.5" r="1"/><circle cx="15.5" cy="9" r="1"/>',
  pulse: '<path d="M3 12h4l2.5-7 4 14L16 12h5"/>',
  idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.5-1.6 1.7-2.3 3-2.3s2.5.7 3 2.3M14 9.5h4M14 13h3"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.2L21 8H6"/>',
  car: '<path d="M5 16v2M19 16v2M3 13l1.5-5A2 2 0 0 1 6.4 6.6h11.2A2 2 0 0 1 19.5 8L21 13M3 13h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3Z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
};
function Icon({ n, w, s }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={s || 1.7}
    strokeLinecap="round" strokeLinejoin="round" style={w ? { width: w, height: w } : undefined}
    dangerouslySetInnerHTML={{ __html: ICONS[n] }} />;
}

function Btn({ kind = 'ghost', icon, iconR, children, onClick, cls = '' }) {
  return (
    <button className={`btn ${kind} ${cls}`} onClick={onClick}>
      {icon && <Icon n={icon} />}{children}{iconR && <Icon n={iconR} />}
    </button>
  );
}

const NAV = [
  { id: 'dashboard', icon: 'home', label: 'Inicio' },
  { id: 'products', icon: 'box', label: 'Campañas' },
  { id: 'analyses', icon: 'chart', label: 'Análisis', count: 3 },
  { id: 'insights', icon: 'bulb', label: 'Insights' },
  { id: 'postview', icon: 'target', label: 'Postview' },
];

const CFG_NAV = [
  { id: 'personas', icon: 'users', label: 'Personas' },
  { id: 'ajustes', icon: 'gear', label: 'Ajustes' },
];
function Sidebar({ route, go }) {
  const activeTop = ['dashboard'].includes(route) ? 'dashboard'
    : route.startsWith('w') || route === 'progress' ? 'analyses'
    : ['results', 'desglose', 'recos', 'library'].includes(route) ? 'analyses' : route;
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <span className="brand-mark"><Icon n="flask" w={19} s={1.8} /></span>
        <div className="brand-text"><b>Panel Sintético</b><small>Pre-test creativo · MX</small></div>
      </div>
      <div className="ws">
        <span className="ws-logo">AB</span>
        <div className="ws-text"><b>Aurora Bebidas</b><small>Workspace</small></div>
        <Icon n="chevron" w={15} />
      </div>
      <nav className="nav">
        <div className="nav-label">Trabajo</div>
        {NAV.map(n => (
          <button key={n.id} className={`nav-item ${activeTop === n.id ? 'is-active' : ''}`} onClick={() => go(n.id)}>
            <Icon n={n.icon} w={18} /> {n.label}
            {n.count && <span className="nav-count">{n.count}</span>}
          </button>
        ))}
        <div className="nav-label">Configuración</div>
        {CFG_NAV.map(n => (
          <button key={n.id} className={`nav-item ${activeTop === n.id ? 'is-active' : ''}`} onClick={() => go(n.id)}>
            <Icon n={n.icon} w={18} /> {n.label}
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <div className="usage">
          <div className="usage-head"><span>Plan Pro</span><span className="num">72%</span></div>
          <div className="usage-bar"><i style={{ width: '72%' }} /></div>
          <small>3,600 / 5,000 agentes este mes</small>
        </div>
        <a className="user" href="Entrada.html" title="Cambiar de cuenta / salir" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          <span className="avatar">MR</span>
          <div className="user-text"><b>Mariana Ruiz</b><small>Estrategia creativa</small></div>
        </a>
      </div>
    </aside>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="seg" role="tablist" aria-label="Modo de color">
      <button className={theme === 'dir-a' ? 'on' : ''} onClick={() => setTheme('dir-a')}>
        <Icon n="sun" w={13} /> Claro
      </button>
      <button className={theme === 'dir-a-dark' ? 'on' : ''} onClick={() => setTheme('dir-a-dark')}>
        <Icon n="moon" w={13} /> Oscuro
      </button>
    </div>
  );
}

const WSTEPS = [
  { id: 'w1', n: '1', t: 'Campaña' },
  { id: 'w2', n: '2', t: 'Audiovisuales/Touchpoints' },
  { id: 'w3', n: '3', t: 'Segmentación' },
  { id: 'w4', n: '4', t: 'Encuesta' },
  { id: 'w5', n: '5', t: 'Revisión' },
];
function Stepper({ route, go }) {
  const cur = WSTEPS.findIndex(s => s.id === route);
  return (
    <div className="stepper">
      {WSTEPS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className={`wz-step ${i === cur ? 'active' : i < cur ? 'done' : ''}`} onClick={() => i <= cur && go(s.id)}>
            <span className="sc">{i < cur ? <Icon n="check" w={14} /> : s.n}</span>
            <span className="st">{s.t}</span>
          </div>
          {i < WSTEPS.length - 1 && <span className={`wz-conn ${i < cur ? 'done' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { Icon, Btn, Sidebar, ThemeToggle, Stepper, WSTEPS });
