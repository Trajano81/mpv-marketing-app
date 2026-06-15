/* Prototipo — Dashboard (T2), Progreso (T8), Resultados (T9–T11) */
const { useEffect, useRef } = React;

function scoreColor(v) {
  const t = Math.max(0, Math.min(1, (v - 5) / 4));
  const hue = 4 + t * 122;
  return `hsl(${hue} 58% ${42 - t * 4}%)`;
}

/* ===================== TOPBAR (shared) ===================== */
function Topbar({ left, theme, setTheme, actions }) {
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

/* ===================== DASHBOARD ===================== */
const KPIS = [
  { label: 'Análisis este mes', ic: 'flask', val: '24', delta: '+6 vs. mayo', dcls: 'up', dic: 'up' },
  { label: 'Score compuesto prom.', ic: 'chart', val: '7.2', small: '/10', delta: '+0.3 pts', dcls: 'up', dic: 'up' },
  { label: 'Tasa de aprobación', ic: 'check', val: '58', small: '%', delta: '3 de 5 pasan el gate', dcls: 'flat' },
  { label: 'Agentes corridos', ic: 'users', val: '4,488', delta: '187 prom. por análisis', dcls: 'flat' },
];
const ROWS = [
  { thv: 'v1', name: 'Spot 30s — “Sabor que abraza”', cat: 'Néctar Mango · Bebidas', chan: 'TV abierta', plaza: 'Nacional', panel: '187', comp: '7.8', g: 'pass', gv: '7.9', gl: 'Pasa', st: 'ready', stl: 'Listo', date: '12 jun', open: true },
  { thv: 'v6', name: 'Influencer MTY — receta', cat: 'Néctar Mango · Bebidas', chan: 'TikTok', plaza: 'Monterrey', panel: '110', comp: '8.3', g: 'pass', gv: '8.5', gl: 'Pasa', st: 'ready', stl: 'Listo', date: '7 jun', open: true },
  { thv: 'v3', name: 'Reel @chefcito', cat: 'Tamarindo · Bebidas', chan: 'TikTok', plaza: 'Nacional', panel: '142', comp: '7.1', g: 'warn', gv: '7.3', gl: 'Al límite', st: 'ready', stl: 'Listo', date: '10 jun', open: true },
  { thv: 'v2', img: 1, name: 'Valla Insurgentes Sur', cat: 'Néctar Mango · Bebidas', chan: 'OOH / Valla', plaza: 'CDMX', panel: '96', comp: '6.4', g: 'fail', gv: '6.1', gl: 'Regresa', st: 'ready', stl: 'Listo', date: '11 jun', open: true },
  { thv: 'v5', name: 'Spot 15s — corte', cat: 'Tamarindo · Bebidas', chan: 'TV abierta', plaza: 'Norte', panel: '—', comp: '—', g: 'run', st: 'run', date: '12 jun' },
  { thv: 'v4', img: 1, name: 'Carrusel lanzamiento', cat: 'Néctar Guayaba · Bebidas', chan: 'Instagram', plaza: '—', panel: '—', comp: '—', g: 'draft', st: 'draft', stl: 'Borrador', date: '9 jun' },
];

function Dashboard({ go, theme, setTheme }) {
  return (
    <div className="main">
      <Topbar theme={theme} setTheme={setTheme}
        left={<div className="search"><Icon n="search" w={16} /><input placeholder="Buscar productos, piezas, evaluaciones…" /></div>}
        actions={<Btn kind="primary" icon="plus" onClick={() => go('w1')}>Nuevo análisis</Btn>} />
      <div className="scroll">
        <div className="page-head">
          <div><h1>Evaluaciones</h1><p>Pre-tests de tus piezas, evaluadas por el panel sintético de consumidores.</p></div>
        </div>
        <div className="kpis">
          {KPIS.map(k => (
            <div className="kpi" key={k.label}>
              <div className="kpi-top"><span className="kpi-label">{k.label}</span><span className="kpi-ic"><Icon n={k.ic} w={16} /></span></div>
              <div className="kpi-val num">{k.val}{k.small && <small> {k.small}</small>}</div>
              <span className={`kpi-delta ${k.dcls}`}>{k.dic && <Icon n={k.dic} w={13} />}{k.delta}</span>
            </div>
          ))}
        </div>
        <div className="toolbar">
          <div className="tabs">
            <span className="tab is-active">Todas <span className="pill">12</span></span>
            <span className="tab">Listo</span><span className="tab">En análisis</span><span className="tab">Borrador</span>
          </div>
          <div className="right"><Btn kind="ghost" icon="filter">NSE · Ciudad</Btn></div>
        </div>
        <div className="table">
          <div className="thead">
            <span>Pieza</span><span>Exposición</span><span>Panel</span><span>Compuesto</span><span>Intención · Gate</span><span>Estado</span><span>Fecha</span>
          </div>
          <div className="rows">
            {ROWS.map((r, i) => (
              <div className="row" key={i} style={{ cursor: r.open ? 'pointer' : 'default' }} onClick={() => r.open && go('results')}>
                <div className="cell piece">
                  <span className={`thumb ${r.thv}`}><Icon n={r.img ? 'image' : 'play'} w={r.img ? 17 : 16} s={r.img ? 1.7 : 1} /></span>
                  <span className="piece-meta"><b>{r.name}</b><small>{r.cat}</small></span>
                </div>
                <div className="cell expo"><b>{r.chan}</b><small>{r.plaza}</small></div>
                <div className="cell num">{r.panel}</div>
                <div className="cell"><span className={`score-pill ${r.comp === '—' ? 'muted' : ''}`}>{r.comp}</span></div>
                <div className="cell">
                  {r.g === 'pass' && <span className="gate"><span className="gate-dot" style={{ background: 'var(--pass)' }} /><span className="gate-num num">{r.gv}</span> <span className="tag pass"><Icon n="check" w={12} />{r.gl}</span></span>}
                  {r.g === 'warn' && <span className="gate"><span className="gate-dot" style={{ background: 'var(--warn)' }} /><span className="gate-num num">{r.gv}</span> <span className="tag warn">{r.gl}</span></span>}
                  {r.g === 'fail' && <span className="gate"><span className="gate-dot" style={{ background: 'var(--fail)' }} /><span className="gate-num num">{r.gv}</span> <span className="tag fail">{r.gl}</span></span>}
                  {r.g === 'run' && <span className="tag neutral">Procesando</span>}
                  {r.g === 'draft' && <span className="tag neutral">Sin correr</span>}
                </div>
                <div className="cell">
                  {r.st === 'ready' && <span className="state ready"><span className="dot" />{r.stl}</span>}
                  {r.st === 'run' && <span className="state run"><span className="dot" />Fan-out 64%<span className="mini-prog"><i style={{ width: '64%' }} /></span></span>}
                  {r.st === 'draft' && <span className="state draft"><span className="dot" />{r.stl}</span>}
                </div>
                <div className="cell date">{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== PROGRESS ===================== */
const FLOW = [
  { ic: 'eye', t: 'Percepción multimodal', d: 'Gemini analiza video, audio y texto en pantalla' },
  { ic: 'users', t: 'Fan-out a personas', d: 'N llamadas paralelas · caching de prefijo compartido' },
  { ic: 'chart', t: 'Agregación ponderada', d: 'Score compuesto + gate de intención por segmento' },
  { ic: 'doc', t: 'Reporte y recomendaciones', d: 'Agente recomendador + PDF + persistencia' },
];
function Progress({ go, theme, setTheme }) {
  const [p, setP] = useState(4);
  const [agents, setAgents] = useState(0);
  const done = p >= 100;
  useEffect(() => {
    const id = setInterval(() => setP(v => Math.min(100, v + 2)), 90);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { setAgents(Math.round(p / 100 * 187)); }, [p]);
  const stage = done ? 4 : Math.min(3, Math.floor(p / 26));
  return (
    <div className="main">
      <Topbar theme={theme} setTheme={setTheme}
        left={<div className="crumbs">Evaluaciones · <b>Néctar Aurora Mango</b></div>} />
      <div className="prog-wrap">
        <div className="prog-card">
          <div className="prog-head">
            <div className="prog-ring" style={{ '--p': p }}><b className="num">{p}%</b></div>
            <h1>{done ? 'Análisis completo' : 'Evaluando la pieza…'}</h1>
            <p>{done ? 'El reporte está listo.' : `${agents} de 187 agentes han respondido la encuesta`}</p>
          </div>
          <div className="steps-flow">
            {FLOW.map((f, i) => (
              <div className={`flow-step ${i < stage ? 'done' : i === stage && !done ? 'active' : ''}`} key={i}>
                <span className="fi"><Icon n={i < stage ? 'check' : i === stage && !done ? 'refresh' : f.ic} w={15} /></span>
                <div className="fbody"><b>{f.t}</b><small>{f.d}</small></div>
                <span className="flow-meta">{i < stage ? 'OK' : i === stage && !done ? 'en curso' : '—'}</span>
              </div>
            ))}
          </div>
          {done && <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
            <Btn kind="primary" cls="big" iconR="arrowR" onClick={() => go('results')}>Ver resultados</Btn>
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ===================== RESULTS shell ===================== */
function ResultsShell({ route, go, theme, setTheme, children }) {
  const tabs = [['results', 'Vista ejecutiva'], ['desglose', 'Desglose'], ['recos', 'Recomendaciones']];
  return (
    <div className="main">
      <Topbar theme={theme} setTheme={setTheme}
        left={<div className="crumbs">Evaluaciones · <b>Néctar Aurora Mango</b></div>}
        actions={<><Btn kind="ghost" icon="share">Compartir</Btn><Btn kind="primary" icon="download">Exportar PDF</Btn></>} />
      <div className="scroll">
        <div className="res-head">
          <div className="res-piece">
            <span className="thumb big v1"><Icon n="play" w={26} s={1} /></span>
            <div>
              <h1>Spot 30s — “Sabor que abraza”</h1>
              <div className="res-meta">
                <span className="chip">Video</span><span className="chip">TV abierta · Nacional</span>
                <span className="chip">Néctar Aurora Mango</span><span className="chip accent">Panel N = 187</span>
                <span className="chip">12 jun 2026</span>
              </div>
            </div>
          </div>
          <div className="res-tabs">
            {tabs.map(([id, l]) => <a key={id} className={route === id ? 'is-active' : ''} onClick={() => go(id)}>{l}</a>)}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

const RES_DIMS = [
  ['Relevancia cultural', 'Diferenciador MX', '8.4', 84, 65, 'strong'],
  ['Atractivo (Enjoyment)', 'Kantar LINK', '8.0', 80, 71, ''],
  ['Claridad del mensaje', 'Kantar LINK', '7.9', 79, 70, ''],
  ['Intención de compra', 'Actionable standard', '7.9', 79, 69, ''],
  ['Memorabilidad', 'LINK / System1', '7.6', 76, 68, ''],
  ['Distintividad', 'Ehrenberg-Bass', '7.0', 70, 66, ''],
  ['Vínculo de marca (Fluency)', 'System1', '6.2', 62, 69, 'weak'],
];
const HEAT = [['A/B', '8.6', '11%'], ['C+', '8.1', '14%'], ['C', '7.7', '19%'], ['C−', '7.4', '17%'], ['D+', '6.8', '21%'], ['D', '5.9', '13%'], ['E', '5.1', '5%']];

function ResultsExec() {
  return (
    <>
      <div className="hero">
        <div className="hero-card score">
          <span className="eyebrow">Índice de Efectividad Creativa</span>
          <div className="gauge" style={{ '--val': 78 }}><div className="gauge-num"><b className="num">7.8</b><small>/ 10</small></div></div>
          <div className="score-foot"><b>+0.9</b> sobre el promedio de categoría (6.9)</div>
        </div>
        <div className="hero-card gate">
          <span className="eyebrow">Gate · Intención de compra</span>
          <div className="gate-big"><b className="num">7.9</b><span className="gate-vs">vs. umbral 7.5</span></div>
          <div className="gate-status">
            <span className="tag pass"><Icon n="check" w={12} /> La pieza pasa</span>
            <p>La intención de compra ponderada supera el umbral del workspace. Avanza a producción.</p>
          </div>
          <div className="gate-meter"><i style={{ width: '79%' }} /><span className="thresh" style={{ left: '75%' }} /></div>
        </div>
        <div className="hero-card verdict">
          <span className="eyebrow">Lectura rápida</span>
          <ul className="verdict-list">
            <li className="up"><Icon n="up" w={16} /><span><b>Relevancia cultural alta (8.4).</b> “Esto me habla a mí” — la pieza conecta.</span></li>
            <li className="up"><Icon n="up" w={16} /><span><b>Atractivo y memorabilidad fuertes.</b> Entretiene y se recuerda.</span></li>
            <li className="down"><Icon n="down" w={16} /><span><b>Vínculo de marca débil (6.2).</b> Recuerdan el spot, no la marca.</span></li>
            <li className="down"><Icon n="down" w={16} /><span><b>NSE D+ hacia abajo</b> queda por debajo del umbral.</span></li>
          </ul>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><h2>Diagnóstico por dimensión</h2><span className="legend">marcador = promedio de categoría</span></div>
        <div className="dim-list">
          {RES_DIMS.map(d => (
            <div className="dim" key={d[0]}>
              <div className="dim-name">{d[0]}<small>{d[1]}</small></div>
              <div className="track"><div className={`fill ${d[5]}`} style={{ width: `${d[3]}%` }} /><div className="avg-mark" style={{ left: `${d[4]}%` }} /></div>
              <div className="dim-val num">{d[2]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h2>Intención por nivel socioeconómico</h2></div>
          <div className="heat-grid">
            {HEAT.map(h => (
              <div className="heatcell" key={h[0]} style={{ background: scoreColor(+h[1]) }}>
                <div className="nse">{h[0]}</div><div className="hv num">{h[1]}</div><div className="wt">{h[2]}</div>
              </div>
            ))}
          </div>
          <p className="heat-note">El gate se cumple en <b>A/B–C</b>; se pierde de <b>C−</b> hacia abajo. La pieza no le habla a los segmentos bajos — coherente con el claim aspiracional.</p>
        </div>
        <div className="panel verbatims">
          <div className="panel-head"><h2>Verbatims</h2></div>
          <div className="vquote"><p>“El color del mango se ve bien rico, se me antojó desde el primer cuadro.”</p><div className="who"><span className="nse-tag">C</span> Mujer, 34 · Guadalajara</div></div>
          <div className="vquote"><p>“Bonito el comercial… pero, ¿de qué marca era?”</p><div className="who"><span className="nse-tag">C+</span> Hombre, 41 · CDMX</div></div>
          <div className="vquote"><p>“Se siente caro, como que no es para mí.”</p><div className="who"><span className="nse-tag">D+</span> Mujer, 52 · Oaxaca</div></div>
        </div>
      </div>
    </>
  );
}

/* ===================== DESGLOSE (T10) ===================== */
const MX_CITIES = ['CDMX', 'Guadalajara', 'Monterrey', 'Norte'];
const MX_DATA = {
  'A/B': [8.8, 8.5, 8.7, 8.4], 'C+': [8.3, 8.0, 8.2, 7.9], 'C': [7.9, 7.6, 7.8, 7.4],
  'C−': [7.5, 7.2, 7.6, 7.0], 'D+': [6.9, 6.6, 7.1, 6.2], 'D': [6.1, 5.8, 6.4, 5.4], 'E': [5.3, 5.0, 5.6, 4.6],
};
function Desglose() {
  const [city, setCity] = useState('Todas');
  return (
    <>
      <div className="panel" style={{ marginBottom: 'var(--gap)' }}>
        <div className="filters">
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Filtrar</span>
          {['Todas', ...MX_CITIES].map(c => <span key={c} className={`fchip ${city === c ? 'on' : ''}`} onClick={() => setCity(c)}><Icon n="pin" w={13} />{c}</span>)}
          <span className="fchip"><Icon n="sliders" w={13} />Ingreso</span>
          <span className="fchip"><Icon n="users" w={13} />Edad</span>
        </div>
      </div>
      <div className="panel" style={{ marginBottom: 'var(--gap)' }}>
        <div className="panel-head"><h2>Intención de compra · NSE × Ciudad</h2><span className="legend">heatmap · escala 5–9</span></div>
        <table className="matrix">
          <thead><tr><th className="rowh"></th>{MX_CITIES.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {Object.entries(MX_DATA).map(([nse, vals]) => (
              <tr key={nse}>
                <td className="rowlbl">NSE {nse}</td>
                {vals.map((v, i) => <td key={i}><div className="mcell" style={{ background: scoreColor(v), opacity: city === 'Todas' || city === MX_CITIES[i] ? 1 : 0.28 }}>{v.toFixed(1)}</div></td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="heat-note">El <b>Norte</b> penaliza más el claim aspiracional en NSE bajos; <b>Monterrey</b> sostiene mejor intención que CDMX en C/C−.</p>
      </div>
      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h2>Comparador de piezas</h2></div>
          <div className="cmp-list">
            {[['v6', 'Influencer MTY', '8.3', 'pass', '8.5'], ['v1', 'Spot 30s — Sabor', '7.8', 'pass', '7.9'], ['v3', 'Reel @chefcito', '7.1', 'warn', '7.3'], ['v2', 'Valla Insurgentes', '6.4', 'fail', '6.1']].map(c => (
              <div className="cmp-item" key={c[1]}>
                <div className="cmp-name"><span className={`thumb ${c[0]}`} style={{ width: 36, height: 27 }}><Icon n="play" w={13} s={1} /></span>{c[1]}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="score-pill">{c[2]}</span>
                  <span className={`tag ${c[3]}`}>{c[3] === 'pass' ? <><Icon n="check" w={12} />Pasa</> : c[3] === 'warn' ? 'Al límite' : 'Regresa'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel verbatims">
          <div className="panel-head"><h2>Objeciones top</h2></div>
          <div className="vquote"><p>“No queda claro de qué marca es el comercial.”</p><div className="who"><span className="nse-tag">Fluency</span> 38% de las menciones</div></div>
          <div className="vquote"><p>“El precio se percibe alto para lo que es.”</p><div className="who"><span className="nse-tag">Precio</span> 24% · concentrado en D+/D</div></div>
          <div className="vquote"><p>“Muy bonito pero no me dice por qué comprarlo.”</p><div className="who"><span className="nse-tag">Claridad</span> 16%</div></div>
        </div>
      </div>
    </>
  );
}

/* ===================== RECOMENDACIONES (T11) ===================== */
const RECOS = [
  { sev: 'high', ic: 'brand', t: 'Refuerza el vínculo de marca (Fluency)', p: 'Recuerdan el spot pero no la marca. Introduce el logo de Aurora antes del segundo 3 y repítelo en el cierre; integra el nombre en el jingle. No reescribas la pieza — es un ajuste de branding.', why: 'Vínculo de marca 6.2 vs. categoría 6.9 · 38% de objeciones mencionan no recordar la marca.' },
  { sev: 'med', ic: 'users', t: 'Adapta el claim para NSE C−/D+', p: 'El claim aspiracional pierde fuerza de C− hacia abajo. Prueba una variante con foco en valor y rendimiento (“rinde más, sabe a casa”) para las plazas del Norte.', why: 'Intención cae a 6.8 en D+ y 5.9 en D · el Norte penaliza más.' },
  { sev: 'med', ic: 'coin', t: 'Atiende la percepción de precio', p: 'En segmentos bajos se percibe caro. Considera comunicar presentación familiar o precio por litro en la pieza de OOH.', why: '24% de objeciones de precio, concentradas en D+/D.' },
  { sev: 'low', ic: 'spark', t: 'Capitaliza la relevancia cultural', p: 'La dimensión más fuerte (8.4). Mantén los códigos de “sabor de casa” y considera extender la narrativa a la versión de 15s.', why: 'Relevancia cultural 8.4 vs. categoría 6.5 — tu mayor ventaja.' },
];
function Recos() {
  return (
    <>
      <div className="panel" style={{ marginBottom: 'var(--gap)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="reco-ic" style={{ width: 44, height: 44 }}><Icon n="bulb" w={22} /></span>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--h-weight)', fontSize: 16 }}>Recomendaciones del agente</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 3 }}>Mejoras concretas a la pieza y al producto, derivadas de objeciones y dimensiones bajas.</p>
        </div>
        <Btn kind="primary" icon="download">Exportar PDF</Btn>
      </div>
      <div className="reco-list">
        {RECOS.map((r, i) => (
          <div className="reco-card" key={i}>
            <span className={`reco-sev ${r.sev}`} />
            <span className="reco-ic"><Icon n={r.ic} w={19} /></span>
            <div className="reco-body">
              <div className="rtop"><h3>{r.t}</h3><span className={`tag ${r.sev === 'high' ? 'fail' : r.sev === 'med' ? 'warn' : 'pass'}`}>{r.sev === 'high' ? 'Prioridad alta' : r.sev === 'med' ? 'Media' : 'Oportunidad'}</span></div>
              <p>{r.p}</p>
              <div className="rwhy"><b>Por qué:</b> {r.why}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { Dashboard, Progress, ResultsShell, ResultsExec, Desglose, Recos });
