/* Prototipo — Wizard (P1 Producto → P5 Revisión) */
const { useState } = React;

const NSE_CAT = [
  { id: 'A/B', w: 7 }, { id: 'C+', w: 12 }, { id: 'C', w: 17 }, { id: 'C−', w: 17 },
  { id: 'D+', w: 19 }, { id: 'D', w: 21 }, { id: 'E', w: 7 },
];
const CITIES = ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Mérida', 'Oaxaca', 'León'];
const AGES = ['18–24', '25–34', '35–44', '45–54', '55+'];
const LOCAL = ['Urbano', 'Zona metro', 'Rural'];

function ChipSel({ on, onClick, children, check }) {
  return <button className={`chip-sel ${on ? 'on' : ''}`} onClick={onClick}>
    {check && on && <Icon n="check" w={14} />}{children}</button>;
}

function StepProducto() {
  const cats = ['Bebidas', 'Alimentos', 'Cuidado personal', 'Retail', 'Financiero', 'Telecom', 'Automotriz'];
  const [cat, setCat] = useState('Bebidas');
  const targets = ['Familias jóvenes', 'NSE C+/A/B', 'Mujeres 25–44', 'Nostalgia / tradición', 'Gen Z'];
  const [tg, setTg] = useState(['Familias jóvenes', 'Nostalgia / tradición']);
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 1 de 5</span>
        <h1>Producto y contexto</h1>
        <p>Este contexto alimenta tanto al agente de percepción como a la selección de personas. Sé específico: define a quién intenta hablarle la campaña.</p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label>Categoría</label>
          <select className="select" value={cat} onChange={e => setCat(e.target.value)}>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field"><label>Marca</label><input className="input" defaultValue="Aurora" /></div>
        <div className="field full"><label>Nombre del producto</label><input className="input" defaultValue="Néctar Aurora Mango" /></div>
        <div className="field full"><label>Descripción <span className="opt">· qué es y qué promete</span></label>
          <textarea className="textarea" defaultValue="Néctar de mango 100% natural, sin azúcar añadida. Posicionamiento aspiracional-tradicional: 'el sabor de casa', dirigido a familias que buscan opciones más sanas sin perder el sabor de siempre." /></div>
        <div className="field"><label>Precio percibido <span className="opt">· MXN</span></label><input className="input num" defaultValue="$24.00 / 1L" /></div>
        <div className="field"><label>Posicionamiento</label>
          <select className="select" defaultValue="Aspiracional-tradicional"><option>Aspiracional-tradicional</option><option>Premium</option><option>Valor / práctico</option><option>Disruptor</option></select></div>
        <div className="field full"><label>Target declarado <span className="opt">· elige los que apliquen</span></label>
          <div className="chip-row">{targets.map(t =>
            <ChipSel key={t} check on={tg.includes(t)} onClick={() => setTg(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t])}>{t}</ChipSel>)}</div>
        </div>
      </div>
    </div>
  );
}

function StepAudiovisuales() {
  const Sel = ({ label, opts }) => (
    <div className="expo-sel"><label>{label}</label>
      <select className="select">{opts.map(o => <option key={o}>{o}</option>)}</select></div>
  );
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 2 de 5</span>
        <h1>Audiovisuales y contexto de exposición</h1>
        <p>Por cada pieza declara <b>dónde se va a exponer</b> (canal y plaza). No es metadato decorativo: define y pondera qué personas la evalúan — el panel se arma dinámicamente según la exposición.</p>
      </div>
      <div className="dropzone">
        <span className="dz-ic"><Icon n="upload" w={22} /></span>
        <b>Arrastra tus piezas aquí</b>
        <span>Video, imagen, valla u OOH, post de influencer · <u>explorar archivos</u></span>
      </div>
      <div className="asset-list">
        <div className="asset-card">
          <span className="thumb v1"><Icon n="play" w={18} s={1} /></span>
          <div className="asset-info"><b>spot_30s_sabor.mp4</b><small>Video · 0:30 · 48 MB</small></div>
          <div className="asset-expo">
            <Sel label="Canal" opts={['TV abierta nacional', 'Streaming', 'TikTok', 'OOH / Valla']} />
            <Sel label="Plaza" opts={['Nacional', 'CDMX', 'Monterrey', 'Norte']} />
          </div>
        </div>
        <div className="asset-card">
          <span className="thumb v2"><Icon n="image" w={18} /></span>
          <div className="asset-info"><b>valla_insurgentes.jpg</b><small>Imagen · 4000×1500 · 8 MB</small></div>
          <div className="asset-expo">
            <Sel label="Canal" opts={['OOH / Valla', 'TV abierta nacional', 'Instagram']} />
            <Sel label="Plaza" opts={['CDMX', 'Guadalajara', 'Nacional']} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSegmentacion({ ev, setEv }) {
  const nse = ev.nse, cities = ev.cities;
  const toggle = (key, v) => setEv(s => {
    const arr = s[key]; const next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
    return { ...s, [key]: next };
  });
  const selW = NSE_CAT.filter(n => nse.includes(n.id));
  const totalW = selW.reduce((a, b) => a + b.w, 0) || 1;
  const N = Math.max(0, Math.round(totalW * 1.9 * Math.min(1.4, 0.6 + cities.length * 0.12)));
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 3 de 5</span>
        <h1>Segmentación — elige a los agentes</h1>
        <p>Selecciona perfiles desde los catálogos. Una persona puede quedar <b>“fuera de target”</b>: a quién <i>no</i> le habla la pieza es tan valioso como el score.</p>
      </div>
      <div className="seg-grid">
        <div>
          <div className="seg-block">
            <h3>Nivel socioeconómico · AMAI</h3>
            <div className="chip-row">{NSE_CAT.map(n =>
              <ChipSel key={n.id} check on={nse.includes(n.id)} onClick={() => toggle('nse', n.id)}>{n.id}</ChipSel>)}</div>
          </div>
          <div className="seg-block">
            <h3>Ciudades / estados</h3>
            <div className="chip-row">{CITIES.map(c =>
              <ChipSel key={c} check on={cities.includes(c)} onClick={() => toggle('cities', c)}>{c}</ChipSel>)}</div>
          </div>
          <div className="seg-block">
            <h3>Tipo de localidad</h3>
            <div className="chip-row">{LOCAL.map(l => <ChipSel key={l} on={l !== 'Rural'}>{l}</ChipSel>)}</div>
          </div>
          <div className="seg-block">
            <h3>Edad</h3>
            <div className="chip-row">{AGES.map(a => <ChipSel key={a} on={a !== '55+'}>{a}</ChipSel>)}</div>
          </div>
        </div>
        <div className="panel-preview">
          <div className="pp-n num">{N}<small> personas</small></div>
          <div className="pp-label">Panel resultante · fan-out paralelo</div>
          <div className="pp-bars">
            {selW.map(n => (
              <div className="pp-bar" key={n.id}>
                <div className="pp-bt"><b>NSE {n.id}</b><span className="num">{Math.round(n.w / totalW * 100)}%</span></div>
                <div className="pp-track"><i style={{ width: `${Math.round(n.w / totalW * 100)}%` }} /></div>
              </div>
            ))}
            {selW.length === 0 && <div className="hint">Selecciona al menos un NSE para componer el panel.</div>}
          </div>
          <div className="pp-note">Ponderado por <b>peso poblacional real</b> (Regla AMAI 2024 · ENIGH 2022 · Censo 2020). {cities.length} {cities.length === 1 ? 'plaza' : 'plazas'} seleccionadas.</div>
        </div>
      </div>
    </div>
  );
}

const BANK = [
  { q: '¿Qué piensa del producto?', d: 'Percepción general', t: 'Abierta', on: true },
  { q: '¿Qué le pareció el mensaje?', d: 'Claridad del mensaje', t: 'Likert', on: true },
  { q: '¿Recuerda de qué marca era?', d: 'Vínculo de marca', t: 'Opción', on: true },
  { q: '¿Cómo percibe el precio?', d: 'Precio percibido', t: 'Likert', on: true },
  { q: '¿Qué opina de los colores y la música?', d: 'Atractivo', t: 'Abierta', on: false },
  { q: '¿Lo compraría?', d: 'Intención de compra', t: 'Likert', on: true },
];
const DIMS = [
  ['Relevancia cultural', 22], ['Intención de compra', 20], ['Atractivo (Enjoyment)', 16],
  ['Claridad del mensaje', 14], ['Memorabilidad', 12], ['Vínculo de marca', 10], ['Distintividad', 6],
];
function StepEncuesta() {
  const [bank, setBank] = useState(BANK.map(b => b.on));
  const [weights, setWeights] = useState(DIMS.map(d => d[1]));
  const [thr, setThr] = useState(7.5);
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 4 de 5</span>
        <h1>Configurar encuesta</h1>
        <p>Activa preguntas del banco, agrega diferenciales de tu campaña, y define el peso de cada dimensión del Índice de Efectividad Creativa (jerga LINK).</p>
      </div>
      <div className="subhead">Banco de preguntas</div>
      <div className="q-list">
        {BANK.map((b, i) => (
          <div className="q-item" key={i}>
            <div className="q-txt"><b>{b.q}</b><small>{b.d}</small></div>
            <span className="q-type">{b.t}</span>
            <button className={`switch ${bank[i] ? 'on' : ''}`} onClick={() => setBank(s => s.map((v, j) => j === i ? !v : v))} />
          </div>
        ))}
        <div className="q-item" style={{ borderStyle: 'dashed', cursor: 'pointer' }}>
          <div className="q-txt" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13 }}>
            <Icon n="plus" w={16} /> Agregar pregunta diferencial (custom)</div>
        </div>
      </div>
      <div className="subhead">Dimensiones de score y pesos</div>
      <div className="weights">
        {DIMS.map((d, i) => (
          <div className="wrow" key={d[0]}>
            <span className="wn">{d[0]}</span>
            <input className="range" type="range" min="0" max="30" value={weights[i]}
              onChange={e => setWeights(s => s.map((v, j) => j === i ? +e.target.value : v))} />
            <span className="wv num">{weights[i]}%</span>
          </div>
        ))}
      </div>
      <div className="subhead">Umbral de aprobación</div>
      <div className="thresh-box">
        <span className="tv num">{thr.toFixed(1)}</span>
        <div className="tt"><b>Gate de intención de compra</b><p>Override del estándar admin (7.5). Intención ponderada &lt; umbral → la pieza regresa a creatividad.</p></div>
        <input className="range" type="range" min="5" max="9" step="0.1" value={thr} onChange={e => setThr(+e.target.value)} />
      </div>
    </div>
  );
}

function StepRevision({ ev, go }) {
  const N = ev._N || 187;
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 5 de 5</span>
        <h1>Revisión y lanzamiento</h1>
        <p>Confirma la configuración. Al lanzar, el snapshot de encuesta y personas se copia dentro del run → reproducible aunque cambien los catálogos.</p>
      </div>
      <div className="rev-grid">
        <div>
          <div className="rev-card">
            <h3><Icon n="box" /> Producto</h3>
            <div className="rev-row"><span className="k">Nombre</span><span className="v">Néctar Aurora Mango</span></div>
            <div className="rev-row"><span className="k">Categoría · Marca</span><span className="v">Bebidas · Aurora</span></div>
            <div className="rev-row"><span className="k">Posicionamiento</span><span className="v">Aspiracional-tradicional</span></div>
          </div>
          <div className="rev-card">
            <h3><Icon n="play" /> Audiovisuales</h3>
            <div className="rev-row"><span className="k">spot_30s_sabor.mp4</span><span className="v">TV abierta · Nacional</span></div>
            <div className="rev-row"><span className="k">valla_insurgentes.jpg</span><span className="v">OOH · CDMX</span></div>
          </div>
          <div className="rev-card">
            <h3><Icon n="users" /> Panel y encuesta</h3>
            <div className="rev-row"><span className="k">Personas</span><span className="v num">{N} agentes</span></div>
            <div className="rev-row"><span className="k">NSE</span><span className="v">{ev.nse.join(' · ')}</span></div>
            <div className="rev-row"><span className="k">Preguntas activas</span><span className="v">5 banco + 0 custom</span></div>
            <div className="rev-row"><span className="k">Umbral de gate</span><span className="v num">7.5</span></div>
          </div>
        </div>
        <div className="launch-card">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Estimación del run</div>
          <div className="launch-stat">
            <div className="ls"><b className="num">{N}</b><span>agentes</span></div>
            <div className="ls"><b className="num">~3m</b><span>tiempo</span></div>
            <div className="ls"><b className="num">$4.10</b><span>costo</span></div>
          </div>
          <Btn kind="primary" cls="big" icon="spark" onClick={() => go('progress')}>Lanzar análisis</Btn>
          <div className="launch-note">Fan-out paralelo · caching de prefijo compartido activo</div>
        </div>
      </div>
    </div>
  );
}

function Wizard({ route, go, ev, setEv, theme, setTheme }) {
  const idx = WSTEPS.findIndex(s => s.id === route);
  const N = (() => {
    const selW = NSE_CAT.filter(n => ev.nse.includes(n.id));
    const totalW = selW.reduce((a, b) => a + b.w, 0);
    return Math.max(0, Math.round(totalW * 1.9 * Math.min(1.4, 0.6 + ev.cities.length * 0.12)));
  })();
  const back = () => idx > 0 ? go(WSTEPS[idx - 1].id) : go('dashboard');
  const next = () => idx < WSTEPS.length - 1 ? go(WSTEPS[idx + 1].id) : go('progress');
  let body;
  if (route === 'w1') body = <StepProducto />;
  else if (route === 'w2') body = <StepAudiovisuales />;
  else if (route === 'w3') body = <StepSegmentacion ev={ev} setEv={setEv} />;
  else if (route === 'w4') body = <StepEncuesta />;
  else body = <StepRevision ev={{ ...ev, _N: N }} go={go} />;
  return (
    <div className="main">
      <div className="wz-top">
        <span className="wz-title">Nuevo análisis</span>
        <Stepper route={route} go={go} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="btn ghost icon wz-close" onClick={() => go('dashboard')}><Icon n="x" w={16} /></button>
      </div>
      <div className="wz-scroll">{body}</div>
      <div className="wz-foot">
        <div className="ftext">Panel actual: <b>{N}</b> agentes · {ev.nse.length} NSE · {ev.cities.length} plazas</div>
        <div className="fend">
          <Btn kind="ghost" icon="arrowL" onClick={back}>{idx === 0 ? 'Salir' : 'Atrás'}</Btn>
          {route === 'w5'
            ? <Btn kind="primary" icon="spark" onClick={next}>Lanzar análisis</Btn>
            : <Btn kind="primary" iconR="arrowR" onClick={next}>Continuar</Btn>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Wizard });
