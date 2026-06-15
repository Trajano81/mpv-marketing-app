/* Admin SPA — shell (sidebar + topbar). Usa Icon/Btn/ThemeToggle de proto-ui.jsx */

const ANAV = [
  { grp: 'Operación', items: [
    { id: 'a1', icon: 'grid', label: 'Panorama' },
    { id: 'a2', icon: 'users', label: 'Tenants', count: 18 },
    { id: 'a8', icon: 'pulse', label: 'Monitor de runs' },
  ]},
  { grp: 'Catálogos', items: [
    { id: 'a3', icon: 'pin', label: 'Segmentación' },
    { id: 'a4', icon: 'idcard', label: 'Perfiles / agentes' },
    { id: 'a5', icon: 'doc', label: 'Banco de preguntas' },
    { id: 'a6', icon: 'sliders', label: 'Dimensiones · umbral' },
  ]},
  { grp: 'Sistema', items: [
    { id: 'a7', icon: 'cpu', label: 'Modelos / APIs' },
    { id: 'a9', icon: 'bulb', label: 'Memoria · insights' },
  ]},
];

function AdminSidebar({ route, go }) {
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <span className="brand-mark"><Icon n="flask" w={19} s={1.8} /></span>
        <div className="brand-text"><b>Panel Sintético</b><span className="admin-tag">Consola Admin</span></div>
      </div>
      <div className="op-badge">
        <span className="od" />
        <div className="ot"><b>Operador interno</b><small>Todos los tenants</small></div>
      </div>
      <nav className="nav">
        {ANAV.map(g => (
          <React.Fragment key={g.grp}>
            <div className="nav-label">{g.grp}</div>
            {g.items.map(n => (
              <button key={n.id} className={`nav-item ${route === n.id ? 'is-active' : ''}`} onClick={() => go(n.id)}>
                <Icon n={n.icon} w={18} /> {n.label}
                {n.count && <span className="nav-count">{n.count}</span>}
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="side-foot">
        <div className="usage">
          <div className="usage-head"><span>Sistema</span><span className="num" style={{ color: 'var(--pass)' }}>OK</span></div>
          <div className="usage-bar"><i style={{ width: '34%' }} /></div>
          <small>Cuota multimodal · 34% del mes</small>
        </div>
        <a className="user" href="Entrada.html" title="Cambiar de rol / salir" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          <span className="avatar">OP</span>
          <div className="user-text"><b>Diego Salinas</b><small>Plataforma · admin</small></div>
        </a>
      </div>
    </aside>
  );
}

function AdminTopbar({ title, sub, theme, setTheme, actions }) {
  return (
    <header className="topbar">
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--h-weight)', fontSize: 18, letterSpacing: 'var(--track-tight)' }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>}
      </div>
      <div className="top-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        {actions}
      </div>
    </header>
  );
}

Object.assign(window, { AdminSidebar, AdminTopbar });
