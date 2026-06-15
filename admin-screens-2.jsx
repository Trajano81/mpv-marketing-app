/* Admin SPA — A6 Dimensiones/umbral, A7 Modelos/APIs, A8 Monitor, A9 Insights */
const { useState: useStateB } = React;

/* ============ A6 · DIMENSIONES Y UMBRAL ============ */
const SCORE_DIMS = [
  ['Memorabilidad / recordación', '¿Se queda en la cabeza?', 'LINK / System1', 12],
  ['Atractivo (Enjoyment)', '¿Gusta, entretiene?', 'Kantar LINK', 16],
  ['Vínculo con marca (Fluency)', '¿Recuerdan qué marca era?', 'System1 / LINK', 14],
  ['Claridad del mensaje', '¿Se entiende qué vende?', 'Kantar LINK', 14],
  ['Relevancia cultural', '“Esto me habla a mí”', 'Diferenciador MX', 18],
  ['Distintividad', '¿Se distingue de la categoría?', 'Ehrenberg-Bass', 6],
  ['Intención de compra', '¿Lo compraría?', 'Actionable standard', 20],
];
function A6({ theme, setTheme }) {
  const [w, setW] = useStateB(SCORE_DIMS.map(d => d[3]));
  const [thr, setThr] = useStateB(7.5);
  const total = w.reduce((a, b) => a + b, 0);
  return (
    <div className="main">
      <AdminTopbar title="Dimensiones de score y umbral" sub="Léxico de copy testing (LINK / System1) · pesos por defecto globales" theme={theme} setTheme={setTheme}
        actions={<Btn kind="primary" icon="check">Guardar cambios</Btn>} />
      <div className="scroll">
        <div className="two-60">
          <div className="panel">
            <div className="panel-head"><h2>Índice de Efectividad Creativa</h2><span className="legend">suma {total}%</span></div>
            <div className="weights" style={{ maxWidth: 'none' }}>
              {SCORE_DIMS.map((d, i) => (
                <div className="wrow" key={d[0]} style={{ gridTemplateColumns: '260px 1fr 44px' }}>
                  <span className="wn">{d[0]}<small style={{ display: 'block', color: 'var(--ink-3)', fontWeight: 500, fontSize: 10.5 }}>{d[2]}</small></span>
                  <input className="range" type="range" min="0" max="30" value={w[i]} onChange={e => setW(s => s.map((v, j) => j === i ? +e.target.value : v))} />
                  <span className="wv num">{w[i]}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="panel" style={{ marginBottom: 'var(--card-gap)' }}>
              <div className="panel-head"><h2>Umbral estándar global</h2></div>
              <div className="thresh-box" style={{ maxWidth: 'none' }}>
                <span className="tv num">{thr.toFixed(1)}</span>
                <div className="tt"><b>Gate de intención de compra</b><p>El gate se aplica sobre la intención, no sobre el compuesto. Cada tenant puede sobreescribirlo.</p></div>
              </div>
              <input className="range" type="range" min="5" max="9" step="0.1" value={thr} onChange={e => setThr(+e.target.value)} style={{ width: '100%', marginTop: 16 }} />
            </div>
            <div className="panel">
              <div className="panel-head"><h2>Regla del gate</h2></div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>Intención de compra ponderada <b style={{ color: 'var(--ink)' }}>&lt; umbral</b> → la pieza <b style={{ color: 'var(--fail)' }}>regresa a creatividad</b>. El compuesto sirve para diagnosticar el porqué.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ A7 · MODELOS / APIs ============ */
const PROVIDERS = [
  { task: 'Percepción de video', prov: 'Google Gemini 3.x', note: 'Ingesta nativa · 1 FPS + audio', c: '#4F86FF', ini: 'G' },
  { task: 'Simulación de personas', prov: 'DeepSeek V4 Flash', note: 'Prefijo compartido → caching', c: '#9B7DF0', ini: 'D' },
  { task: 'Recomendador', prov: 'Anthropic Claude', note: 'Razonamiento · objeciones', c: '#E8623D', ini: 'C' },
];
const PROMPTS = {
  'Percepción': `Analiza el ASSET y devuelve JSON estructurado.
# Salida (structured output)
escenas[], colores[], audio_musica,
personajes[], texto_en_pantalla[], claims[],
precio_percibido, momentos_de_marca[] con timestamps.
# Reglas
- Descripción NEUTRAL, sin juicio de valor.
- No infieras intención de compra aquí.`,
  'Persona': `Eres {{persona.nombre}}, NSE {{persona.nse}} de
{{persona.geo.estado}}. Ingreso {{persona.economia.ingreso}}.
Valores: {{persona.cultura.valores}}.
# Tarea
Responde la ENCUESTA sobre la pieza descrita.
Puntúa cada dimensión 0–10 según TU perfil.
Si la pieza no te habla, di por qué (fuera de target).`,
  'Recomendador': `Dadas las objeciones top y las dimensiones bajas,
propón mejoras CONCRETAS a la pieza y al producto.
# Prioriza
1. Dimensión más baja vs. categoría.
2. Objeción más frecuente por segmento.
No reescribas toda la pieza si el problema es de branding.`,
};
function highlight(text) {
  return text.split('\n').map((line, i) => {
    if (line.trim().startsWith('#')) return <div key={i}><span className="cmt">{line}</span></div>;
    const parts = line.split(/(\{\{[^}]+\}\})/g);
    return <div key={i}>{parts.map((p, j) => /\{\{/.test(p) ? <span className="tok" key={j}>{p}</span> : p)}</div>;
  });
}
function A7({ theme, setTheme }) {
  const [tab, setTab] = useStateB('Percepción');
  return (
    <div className="main">
      <AdminTopbar title="Configuración de modelos / APIs" sub="Proveedor multimodal por tarea y edición de prompts de agentes" theme={theme} setTheme={setTheme}
        actions={<Btn kind="ghost" icon="refresh">Probar conexión</Btn>} />
      <div className="scroll">
        <div className="provider-grid">
          {PROVIDERS.map(p => (
            <div className="provider-card" key={p.task}>
              <span className="pc-task">{p.task}</span>
              <div className="pc-prov">
                <span className="pc-logo" style={{ background: p.c }}>{p.ini}</span>
                <span className="pc-name"><b>{p.prov}</b><small>{p.note}</small></span>
              </div>
              <span className="pc-status"><span className="sd" /> Conectado</span>
            </div>
          ))}
        </div>
        <div className="prompt-editor">
          <div className="pe-head">
            <div className="pe-tabs">
              {Object.keys(PROMPTS).map(k => <span key={k} className={`pe-tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>Agente · {k}</span>)}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}><Btn kind="ghost" icon="edit">Editar</Btn></div>
          </div>
          <div className="pe-body">{highlight(PROMPTS[tab])}</div>
        </div>
      </div>
    </div>
  );
}

/* ============ A8 · MONITOR DE EJECUCIONES ============ */
const RUNS = [
  { id: 'run_8f2a', t: 'Aurora Bebidas', p: 'Spot 30s — Sabor', st: 'done', ag: '187', co: '$4.10', la: '2m51s' },
  { id: 'run_8f29', t: 'Móvil Conecta', p: 'Promo portabilidad 15s', st: 'run', ag: '96/142', co: '$2.05', la: '1m04s' },
  { id: 'run_8f27', t: 'Banco Norte', p: 'Crédito PyME', st: 'done', ag: '210', co: '$5.40', la: '3m18s' },
  { id: 'run_8f24', t: 'Snacks del Sol', p: 'Valla OOH lanzamiento', st: 'error', ag: '0', co: '$0.12', la: '—' },
  { id: 'run_8f22', t: 'Lácteos Bonvida', p: 'Reel receta', st: 'done', ag: '142', co: '$3.20', la: '2m12s' },
  { id: 'run_8f1f', t: 'Moda Reyna', p: 'Campaña temporada', st: 'retry', ag: '58/130', co: '$1.40', la: '0m48s' },
  { id: 'run_8f1c', t: 'AutoMex', p: 'Test drive teaser', st: 'done', ag: '120', co: '$2.90', la: '2m33s' },
];
function runTag(st) {
  if (st === 'done') return <span className="tag pass"><Icon n="check" w={12} />Listo</span>;
  if (st === 'run') return <span className="state run"><span className="dot" />En curso</span>;
  if (st === 'retry') return <span className="tag warn">Reintentando</span>;
  return <span className="tag fail">Error</span>;
}
function A8({ theme, setTheme }) {
  const [f, setF] = useStateB('Todas');
  const map = { 'Todas': null, 'Listo': 'done', 'En curso': 'run', 'Error': 'error' };
  const rows = RUNS.filter(r => !map[f] || r.st === map[f] || (f === 'En curso' && r.st === 'retry'));
  return (
    <div className="main">
      <AdminTopbar title="Monitor de ejecuciones" sub="Runs con costo, latencia, errores y reintentos" theme={theme} setTheme={setTheme}
        actions={<Btn kind="ghost" icon="refresh">Actualizar</Btn>} />
      <div className="scroll">
        <div className="filters" style={{ marginBottom: 16 }}>
          {['Todas', 'Listo', 'En curso', 'Error'].map(x => <span key={x} className={`fchip ${f === x ? 'on' : ''}`} onClick={() => setF(x)}>{x}</span>)}
        </div>
        <div className="table t-monitor">
          <div className="thead"><span>Run</span><span>Tenant · pieza</span><span>Estado</span><span>Agentes</span><span>Costo</span><span>Latencia</span></div>
          <div className="rows">
            {rows.map((r, i) => (
              <div className="row" key={i}>
                <div className="cell"><span className="num" style={{ fontSize: 12.5, color: 'var(--ink)' }}>{r.id}</span></div>
                <div className="cell piece"><span className="piece-meta"><b>{r.t}</b><small>{r.p}</small></span></div>
                <div className="cell">{runTag(r.st)}{(r.st === 'error' || r.st === 'retry') && <span className="iconbtn" style={{ marginLeft: 8, display: 'inline-grid', verticalAlign: 'middle' }}><Icon n="refresh" w={14} /></span>}</div>
                <div className="cell num">{r.ag}</div>
                <div className="cell num">{r.co}</div>
                <div className="cell num">{r.la}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ A9 · MEMORIA / INSIGHTS ============ */
const PATTERNS = [
  { tags: ['Bebidas', 'NSE C−/D+', 'Norte'], h: 'Los claims aspiracionales penalizan en NSE bajos del norte', p: 'En 23 evaluaciones de bebidas, la intención cae −1.8 pts en promedio cuando el claim es aspiracional vs. práctico.', v: '−1.8', l: 'Δ intención', bar: 72, sev: 'fail' },
  { tags: ['Todas', 'Fluency'], h: 'El vínculo de marca es la dimensión más débil del portafolio', p: 'Aparece bajo el promedio en 61% de las piezas: recuerdan el anuncio, no la marca.', v: '61%', l: 'piezas afectadas', bar: 61, sev: 'warn' },
  { tags: ['Snacks', 'TikTok', 'Gen Z'], h: 'Influencer en TikTok eleva memorabilidad en jóvenes urbanos', p: 'Las piezas de influencer superan en +1.4 pts la memorabilidad de TV abierta para NSE C en 18–34.', v: '+1.4', l: 'Δ memorabilidad', bar: 58, sev: 'pass' },
];
const EVALS = [
  ['Bebidas', '7.8', 'A/B 8.6 · C 7.7 · D+ 6.8', 'good'],
  ['Telecom', '6.9', 'A/B 7.4 · C 6.9 · D+ 6.1', 'mid'],
  ['Financiero', '7.2', 'A/B 8.1 · C 7.0 · D+ 5.9', 'good'],
  ['Snacks', '8.3', 'A/B 8.0 · C 8.4 · D+ 8.1', 'good'],
  ['Retail', '6.4', 'A/B 7.0 · C 6.3 · D+ 5.4', 'bad'],
];
function A9({ theme, setTheme }) {
  return (
    <div className="main">
      <AdminTopbar title="Memoria · insights incrementales" sub="Patrones acumulados por categoría, NSE y región · base de calibración" theme={theme} setTheme={setTheme}
        actions={<Btn kind="ghost" icon="download">Exportar JSON</Btn>} />
      <div className="scroll">
        <div className="filters" style={{ marginBottom: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Filtrar</span>
          <span className="fchip on"><Icon n="grid" w={13} />Categoría</span>
          <span className="fchip"><Icon n="users" w={13} />NSE</span>
          <span className="fchip"><Icon n="pin" w={13} />Región</span>
        </div>
        <div className="asec">
          <div className="asec-head"><div><h2>Patrones detectados</h2><p>Hallazgos recurrentes en el store de evaluaciones pasadas.</p></div></div>
          <div className="pattern-list">
            {PATTERNS.map((pt, i) => (
              <div className="pattern-card" key={i}>
                <div>
                  <div className="pt-tags">{pt.tags.map(t => <span className="chip accent" key={t}>{t}</span>)}</div>
                  <h3>{pt.h}</h3>
                  <p>{pt.p}</p>
                </div>
                <div className="pattern-meter">
                  <div className="pm-l">{pt.l}</div>
                  <div className="pm-v" style={{ color: `var(--${pt.sev})` }}>{pt.v}</div>
                  <div className="pm-bar"><i style={{ width: `${pt.bar}%`, background: `var(--${pt.sev})` }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="asec">
          <div className="asec-head"><div><h2>Evaluaciones pasadas</h2><p>Registro append-only · base para predicción-vs-real.</p></div></div>
          <div className="table t-eval">
            <div className="thead"><span>Categoría</span><span>Score global</span><span>Desglose NSE</span><span>Calibración</span><span></span></div>
            <div className="rows">
              {EVALS.map((e, i) => (
                <div className="row" key={i}>
                  <div className="cell"><b style={{ color: 'var(--ink)', fontSize: 13 }}>{e[0]}</b></div>
                  <div className="cell"><span className="score-pill">{e[1]}</span></div>
                  <div className="cell num" style={{ fontSize: 12 }}>{e[2]}</div>
                  <div className="cell"><span className={`calib ${e[3]}`}><Icon n={e[3] === 'bad' ? 'down' : 'check'} w={13} />{e[3] === 'good' ? 'Alta' : e[3] === 'mid' ? 'Media' : 'Por calibrar'}</span></div>
                  <div className="cell"><div className="row-actions"><span className="iconbtn"><Icon n="eye" w={15} /></span></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { A6, A7, A8, A9 });
