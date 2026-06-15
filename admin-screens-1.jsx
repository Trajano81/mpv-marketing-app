/* Admin SPA — A1 Panorama, A2 Tenants, A3 Segmentación, A4 Perfiles, A5 Preguntas */
const { useState: useStateA } = React;

const TH = ['#4F86FF', '#22A7C0', '#9B7DF0', '#E8623D', '#2DB6D6', '#3B82F6', '#64748B', '#34D399'];

/* ============ A1 · PANORAMA ============ */
const A_METRICS = [
  { l: 'Tenants activos', ic: 'users', v: '18', d: '+2 este mes', dc: 'up' },
  { l: 'Evaluaciones', ic: 'flask', v: '1,284', d: '+148 este mes', dc: 'up' },
  { l: 'Agentes corridos', ic: 'idcard', v: '241k', d: '187 prom./run', dc: '' },
  { l: 'Costo del mes', ic: 'coin', v: '$3,920', d: 'caching −38%', dc: 'up' },
  { l: 'Latencia p50', ic: 'clock', v: '2m48s', d: 'fan-out paralelo', dc: '' },
  { l: 'Tasa de error', ic: 'pulse', v: '0.8', small: '%', d: '−0.3 pts', dc: 'up' },
];
const WEEKS = [42, 55, 48, 67, 72, 61, 84, 78];
const CATS = [['Bebidas', 38], ['Alimentos', 22], ['Cuidado personal', 16], ['Retail', 12], ['Telecom', 7], ['Otros', 5]];
const RECENT = [
  { t: 'Aurora Bebidas', tc: 0, p: 'Spot 30s — Sabor que abraza', st: 'done', ag: '187', co: '$4.10', la: '2m51s', dt: '12 jun' },
  { t: 'Lácteos Bonvida', tc: 1, p: 'Reel receta — influencer', st: 'done', ag: '142', co: '$3.20', la: '2m12s', dt: '12 jun' },
  { t: 'Móvil Conecta', tc: 2, p: 'Promo portabilidad 15s', st: 'run', ag: '96', co: '$2.05', la: '—', dt: '12 jun' },
  { t: 'Banco Norte', tc: 3, p: 'Campaña crédito PyME', st: 'done', ag: '210', co: '$5.40', la: '3m18s', dt: '11 jun' },
  { t: 'Snacks del Sol', tc: 4, p: 'Valla OOH — lanzamiento', st: 'error', ag: '0', co: '$0.12', la: '—', dt: '11 jun' },
];
function stTag(st) {
  if (st === 'done') return <span className="tag pass"><Icon n="check" w={12} />Listo</span>;
  if (st === 'run') return <span className="state run"><span className="dot" />En curso</span>;
  if (st === 'error') return <span className="tag fail">Error</span>;
  return <span className="tag neutral">—</span>;
}
function A1({ theme, setTheme }) {
  const max = Math.max(...WEEKS);
  return (
    <div className="main">
      <AdminTopbar title="Panorama" sub="Salud de la plataforma · junio 2026" theme={theme} setTheme={setTheme}
        actions={<Btn kind="ghost" icon="download">Exportar</Btn>} />
      <div className="scroll">
        <div className="metrics" style={{ gridTemplateColumns: 'repeat(6,1fr)' }}>
          {A_METRICS.map(m => (
            <div className="metric" key={m.l}>
              <span className="ml"><Icon n={m.ic} w={14} />{m.l}</span>
              <span className="mv num">{m.v}{m.small && <small>{m.small}</small>}</span>
              <span className={`md ${m.dc}`}>{m.d}</span>
            </div>
          ))}
        </div>
        <div className="two-60">
          <div className="panel">
            <div className="panel-head"><h2>Evaluaciones por semana</h2><span className="legend">últimas 8</span></div>
            <div className="barchart">
              {WEEKS.map((w, i) => (
                <div className="bc" key={i}><i className={i === WEEKS.length - 1 ? '' : ''} style={{ height: `${w / max * 100}%`, background: i === WEEKS.length - 1 ? 'var(--accent)' : 'var(--ring-track)' }} /><span>S{i + 1}</span></div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><h2>Por categoría</h2></div>
            <div className="pp-bars" style={{ marginTop: 0 }}>
              {CATS.map(c => (
                <div className="pp-bar" key={c[0]}>
                  <div className="pp-bt"><b>{c[0]}</b><span className="num">{c[1]}%</span></div>
                  <div className="pp-track"><i style={{ width: `${c[1] * 2.6}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="asec" style={{ marginTop: 'var(--gap)' }}>
          <div className="asec-head"><div><h2>Runs recientes</h2></div><Btn kind="ghost" onClick={() => go_a8()}>Ver monitor</Btn></div>
          <div className="table t-runs">
            <div className="thead"><span>Tenant</span><span>Pieza</span><span>Estado</span><span>Agentes</span><span>Costo</span><span>Latencia</span><span>Fecha</span></div>
            <div className="rows">
              {RECENT.map((r, i) => (
                <div className="row" key={i}>
                  <div className="cell piece"><span className="tlogo" style={{ background: TH[r.tc] }}>{r.t.split(' ').map(w => w[0]).slice(0, 2).join('')}</span><b style={{ fontSize: 13 }}>{r.t}</b></div>
                  <div className="cell">{r.p}</div>
                  <div className="cell">{stTag(r.st)}</div>
                  <div className="cell num">{r.ag}</div>
                  <div className="cell num">{r.co}</div>
                  <div className="cell num">{r.la}</div>
                  <div className="cell date">{r.dt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
let go_a8 = () => {};

/* ============ A2 · TENANTS ============ */
const TENANTS = [
  { n: 'Aurora Bebidas', c: 0, plan: 'Enterprise', u: 12, used: 3600, lim: 5000, thr: '7.5', st: 'ok' },
  { n: 'Lácteos Bonvida', c: 1, plan: 'Pro', u: 6, used: 2200, lim: 3000, thr: '7.2', st: 'ok' },
  { n: 'Móvil Conecta', c: 2, plan: 'Enterprise', u: 18, used: 9100, lim: 10000, thr: '8.0', st: 'warn' },
  { n: 'Banco Norte', c: 3, plan: 'Pro', u: 9, used: 1500, lim: 3000, thr: '7.5', st: 'ok' },
  { n: 'Snacks del Sol', c: 4, plan: 'Starter', u: 3, used: 980, lim: 1000, thr: '7.0', st: 'full' },
  { n: 'Moda Reyna', c: 5, plan: 'Pro', u: 7, used: 1750, lim: 3000, thr: '7.5', st: 'ok' },
  { n: 'AutoMex', c: 6, plan: 'Starter', u: 2, used: 320, lim: 1000, thr: '7.5', st: 'ok' },
];
function A2({ theme, setTheme }) {
  return (
    <div className="main">
      <AdminTopbar title="Tenants" sub="Clientes, planes, límites de uso y umbral por defecto" theme={theme} setTheme={setTheme}
        actions={<><div className="search" style={{ maxWidth: 240 }}><Icon n="search" w={16} /><input placeholder="Buscar tenant…" /></div><Btn kind="primary" icon="plus">Nuevo tenant</Btn></>} />
      <div className="scroll">
        <div className="table t-tenants">
          <div className="thead"><span>Tenant</span><span>Plan</span><span>Usuarios</span><span>Uso del mes</span><span>Umbral</span><span>Estado</span><span></span></div>
          <div className="rows">
            {TENANTS.map((t, i) => {
              const pct = Math.round(t.used / t.lim * 100);
              const cls = t.st === 'full' ? 'full' : t.st === 'warn' ? 'warn' : '';
              return (
                <div className="row" key={i}>
                  <div className="cell piece"><span className="tlogo" style={{ background: TH[t.c] }}>{t.n.split(' ').map(w => w[0]).slice(0, 2).join('')}</span><span className="piece-meta"><b>{t.n}</b><small>{t.u} usuarios activos</small></span></div>
                  <div className="cell"><span className="tag neutral">{t.plan}</span></div>
                  <div className="cell num">{t.u}</div>
                  <div className="cell"><div className="umini"><div className="ut"><span>{t.used.toLocaleString()}</span><span>{pct}%</span></div><div className="ub"><i className={cls} style={{ width: `${pct}%` }} /></div></div></div>
                  <div className="cell"><span className="score-pill">{t.thr}</span></div>
                  <div className="cell">{t.st === 'full' ? <span className="tag fail">Al límite</span> : t.st === 'warn' ? <span className="tag warn">Alto</span> : <span className="tag pass">Activo</span>}</div>
                  <div className="cell"><div className="row-actions"><span className="iconbtn"><Icon n="edit" w={15} /></span><span className="iconbtn"><Icon n="sliders" w={15} /></span></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ A3 · SEGMENTACIÓN ============ */
const NSE_ROWS = [
  ['A/B', 'Alto · profesional con patrimonio', 6.8, '2.4M'],
  ['C+', 'Medio alto', 12.0, '4.3M'],
  ['C', 'Medio típico', 17.2, '6.1M'],
  ['C−', 'Medio emergente', 17.1, '6.1M'],
  ['D+', 'Bajo con servicios', 18.7, '6.7M'],
  ['D', 'Bajo', 21.3, '7.6M'],
  ['E', 'Mínimo bienestar', 6.9, '2.5M'],
];
function A3({ theme, setTheme }) {
  return (
    <div className="main">
      <AdminTopbar title="Catálogo de segmentación" sub="Taxonomía base · Regla AMAI 2024 · ENIGH 2022 · Censo 2020" theme={theme} setTheme={setTheme}
        actions={<Btn kind="primary" icon="plus">Agregar</Btn>} />
      <div className="scroll">
        <div className="asec">
          <div className="asec-head"><div><h2>Niveles socioeconómicos (AMAI)</h2><p>Peso poblacional editable por nivel — alimenta la composición del panel.</p></div></div>
          <div className="table t-nse">
            <div className="thead"><span>Nivel</span><span>Descripción</span><span>Peso pob.</span><span>Hogares MX</span><span></span></div>
            <div className="rows">
              {NSE_ROWS.map((r, i) => (
                <div className="row" key={i}>
                  <div className="cell"><span className="score-pill">{r[0]}</span></div>
                  <div className="cell">{r[1]}</div>
                  <div className="cell num">{r[2]}%</div>
                  <div className="cell num">{r[3]}</div>
                  <div className="cell"><div className="row-actions"><span className="iconbtn"><Icon n="edit" w={15} /></span></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="two-50">
          <div className="panel">
            <div className="panel-head"><h2>Ciudades / estados</h2><span className="iconbtn"><Icon n="plus" w={15} /></span></div>
            <div className="seg-pills">
              {['CDMX', 'Edo. Méx.', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Mérida', 'Querétaro', 'Oaxaca', 'Cancún', 'Toluca'].map(c => <span className="chip-sel on" key={c}><Icon n="pin" w={13} />{c}</span>)}
              <span className="chip-sel"><Icon n="plus" w={13} />Agregar</span>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><h2>Bandas de ingreso · edad · localidad</h2></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><div className="dgroup" style={{ margin: 0 }}><h4>Ingreso mensual (MXN)</h4><div className="seg-pills">{['< $8k', '$8–15k', '$15–28k', '$28–50k', '> $50k'].map(x => <span className="chip-sel on" key={x}>{x}</span>)}</div></div></div>
              <div><div className="dgroup" style={{ margin: 0 }}><h4>Edad</h4><div className="seg-pills">{['18–24', '25–34', '35–44', '45–54', '55+'].map(x => <span className="chip-sel on" key={x}>{x}</span>)}</div></div></div>
              <div><div className="dgroup" style={{ margin: 0 }}><h4>Tipo de localidad</h4><div className="seg-pills">{['Urbano', 'Zona metro', 'Rural'].map(x => <span className="chip-sel on" key={x}>{x}</span>)}</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ A4 · PERFILES / AGENTES ============ */
const PERSONAS = [
  { id: 0, nse: 'C−', name: 'Madre práctica de Oaxaca', geo: 'Oaxaca · rural', w: '4.3%', c: 3,
    demo: { edad: '38', genero: 'Femenino', esc: 'Secundaria', ocu: 'Comerciante', dep: '3' },
    eco: { ing: '$9,800', gasto: '14%', dpc: 'Baja' },
    cult: { eje: 'Práctico (85)', conf: 'Media-baja', val: ['Familia', 'Ahorro', 'Tradición'], mod: ['“se me antoja”', '“rinde”'] },
    cons: { inc: ['Bebidas', 'Abarrotes', 'Cuidado hogar'], exc: ['Premium', 'Gourmet'] },
    med: { tv: 'Alta', str: 'Baja', redes: ['Facebook', 'WhatsApp'], inf: 'Media' } },
  { id: 1, nse: 'A/B', name: 'Profesionista de CDMX', geo: 'CDMX · zona metro', w: '2.1%', c: 0,
    demo: { edad: '34', genero: 'Femenino', esc: 'Posgrado', ocu: 'Gerente', dep: '1' },
    eco: { ing: '$62,000', gasto: '34%', dpc: 'Alta' },
    cult: { eje: 'Aspiracional (78)', conf: 'Media', val: ['Estatus', 'Salud', 'Tiempo'], mod: ['“vale la pena”', '“premium”'] },
    cons: { inc: ['Bebidas', 'Wellness', 'Tech', 'Premium'], exc: ['Ultra-económico'] },
    med: { tv: 'Baja', str: 'Alta', redes: ['Instagram', 'TikTok', 'LinkedIn'], inf: 'Alta' } },
  { id: 2, nse: 'C', name: 'Joven urbano de Monterrey', geo: 'Monterrey · urbano', w: '3.8%', c: 4,
    demo: { edad: '26', genero: 'Masculino', esc: 'Licenciatura', ocu: 'Empleado', dep: '0' },
    eco: { ing: '$22,000', gasto: '41%', dpc: 'Media-alta' },
    cult: { eje: 'Aspiracional (66)', conf: 'Media', val: ['Estatus', 'Diversión', 'Marca'], mod: ['“está chido”', '“va que va”'] },
    cons: { inc: ['Bebidas', 'Snacks', 'Tech', 'Moda'], exc: [] },
    med: { tv: 'Baja', str: 'Alta', redes: ['TikTok', 'Instagram', 'YouTube'], inf: 'Muy alta' } },
  { id: 3, nse: 'D+', name: 'Jefe de hogar del norte', geo: 'Tijuana · urbano', w: '5.1%', c: 6,
    demo: { edad: '45', genero: 'Masculino', esc: 'Preparatoria', ocu: 'Obrero', dep: '4' },
    eco: { ing: '$12,500', gasto: '18%', dpc: 'Baja' },
    cult: { eje: 'Práctico (79)', conf: 'Baja', val: ['Familia', 'Rendimiento', 'Ahorro'], mod: ['“rinde más”', '“pa la familia”'] },
    cons: { inc: ['Bebidas', 'Abarrotes'], exc: ['Premium', 'Aspiracional'] },
    med: { tv: 'Alta', str: 'Media', redes: ['Facebook', 'YouTube'], inf: 'Baja' } },
  { id: 4, nse: 'C+', name: 'Profesionista de Guadalajara', geo: 'Guadalajara · zona metro', w: '2.9%', c: 2,
    demo: { edad: '41', genero: 'Femenino', esc: 'Licenciatura', ocu: 'Profesionista', dep: '2' },
    eco: { ing: '$38,000', gasto: '29%', dpc: 'Alta' },
    cult: { eje: 'Mixto (55)', conf: 'Media', val: ['Salud', 'Familia', 'Calidad'], mod: ['“buena calidad”', '“sano”'] },
    cons: { inc: ['Bebidas', 'Wellness', 'Hogar'], exc: ['Ultra-económico'] },
    med: { tv: 'Media', str: 'Alta', redes: ['Instagram', 'Facebook'], inf: 'Media' } },
  { id: 5, nse: 'D', name: 'Ama de casa del bajío', geo: 'León · urbano', w: '4.7%', c: 5,
    demo: { edad: '52', genero: 'Femenino', esc: 'Primaria', ocu: 'Hogar', dep: '3' },
    eco: { ing: '$7,200', gasto: '11%', dpc: 'Muy baja' },
    cult: { eje: 'Práctico (90)', conf: 'Baja', val: ['Familia', 'Ahorro', 'Fe'], mod: ['“está caro”', '“alcanza”'] },
    cons: { inc: ['Abarrotes', 'Bebidas económicas'], exc: ['Premium', 'Importado'] },
    med: { tv: 'Muy alta', str: 'Baja', redes: ['Facebook', 'WhatsApp'], inf: 'Baja' } },
];
function Tags({ arr }) { return <div className="tags-inline">{arr.length ? arr.map((t, i) => <span className="chip" key={i}>{t}</span>) : <span className="hint">—</span>}</div>; }
function A4({ theme, setTheme }) {
  const [sel, setSel] = useStateA(0);
  const p = PERSONAS[sel];
  return (
    <div className="main">
      <AdminTopbar title="Perfiles / agentes" sub="Arquetipos de persona anclados en AMAI · ENIGH · Censo" theme={theme} setTheme={setTheme}
        actions={<Btn kind="primary" icon="plus">Nuevo perfil</Btn>} />
      <div className="scroll">
        <div className="editor-split">
          <div className="elist">
            {PERSONAS.map(per => (
              <div className={`ecard ${sel === per.id ? 'on' : ''}`} key={per.id} onClick={() => setSel(per.id)}>
                <span className="eav" style={{ background: TH[per.c] }}>{per.nse}</span>
                <span className="et"><b>{per.name}</b><small>{per.geo}</small></span>
                <span className="ew num">{per.w}</span>
              </div>
            ))}
            <div className="ecard" style={{ justifyContent: 'center', color: 'var(--accent)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}><Icon n="plus" w={16} /> Importar distribución</div>
          </div>
          <div className="detail">
            <div className="detail-head">
              <span className="eav" style={{ background: TH[p.c] }}>{p.nse}</span>
              <div style={{ flex: 1 }}><h2>{p.name}</h2><p>{p.geo} · NSE {p.nse} · peso poblacional {p.w}</p></div>
              <Btn kind="ghost" icon="edit">Editar</Btn>
            </div>
            <div className="dgroup"><h4>Demografía</h4><div className="dgrid">
              <div className="kv"><span className="kk">Edad</span><span className="vv mono">{p.demo.edad}</span></div>
              <div className="kv"><span className="kk">Género</span><span className="vv">{p.demo.genero}</span></div>
              <div className="kv"><span className="kk">Escolaridad jefe</span><span className="vv">{p.demo.esc}</span></div>
              <div className="kv"><span className="kk">Ocupación</span><span className="vv">{p.demo.ocu}</span></div>
              <div className="kv"><span className="kk">Dependientes</span><span className="vv mono">{p.demo.dep}</span></div>
            </div></div>
            <div className="dgroup"><h4>Economía</h4><div className="dgrid">
              <div className="kv"><span className="kk">Ingreso mensual</span><span className="vv mono">{p.eco.ing}</span></div>
              <div className="kv"><span className="kk">Gasto discrecional</span><span className="vv mono">{p.eco.gasto}</span></div>
              <div className="kv"><span className="kk">Disposición de pago</span><span className="vv">{p.eco.dpc}</span></div>
            </div></div>
            <div className="dgroup"><h4>Cultura · psico</h4><div className="dgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="kv"><span className="kk">Aspiracional vs. práctico</span><span className="vv">{p.cult.eje}</span></div>
              <div className="kv"><span className="kk">Confianza en publicidad</span><span className="vv">{p.cult.conf}</span></div>
              <div className="kv"><span className="kk">Valores</span><Tags arr={p.cult.val} /></div>
              <div className="kv"><span className="kk">Modismos</span><Tags arr={p.cult.mod} /></div>
            </div></div>
            <div className="dgroup"><h4>Consumo · medios</h4><div className="dgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="kv"><span className="kk">Categorías (incluye)</span><Tags arr={p.cons.inc} /></div>
              <div className="kv"><span className="kk">Categorías (excluye)</span><Tags arr={p.cons.exc} /></div>
              <div className="kv"><span className="kk">TV abierta / streaming</span><span className="vv">{p.med.tv} / {p.med.str}</span></div>
              <div className="kv"><span className="kk">Redes · confianza influencers</span><div><Tags arr={p.med.redes} /></div></div>
            </div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ A5 · BANCO DE PREGUNTAS ============ */
const QBANK = [
  ['¿Qué piensa del producto en general?', 'Percepción general', 'Abierta'],
  ['¿Qué tan claro fue el mensaje de la pieza?', 'Claridad del mensaje', 'Likert'],
  ['¿De qué marca recuerda que era el anuncio?', 'Vínculo de marca', 'Opción'],
  ['¿Cómo percibe el precio del producto?', 'Precio percibido', 'Likert'],
  ['¿Qué le parecieron los colores y la música?', 'Atractivo', 'Abierta'],
  ['¿Qué tan memorable le resultó la pieza?', 'Memorabilidad', 'Likert'],
  ['¿Siente que el anuncio le habla a usted?', 'Relevancia cultural', 'Likert'],
  ['¿Qué tan probable es que lo compre?', 'Intención de compra', 'Likert'],
];
const QDIMS = ['Todas', 'Atractivo', 'Claridad del mensaje', 'Vínculo de marca', 'Relevancia cultural', 'Memorabilidad', 'Intención de compra'];
function A5({ theme, setTheme }) {
  const [f, setF] = useStateA('Todas');
  const [on, setOn] = useStateA(QBANK.map(() => true));
  const rows = QBANK.map((q, i) => ({ q, i })).filter(({ q }) => f === 'Todas' || q[1] === f);
  return (
    <div className="main">
      <AdminTopbar title="Banco de preguntas" sub="Preguntas preestablecidas, tipo y mapeo a dimensiones de score" theme={theme} setTheme={setTheme}
        actions={<Btn kind="primary" icon="plus">Nueva pregunta</Btn>} />
      <div className="scroll">
        <div className="filters" style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Dimensión</span>
          {QDIMS.map(d => <span key={d} className={`fchip ${f === d ? 'on' : ''}`} onClick={() => setF(d)}>{d}</span>)}
        </div>
        <div className="q-list" style={{ maxWidth: 'none', marginTop: 16 }}>
          {rows.map(({ q, i }) => (
            <div className="q-item" key={i}>
              <div className="q-txt"><b>{q[0]}</b><small>Mapeada a · {q[1]}</small></div>
              <span className="q-type">{q[2]}</span>
              <button className={`switch ${on[i] ? 'on' : ''}`} onClick={() => setOn(s => s.map((v, j) => j === i ? !v : v))} />
              <span className="iconbtn"><Icon n="edit" w={15} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { A1, A2, A3, A4, A5, setGoA8: (fn) => { go_a8 = fn; } });
