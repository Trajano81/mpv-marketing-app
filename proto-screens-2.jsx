/* Prototipo — pantallas pendientes: Productos (T2'), Biblioteca,
   Personas (panel sintético) y Ajustes del workspace.
   Reutiliza Icon / Btn / ThemeToggle de proto-ui.jsx y los tokens de styles.css. */
const { useState: useStateP } = React;

/* topbar local (decoupled) */
function TopbarP({ left, theme, setTheme, actions }) {
  return (
    <header className="topbar">
      {left}
      <div className="top-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        {actions}
      </div>
    </header>
  );
}

/* ===================== PRODUCTOS ===================== */
const PRODUCTS = [
  { key: 'mango', logo: 'NM', cls: 'v1', name: 'Néctar Aurora Mango', cat: 'Bebidas', brand: 'Aurora',
    pos: 'Aspiracional-tradicional', price: '$24 / 1L', target: 'Familias jóvenes',
    pieces: 4, runs: 4, comp: '7.4', pass: 3, warn: 0, fail: 1, last: '12 jun', status: 'active' },
  { key: 'tamarindo', logo: 'NT', cls: 'v3', name: 'Néctar Aurora Tamarindo', cat: 'Bebidas', brand: 'Aurora',
    pos: 'Valor / práctico', price: '$22 / 1L', target: 'NSE C / C−',
    pieces: 2, runs: 2, comp: '7.0', pass: 1, warn: 1, fail: 0, last: '10 jun', status: 'active' },
  { key: 'agua', logo: 'AM', cls: 'v5', name: 'Agua Aurora Mineral', cat: 'Bebidas', brand: 'Aurora',
    pos: 'Aspiracional', price: '$15 / 1L', target: 'Gen Z urbano',
    pieces: 3, runs: 2, comp: '6.8', pass: 1, warn: 0, fail: 1, last: '5 jun', status: 'active' },
  { key: 'guayaba', logo: 'NG', cls: 'v6', name: 'Néctar Aurora Guayaba', cat: 'Bebidas', brand: 'Aurora',
    pos: 'Premium', price: '$28 / 1L', target: 'NSE A/B · C+',
    pieces: 1, runs: 0, comp: '—', pass: 0, warn: 0, fail: 0, last: '9 jun', status: 'draft' },
];

function Products({ go, setCampaign, theme, setTheme }) {
  const totals = PRODUCTS.reduce((a, p) => ({
    prods: a.prods + 1, pieces: a.pieces + p.pieces, runs: a.runs + p.runs,
  }), { prods: 0, pieces: 0, runs: 0 });
  const viewEvals = (p) => { setCampaign({ key: p.key, name: p.name }); go('library'); };
  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="search"><Icon n="search" w={16} /><input placeholder="Buscar campañas…" /></div>}
        actions={<Btn kind="primary" icon="plus" onClick={() => go('new-campana')}>Nueva campaña</Btn>} />
      <div className="scroll">
        <div className="ph2">
          <div>
            <h1>Campañas</h1>
            <p>{totals.prods} campañas · {totals.pieces} piezas · {totals.runs} análisis corridos en el workspace.</p>
          </div>
        </div>
        <div className="cat-grid">
          {PRODUCTS.map(p => {
            const tot = p.pass + p.warn + p.fail || 1;
            return (
              <div className="prod-card" key={p.name}>
                <div className="prod-top">
                  <span className={`prod-logo ${p.cls}`}>{p.logo}</span>
                  <div className="prod-id"><b>{p.name}</b><small>{p.cat} · {p.brand}</small></div>
                  {p.status === 'draft'
                    ? <span className="tag neutral">Borrador</span>
                    : <span className="tag pass"><span className="state-dot" />Activo</span>}
                </div>
                <div className="prod-chips">
                  <span className="chip">{p.pos}</span>
                  <span className="chip">{p.price}</span>
                  <span className="chip">{p.target}</span>
                </div>
                <div className="prod-stats">
                  <div className="ps"><b className="num">{p.pieces}</b><span>PIEZAS</span></div>
                  <div className="ps"><b className="num">{p.runs}</b><span>ANÁLISIS</span></div>
                  <div className="ps"><b className="num">{p.comp}</b><span>COMPUESTO</span></div>
                </div>
                {p.runs > 0 ? (
                  <div className="prod-gate">
                    <div className="pg-bar">
                      {p.pass > 0 && <i className="pass" style={{ width: `${p.pass / tot * 100}%` }} />}
                      {p.warn > 0 && <i className="warn" style={{ width: `${p.warn / tot * 100}%` }} />}
                      {p.fail > 0 && <i className="fail" style={{ width: `${p.fail / tot * 100}%` }} />}
                    </div>
                    <div className="pg-legend">{p.pass} pasan · {p.warn} al límite · {p.fail} regresan a creatividad</div>
                  </div>
                ) : <div className="prod-empty">Sin análisis todavía — sube piezas y lanza el primero.</div>}
                <div className="prod-foot">
                  <span className="date-lbl">Última actividad · {p.last}</span>
                  <div className="prod-actions">
                    {p.runs > 0 && <button className="btn ghost" onClick={() => viewEvals(p)}>Ver evaluaciones</button>}
                    <button className="btn primary" onClick={() => go('new-pieza')}><Icon n="plus" w={15} />Analizar nueva pieza</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===================== BIBLIOTECA ===================== */
const ASSETS = [
  { id: 'mango-spot30', cls: 'v1', kind: 'Video', icon: 'play', name: 'spot_30s_sabor.mp4', spec: '0:30 · 48 MB', pkey: 'mango', product: 'Néctar Mango', chan: 'TV abierta', plaza: 'Nacional', score: '7.8', g: 'pass', date: '12 jun' },
  { id: 'mango-inf', cls: 'v6', kind: 'Influencer', icon: 'play', name: 'influencer_mty_receta.mp4', spec: '1:12 · 95 MB', pkey: 'mango', product: 'Néctar Mango', chan: 'TikTok', plaza: 'Monterrey', score: '8.3', g: 'pass', date: '7 jun' },
  { id: 'tam-reel', cls: 'v3', kind: 'Influencer', icon: 'play', name: 'reel_chefcito.mp4', spec: '0:24 · 31 MB', pkey: 'tamarindo', product: 'Tamarindo', chan: 'TikTok', plaza: 'Nacional', score: '7.1', g: 'warn', date: '10 jun' },
  { id: 'mango-valla', cls: 'v2', kind: 'Valla', icon: 'image', name: 'valla_insurgentes.jpg', spec: '4000×1500 · 8 MB', pkey: 'mango', product: 'Néctar Mango', chan: 'OOH / Valla', plaza: 'CDMX', score: '6.4', g: 'fail', date: '11 jun' },
  { id: 'tam-spot15', cls: 'v5', kind: 'Video', icon: 'play', name: 'spot_15s_corte.mp4', spec: '0:15 · 22 MB', pkey: 'tamarindo', product: 'Tamarindo', chan: 'TV abierta', plaza: 'Norte', score: null, g: 'run', date: 'hoy' },
  { id: 'agua-post', cls: 'v5', kind: 'Imagen', icon: 'image', name: 'post_agua_genz.jpg', spec: '1080×1080 · 3 MB', pkey: 'agua', product: 'Agua Mineral', chan: 'Instagram', plaza: 'Nacional', score: '6.8', g: 'warn', date: '5 jun' },
  { id: 'guay-carr', cls: 'v4', kind: 'Imagen', icon: 'image', name: 'carrusel_lanzamiento.jpg', spec: '1080×1350 · 4 MB', pkey: 'guayaba', product: 'Guayaba', chan: 'Instagram', plaza: '—', score: null, g: 'draft', date: '9 jun' },
  { id: 'agua-spot', cls: 'v1', kind: 'Video', icon: 'play', name: 'spot_agua_amanecer.mp4', spec: '0:20 · 30 MB', pkey: 'agua', product: 'Agua Mineral', chan: 'Streaming', plaza: 'Nacional', score: null, g: 'draft', date: '6 jun' },
];
const LIB_FILTERS = ['Todos', 'Video', 'Imagen', 'Valla', 'Influencer'];

/* tarjeta de pieza con preview rellenable (image-slot) + estado */
function PieceCard({ a, go }) {
  const isVideo = a.kind === 'Video' || a.kind === 'Influencer';
  return (
    <div className="lib-card">
      <div className={`lib-thumb-wrap ${a.cls}`}>
        <image-slot id={`prev-${a.id}`} shape="rect" fit="cover" placeholder="Arrastra un frame"></image-slot>
        <span className="lib-kind">{a.kind}</span>
        {a.score && <span className={`lib-badge ${a.g}`}>{a.score}</span>}
        {isVideo && <span className="play-ov"><Icon n="play" w={20} /></span>}
      </div>
      <div className="lib-body">
        <b>{a.name}</b>
        <small>{a.product} · {a.spec}</small>
        <div className="lib-expo">
          <span className="chip sm">{a.chan}</span>
          <span className="chip sm">{a.plaza}</span>
        </div>
      </div>
      <div className="lib-foot">
        {a.g === 'run'
          ? <span className="state run"><span className="dot" />Procesando</span>
          : a.g === 'draft'
            ? <span className="state draft"><span className="dot" />Sin evaluar · {a.date}</span>
            : <span className="state ready"><span className="dot" />Evaluada · {a.date}</span>}
        <button className="lib-go" onClick={() => a.score ? go('results') : go('new-pieza')}>
          {a.score ? 'Ver resultados' : 'Evaluar'}<Icon n="arrowR" w={14} />
        </button>
      </div>
    </div>
  );
}


/* ===================== PERSONAS (panel sintético) ===================== */
const NSE_DIST = [['A/B', 7], ['C+', 12], ['C', 17], ['C−', 17], ['D+', 19], ['D', 21], ['E', 7]];
const ARCHETYPES = [
  { av: 'AU', name: 'Aspiracional urbano', nse: ['A/B', 'C+'], geo: 'CDMX · Guadalajara', age: '25–44',
    income: '$45k+ / mes', media: 'Streaming · Instagram', trait: 'Confía en la publicidad, busca estatus y calidad percibida.', w: 14 },
  { av: 'CM', name: 'Clase media práctica', nse: ['C', 'C+'], geo: 'Nacional urbano', age: '30–49',
    income: '$18–32k / mes', media: 'TV abierta · Facebook', trait: 'Equilibra precio y marca; la decisión de compra es familiar.', w: 22 },
  { av: 'NP', name: 'Norteño pragmático', nse: ['C−', 'D+'], geo: 'Monterrey · Norte', age: '25–45',
    income: '$12–20k / mes', media: 'TikTok · TV abierta', trait: 'Penaliza claims aspiracionales; valora rendimiento y litros.', w: 18 },
  { av: 'TS', name: 'Tradicional del sur', nse: ['D+', 'D'], geo: 'Oaxaca · Sureste', age: '35–60',
    income: '$6–12k / mes', media: 'TV abierta · radio', trait: 'Muy sensible al precio; conecta con el código “sabor de casa”.', w: 16 },
  { av: 'JD', name: 'Joven digital', nse: ['C+', 'C'], geo: 'Nacional', age: '18–28',
    income: '$8–18k / mes', media: 'TikTok · YouTube', trait: 'Confía en influencers; altísima exposición a redes sociales.', w: 19 },
  { av: 'SE', name: 'Senior establecido', nse: ['A/B', 'C+'], geo: 'CDMX · Bajío', age: '50+',
    income: '$38k+ / mes', media: 'TV abierta · prensa', trait: 'Leal a sus marcas de siempre; escéptico ante lo nuevo.', w: 11 },
];
const SAVED_PANELS = [
  { name: 'Lanzamiento nacional', desc: 'Mezcla representativa MX · 7 NSE · 6 plazas', n: 187 },
  { name: 'Norte value', desc: 'C− / D+ · Monterrey + plazas del norte', n: 96 },
  { name: 'Premium CDMX', desc: 'A/B · C+ · zona metropolitana', n: 74 },
];

function Personas({ go, theme, setTheme }) {
  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="crumbs">Configuración · <b>Personas</b></div>}
        actions={<Btn kind="primary" icon="plus">Nuevo arquetipo</Btn>} />
      <div className="scroll">
        <div className="ph2">
          <div>
            <h1>Panel sintético de consumidores</h1>
            <p>Arquetipos que componen tu panel, anclados en datos reales de México. Los catálogos los administra la plataforma.</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Composición por nivel socioeconómico</h2>
            <span className="legend">peso poblacional</span>
          </div>
          <div className="nse-bar">
            {NSE_DIST.map((n, i) => <span key={n[0]} style={{ flexGrow: n[1], background: 'var(--accent)', opacity: 1 - i * 0.115 }} />)}
          </div>
          <div className="nse-legend">
            {NSE_DIST.map((n, i) => (
              <span className="nl" key={n[0]}><i style={{ background: 'var(--accent)', opacity: 1 - i * 0.115 }} />{n[0]} <b className="num">{n[1]}%</b></span>
            ))}
          </div>
          <p className="heat-note">Regla <b>AMAI 2024</b> calibrada con <b>ENIGH 2022</b> (INEGI) · estimaciones por manzana/AGEB del <b>Censo 2020</b>. Señal direccional, no ground truth.</p>
        </div>

        <div className="ph2"><div><h2 className="sec-title">Paneles guardados</h2></div></div>
        <div className="saved-row">
          {SAVED_PANELS.map(s => (
            <div className="saved-card" key={s.name} onClick={() => go('w3')}>
              <div className="sc-top">
                <span className="saved-ic"><Icon n="users" w={17} /></span>
                <div style={{ flex: 1 }}><b>{s.name}</b></div>
                <span className="saved-n num">{s.n}</span>
              </div>
              <small>{s.desc}</small>
            </div>
          ))}
        </div>

        <div className="ph2"><div><h2 className="sec-title">Arquetipos del panel</h2></div></div>
        <div className="persona-grid">
          {ARCHETYPES.map(a => (
            <div className="persona-card" key={a.name}>
              <div className="pc-head">
                <span className="pc-av">{a.av}</span>
                <div className="pc-id"><b>{a.name}</b><span className="pc-geo">{a.geo}</span></div>
                <div className="pc-w"><b className="num">{a.w}%</b><span>del panel</span></div>
              </div>
              <div className="pc-nse">{a.nse.map(n => <span className="chip sm accent" key={n}>NSE {n}</span>)}</div>
              <p className="pc-trait">{a.trait}</p>
              <div className="pc-meta">
                <div className="m"><span>Edad</span><b>{a.age}</b></div>
                <div className="m"><span>Ingreso</span><b className="num">{a.income}</b></div>
                <div className="m" style={{ gridColumn: '1 / -1' }}><span>Hábitos de medios</span><b>{a.media}</b></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== AJUSTES (workspace) ===================== */
const MEMBERS = [
  { initials: 'MR', name: 'Mariana Ruiz', email: 'mariana@aurorabebidas.mx', role: 'Admin', you: true },
  { initials: 'JL', name: 'Jorge Lara', email: 'jorge@aurorabebidas.mx', role: 'Editor' },
  { initials: 'SP', name: 'Sofía Peña', email: 'sofia@aurorabebidas.mx', role: 'Editor' },
  { initials: 'DV', name: 'Diego Vega', email: 'diego@aurorabebidas.mx', role: 'Solo lectura' },
];
const NOTIFS = [
  ['Análisis completado', 'Avísame cuando un run termine y el reporte esté listo.', true],
  ['Pieza regresa a creatividad', 'Cuando una pieza no pasa el gate de intención de compra.', true],
  ['Resumen semanal', 'Digest de evaluaciones y tendencias del workspace.', false],
  ['Límite de uso', 'Cuando el workspace alcance el 80% del plan mensual.', true],
];
const SET_NAV = [
  { id: 'workspace', icon: 'box', label: 'Workspace' },
  { id: 'plan', icon: 'coin', label: 'Plan y uso' },
  { id: 'umbral', icon: 'target', label: 'Umbral de aprobación' },
  { id: 'equipo', icon: 'users', label: 'Equipo' },
  { id: 'notif', icon: 'pulse', label: 'Notificaciones' },
];

function Settings({ theme, setTheme }) {
  const [sec, setSec] = useStateP('workspace');
  const [thr, setThr] = useStateP(7.5);
  const [notif, setNotif] = useStateP(NOTIFS.map(n => n[2]));
  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="crumbs">Configuración · <b>Ajustes del workspace</b></div>} />
      <div className="scroll">
        <div className="ph2"><div><h1>Ajustes</h1><p>Configuración del workspace de Aurora Bebidas.</p></div></div>
        <div className="set-layout">
          <div className="set-nav">
            {SET_NAV.map(n => (
              <button key={n.id} className={sec === n.id ? 'on' : ''} onClick={() => setSec(n.id)}>
                <Icon n={n.icon} w={16} />{n.label}
              </button>
            ))}
          </div>

          <div className="set-section">
            {sec === 'workspace' && (
              <div className="set-card">
                <h2>Workspace</h2>
                <p className="sub">Identidad de la marca dentro de la plataforma.</p>
                <div className="set-fields">
                  <div className="field"><label>Nombre del workspace</label><input className="input" defaultValue="Aurora Bebidas" /></div>
                  <div className="field"><label>Industria</label>
                    <select className="select" defaultValue="Bebidas"><option>Bebidas</option><option>Alimentos</option><option>Cuidado personal</option><option>Retail</option></select></div>
                  <div className="field"><label>País / mercado</label>
                    <select className="select" defaultValue="México"><option>México</option></select></div>
                  <div className="field"><label>Dominio de correo</label><input className="input" defaultValue="aurorabebidas.mx" /></div>
                </div>
              </div>
            )}

            {sec === 'plan' && (
              <div className="set-card">
                <h2>Plan y uso</h2>
                <p className="sub">Consumo de agentes del mes en curso.</p>
                <div className="plan-banner">
                  <span className="pb-ic"><Icon n="flask" w={20} /></span>
                  <div className="pb-txt"><b>Plan Pro</b><br /><small>5,000 agentes / mes · facturación mensual</small></div>
                  <button className="btn ghost">Cambiar plan</button>
                </div>
                <div className="usage-big">
                  <div className="ub-head"><span>Agentes corridos</span><span className="num">3,600 / 5,000</span></div>
                  <div className="ub-bar"><i style={{ width: '72%' }} /></div>
                  <p className="heat-note">Quedan <b>1,400 agentes</b> este ciclo · se renueva el 1 de julio. Promedio de 187 agentes por análisis.</p>
                </div>
              </div>
            )}

            {sec === 'umbral' && (
              <div className="set-card">
                <h2>Umbral de aprobación</h2>
                <p className="sub">Override del estándar de la plataforma (7.5). El gate se aplica sobre la intención de compra ponderada.</p>
                <div className="thresh-box" style={{ maxWidth: 'none' }}>
                  <span className="tv num">{thr.toFixed(1)}</span>
                  <div className="tt"><b>Gate del workspace</b><p>Intención de compra ponderada &lt; umbral → la pieza regresa a creatividad.</p></div>
                  <input className="range" type="range" min="5" max="9" step="0.1" value={thr} onChange={e => setThr(+e.target.value)} />
                </div>
                <p className="heat-note" style={{ marginTop: 16 }}>El estándar global de la plataforma es <b>7.5</b>. Subirlo hace tu pre-screening más exigente; bajarlo deja pasar más piezas a producción.</p>
              </div>
            )}

            {sec === 'equipo' && (
              <div className="set-card">
                <div className="panel-head" style={{ marginBottom: 6 }}>
                  <h2>Equipo</h2>
                  <Btn kind="primary" icon="plus">Invitar</Btn>
                </div>
                <p className="sub">{MEMBERS.length} miembros con acceso a este workspace.</p>
                {MEMBERS.map(m => (
                  <div className="member" key={m.email}>
                    <span className="avatar">{m.initials}</span>
                    <div className="m-id"><b>{m.name}{m.you && <span className="you-tag">tú</span>}</b><small>{m.email}</small></div>
                    <span className="role-tag">{m.role}</span>
                  </div>
                ))}
              </div>
            )}

            {sec === 'notif' && (
              <div className="set-card">
                <h2>Notificaciones</h2>
                <p className="sub">Qué eventos del workspace quieres recibir por correo.</p>
                {NOTIFS.map((n, i) => (
                  <div className="notif-row" key={n[0]}>
                    <div className="nr-txt"><b>{n[0]}</b><small>{n[1]}</small></div>
                    <button className={`switch ${notif[i] ? 'on' : ''}`} onClick={() => setNotif(s => s.map((v, j) => j === i ? !v : v))} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== ANÁLISIS (piezas + runs en curso) ===================== */
const RUN_STAGES = ['Percepción', 'Fan-out', 'Agregación', 'Reporte'];
const PKEY_OF = { 'Néctar Mango': 'mango', 'Tamarindo': 'tamarindo', 'Agua Mineral': 'agua', 'Guayaba': 'guayaba' };
const ACTIVE_RUNS = [
  { cls: 'v5', icon: 'play', name: 'Spot 15s — corte', product: 'Tamarindo', expo: 'TV abierta · Norte', stage: 1, done: 120, n: 187, eta: '1m 10s', cost: '$2.40' },
  { cls: 'v3', icon: 'play', name: 'Reel verano @sol', product: 'Agua Mineral', expo: 'TikTok · Nacional', stage: 0, done: 0, n: 140, eta: '3m 05s', cost: '$0.60' },
  { cls: 'v2', icon: 'image', name: 'Valla aeropuerto MTY', product: 'Néctar Mango', expo: 'OOH · Monterrey', stage: 2, done: 96, n: 96, eta: '25s', cost: '$1.90' },
];
const RUN_HISTORY = [
  { cls: 'v1', icon: 'play', name: 'Spot 30s — “Sabor que abraza”', product: 'Néctar Mango', st: 'ready', panel: '187', cost: '$4.10', dur: '3m 12s', date: '12 jun' },
  { cls: 'v6', icon: 'play', name: 'Influencer MTY — receta', product: 'Néctar Mango', st: 'ready', panel: '110', cost: '$2.80', dur: '2m 40s', date: '7 jun' },
  { cls: 'v3', icon: 'play', name: 'Reel @chefcito', product: 'Tamarindo', st: 'ready', panel: '142', cost: '$3.30', dur: '2m 55s', date: '10 jun' },
  { cls: 'v2', icon: 'image', name: 'Valla Insurgentes Sur', product: 'Néctar Mango', st: 'ready', panel: '96', cost: '$1.90', dur: '1m 48s', date: '11 jun' },
  { cls: 'v5', icon: 'image', name: 'Post agua — Gen Z', product: 'Agua Mineral', st: 'queue', panel: '130', cost: '—', dur: 'en cola', date: 'hoy' },
  { cls: 'v4', icon: 'image', name: 'Carrusel lanzamiento', product: 'Guayaba', st: 'draft', panel: '—', cost: '—', dur: '—', date: '9 jun' },
  { cls: 'v3', icon: 'play', name: 'Spot navideño — corte A', product: 'Néctar Mango', st: 'error', panel: '0 / 160', cost: '$0.20', dur: '—', date: '4 jun' },
];

function Analyses({ go, campaign, setCampaign, theme, setTheme }) {
  const [f, setF] = useStateP('Todos');
  const base = campaign ? ASSETS.filter(a => a.pkey === campaign.key) : ASSETS;
  const list = base.filter(a => f === 'Todos' || a.kind === f);
  const counts = LIB_FILTERS.reduce((m, k) => { m[k] = k === 'Todos' ? base.length : base.filter(a => a.kind === k).length; return m; }, {});
  const nEval = base.filter(a => a.g === 'pass' || a.g === 'warn' || a.g === 'fail').length;
  const nRun = base.filter(a => a.g === 'run').length + ACTIVE_RUNS.length;
  const activeRuns = campaign ? ACTIVE_RUNS.filter(r => PKEY_OF[r.product] === campaign.key) : ACTIVE_RUNS;
  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="search"><Icon n="search" w={16} /><input placeholder="Buscar piezas o análisis…" /></div>}
        actions={<Btn kind="primary" icon="plus" onClick={() => go('new-pieza')}>Analizar nueva pieza</Btn>} />
      <div className="scroll">
        <div className="ph2">
          <div>
            <h1>Análisis</h1>
            <p>{base.length} piezas · <b style={{ color: 'var(--accent)' }}>{activeRuns.length} en curso</b> · {nEval} evaluadas en el workspace.</p>
          </div>
        </div>

        {campaign && (
          <div className="camp-banner">
            <Icon n="filter" w={15} />
            <span>Mostrando la campaña <b>{campaign.name}</b> · {base.length} {base.length === 1 ? 'pieza' : 'piezas'}</span>
            <button className="camp-clear" onClick={() => { setCampaign(null); setF('Todos'); }}>Ver todas<Icon n="x" w={14} /></button>
          </div>
        )}

        {activeRuns.length > 0 && <>
          <div className="ph2"><div><h2 className="sec-title">En curso</h2></div></div>
          <div className="runs-active">
            {activeRuns.map((r, k) => {
              const pct = r.stage === 0 ? 10 : Math.round(r.done / r.n * 100);
              const metaLeft = r.stage === 0 ? 'Analizando video y audio' : `${r.done} / ${r.n} agentes`;
              return (
                <div className="run-card" key={k}>
                  <div className="rc-top">
                    <span className={`thumb ${r.cls}`}><Icon n={r.icon} w={r.icon === 'play' ? 15 : 16} s={r.icon === 'play' ? 1 : 1.7} /></span>
                    <div className="rc-id"><b>{r.name}</b><small>{r.product} · {r.expo}</small></div>
                  </div>
                  <div className="rc-pipe">
                    {RUN_STAGES.map((s, i) => (
                      <React.Fragment key={s}>
                        <span className={`rp-dot ${i < r.stage ? 'done' : i === r.stage ? 'active' : ''}`} title={s}>
                          {i < r.stage ? <Icon n="check" w={13} /> : i + 1}
                        </span>
                        {i < RUN_STAGES.length - 1 && <span className={`rp-line ${i < r.stage ? 'done' : ''}`} />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="rc-prog">
                    <div className="rc-bar"><i style={{ width: `${pct}%` }} /></div>
                    <div className="rc-pmeta"><span>{metaLeft} · <b style={{ fontWeight: 600 }}>{RUN_STAGES[r.stage]}</b></span><span className="num">{pct}%</span></div>
                  </div>
                  <div className="rc-foot">
                    <div className="rc-stats">
                      <span><Icon n="clock" w={13} /> ETA {r.eta}</span>
                      <span><Icon n="coin" w={13} /> {r.cost}</span>
                    </div>
                    <button className="btn ghost" onClick={() => go('progress')}>Ver progreso</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>}

        <div className="toolbar">
          <div className="tabsec"><h2 className="sec-title">Piezas</h2></div>
          <div className="filters">
            {LIB_FILTERS.map(k => (
              <span key={k} className={`fchip ${f === k ? 'on' : ''}`} onClick={() => setF(k)}>{k}<span className="fc-n num">{counts[k]}</span></span>
            ))}
          </div>
        </div>
        <div className="lib-grid">
          {list.map(a => <PieceCard key={a.id} a={a} go={go} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Products, Personas, Settings, Analyses });
