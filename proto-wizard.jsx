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

const AV_ASSETS = [
  { id: 'a1', thumb: 'v1', icon: 'play', name: 'spot_30s_sabor.mp4', meta: 'Video · 0:30 · 48 MB', ch: ['TV abierta nacional', 'Streaming'], pz: ['Nacional'] },
  { id: 'a2', thumb: 'v2', icon: 'image', name: 'valla_insurgentes.jpg', meta: 'Imagen · 4000×1500 · 8 MB', ch: ['OOH / Valla'], pz: ['CDMX', 'Guadalajara'] },
];
function StepAudiovisuales() {
  const [canales, setCanales] = useState(() => loadList('canal', DEF_CANALES));
  const [plazas, setPlazas] = useState(() => loadList('plaza', DEF_PLAZAS));
  const [sel, setSel] = useState(() => { const o = {}; AV_ASSETS.forEach(a => { o[a.id] = { channels: a.ch, plazas: a.pz }; }); return o; });
  const addCanal = (v) => { const n = [...canales, v]; setCanales(n); saveList('canal', n); };
  const delCanal = (v) => { const n = canales.filter(x => x !== v); setCanales(n); saveList('canal', n); setSel(s => { const o = {}; for (const k in s) o[k] = { ...s[k], channels: s[k].channels.filter(x => x !== v) }; return o; }); };
  const addPlaza = (v) => { const n = [...plazas, v]; setPlazas(n); saveList('plaza', n); };
  const delPlaza = (v) => { const n = plazas.filter(x => x !== v); setPlazas(n); saveList('plaza', n); setSel(s => { const o = {}; for (const k in s) o[k] = { ...s[k], plazas: s[k].plazas.filter(x => x !== v) }; return o; }); };
  const toggle = (id, field, v) => setSel(s => { const cur = s[id][field]; const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v]; return { ...s, [id]: { ...s[id], [field]: next } }; });
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 2 de 5</span>
        <h1>Audiovisuales / Touchpoints y contexto de exposición</h1>
        <p>Por cada pieza declara <b>en qué canales</b> y <b>en qué plazas / geografías</b> se va a exponer — puedes elegir varios, quitarlos o crear nuevos. No es metadato decorativo: define y pondera qué personas la evalúan.</p>
      </div>
      <div className="dropzone">
        <span className="dz-ic"><Icon n="upload" w={22} /></span>
        <b>Arrastra tus piezas aquí</b>
        <span>Video, imagen, valla u OOH, post de influencer · <u>explorar archivos</u></span>
      </div>
      <div className="asset-list">
        {AV_ASSETS.map(a => (
          <div className="asset-card" key={a.id}>
            <span className={`thumb ${a.thumb}`}><Icon n={a.icon} w={18} s={a.icon === 'play' ? 1 : 1.7} /></span>
            <div className="asset-info"><b>{a.name}</b><small>{a.meta}</small></div>
            <div className="asset-expo">
              <div className="expo-sel"><label>Canales <span className="opt">· varios</span></label>
                <MultiSelect values={sel[a.id].channels} onToggle={v => toggle(a.id, 'channels', v)} options={canales} onAdd={addCanal} onRemoveOption={delCanal} placeholder="Elige o crea canales…" /></div>
              <div className="expo-sel"><label>Plazas / geografía <span className="opt">· varias</span></label>
                <MultiSelect values={sel[a.id].plazas} onToggle={v => toggle(a.id, 'plazas', v)} options={plazas} onAdd={addPlaza} onRemoveOption={delPlaza} placeholder="Elige o crea plazas…" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function defForCat(catId, items) {
  if (catId === 'nse') {
    const ws = items.map(it => (NSE_CAT.find(n => n.id === it) || { w: 1 }).w);
    const tot = ws.reduce((a, b) => a + b, 0) || 1;
    const arr = items.map((it, i) => Math.round(ws[i] / tot * 100));
    if (arr.length) { const diff = 100 - arr.reduce((a, b) => a + b, 0); arr[arr.indexOf(Math.max(...arr))] += diff; }
    return arr;
  }
  const base = Math.floor(100 / (items.length || 1));
  return items.map((_, i) => i === 0 ? 100 - base * (items.length - 1) : base);
}
function catSum(ev, catId) {
  const items = (ev.target[catId]) || [];
  if (!items.length) return 100;
  const defs = defForCat(catId, items);
  const o = (ev.dist && ev.dist[catId]) || {};
  return items.reduce((a, it, i) => a + (o[it] != null ? o[it] : defs[i]), 0);
}
function distAllOk(ev) {
  return TARGET_GROUPS.filter(g => (ev.target[g.id] || []).length).every(g => catSum(ev, g.id) === 100);
}

function StepSegmentacion({ ev, setEv }) {
  const target = ev.target;
  const setTarget = (updater) => setEv(s => ({ ...s, target: typeof updater === 'function' ? updater(s.target) : updater }));
  const nse = target.nse || [], cities = target.geo || [];
  const PANEL_MIN = 90, PANEL_MAX = 540;
  const N = Math.min(PANEL_MAX, Math.max(PANEL_MIN, ev.panelSize || 180));
  const setPanel = (v) => setEv(s => ({ ...s, panelSize: v }));
  const activeCats = TARGET_GROUPS.map(g => ({ id: g.id, label: g.label, count: (target[g.id] || []).length })).filter(c => c.count > 0);
  const totalSel = activeCats.reduce((a, c) => a + c.count, 0);
  const dist = ev.dist || {};
  const [cat, setCat] = useState('nse');
  const activeIds = activeCats.map(c => c.id);
  const curCat = activeIds.includes(cat) ? cat : (activeIds[0] || null);
  const curItems = curCat ? (target[curCat] || []) : [];
  const defs = defForCat(curCat, curItems);
  const pctOf = (it, i) => { const o = dist[curCat]; return (o && o[it] != null) ? o[it] : defs[i]; };
  const setPct = (it, v) => setEv(s => { const d = s.dist || {}; return { ...s, dist: { ...d, [curCat]: { ...(d[curCat] || {}), [it]: v } } }; });
  const sumPct = curItems.reduce((a, it, i) => a + pctOf(it, i), 0);
  const normalizeDist = () => setEv(s => {
    const cur = curItems.map((it, i) => pctOf(it, i));
    const tot = cur.reduce((a, b) => a + b, 0) || 1;
    const scaled = cur.map(v => Math.round(v / tot * 100));
    if (scaled.length) { const diff = 100 - scaled.reduce((a, b) => a + b, 0); scaled[scaled.indexOf(Math.max(...scaled))] += diff; }
    const d = s.dist || {};
    const obj = {}; curItems.forEach((it, i) => { obj[it] = scaled[i]; });
    return { ...s, dist: { ...d, [curCat]: obj } };
  });
  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 3 de 5</span>
        <div className="wz-head-row">
          <h1>Segmentación — elige a los agentes</h1>
          {totalSel > 0 && <span className="tg-total num">{totalSel} criterios</span>}
        </div>
        <p>Abre cada categoría y elige las subcategorías que componen tu panel. <b>NSE</b> y <b>Geografía</b> ponderan el fan-out; el resto afina a quién le habla — y a quién <i>no</i> — la pieza.</p>
      </div>
      <div className="seg-grid">
        <TargetGroups sel={target} setSel={setTarget} chanItems={ev.canalesCat} />
        <div className="panel-preview">
          <div className="pp-n num">{N}<small> personas</small></div>
          <div className="pp-label">Panel resultante · fan-out paralelo</div>
          <div className="pp-distsel">
            <label>Distribución por</label>
            <select className="select" value={curCat || ''} disabled={sumPct !== 100} title={sumPct !== 100 ? 'Ajusta esta categoría a 100% para cambiar' : ''} onChange={e => { if (sumPct === 100) setCat(e.target.value); }}>
              {activeCats.map(c => <option key={c.id} value={c.id}>{c.label} · {c.count}</option>)}
            </select>
          </div>
          <div className="pp-dist">
            {curItems.map((it, i) => {
              const pct = pctOf(it, i); const users = Math.round(pct / 100 * N);
              return (
                <div className="pp-distrow" key={it}>
                  <div className="pdr-top"><span className="pdr-name">{it}</span><span className="pdr-val"><b className="num">{pct}%</b><span className="pdr-u num">{users} u.</span></span></div>
                  <input className="range" type="range" min="0" max="100" value={pct} onChange={e => setPct(it, +e.target.value)} />
                </div>
              );
            })}
            {curItems.length === 0 && <div className="hint">Selecciona criterios en una categoría para ajustar su distribución.</div>}
            {curItems.length > 0 && <div className={`pp-distsum ${sumPct === 100 ? 'ok' : 'bad'}`}><span className="pp-distsum-l">Total {sumPct}%{sumPct !== 100 ? ' · corrige a 100% para cambiar de categoría' : ''}</span>{sumPct !== 100 && <button className="wsum-fix" onClick={normalizeDist}>Ajustar a 100%</button>}</div>}
          </div>
          <div className="pp-combos">
            <div className="ppc-head"><span>Tamaño del panel</span><span className="num">{N} agentes</span></div>
            <input className="range" type="range" min="90" max="540" step="30" value={N} onChange={e => setPanel(+e.target.value)} />
            <div className="ppc-scale"><span>90 · mínimo</span><span>540 · máximo</span></div>
          </div>
          <div className="pp-note">Ponderado por <b>peso poblacional real</b> (AMAI 2024 · ENIGH 2022 · Censo 2020). Ajusta los porcentajes para sobre-representar los segmentos clave de tu campaña.</div>
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
const KPI_LIST = DIMS.map(d => d[0]);
const BANK_KPI = ['Relevancia cultural', 'Claridad del mensaje', 'Vínculo de marca', 'Intención de compra', 'Atractivo (Enjoyment)', 'Intención de compra'];
function QLine({ q, n, onText, onEnter, onRemove, onPaste }) {
  const ref = React.useRef(null);
  React.useEffect(() => { const el = ref.current; if (el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; } }, [q.text]);
  return (
    <div className="qline">
      <span className="qline-n num">{n}</span>
      <textarea ref={ref} rows={1} className="qline-input" value={q.text} placeholder="Escribe una pregunta…"
        onChange={e => onText(e.target.value)}
        onPaste={e => {
          const text = e.clipboardData.getData('text');
          if (/\r?\n/.test(text)) {
            e.preventDefault();
            const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            if (lines.length) onPaste(lines);
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') { e.preventDefault(); onEnter(); }
          else if (e.key === 'Backspace' && q.text === '') { e.preventDefault(); onRemove(); }
        }} />
    </div>
  );
}

const Q_TYPES = ['Abierta', 'Likert', 'Opción'];
function StepEncuesta({ ev, setEv }) {
  const [qmode, setQmode] = useState('list');
  const [questions, setQuestions] = useState(() => BANK.map((b, i) => ({ id: i + 1, text: b.q, desc: b.d, type: b.t, kpi: BANK_KPI[i] || KPI_LIST[0], on: b.on, options: b.t === 'Opción' ? ['Sí, la recuerdo', 'No la recuerdo', 'No estoy seguro'] : [] })));
  const [dragVal, setDragVal] = useState(null);
  const [pendThr, setPendThr] = useState(null);
  const nid = React.useRef(BANK.length + 1);
  const newQ = (text = '') => ({ id: nid.current++, text, type: 'Abierta', kpi: (ev.kpis[0] && ev.kpis[0].name) || '', on: true, options: [] });
  const kpis = ev.kpis;
  const kpiNames = kpis.map(k => k.name).filter(Boolean);
  const patchKpi = (i, patch) => setEv(s => ({ ...s, kpis: s.kpis.map((k, j) => j === i ? { ...k, ...patch } : k) }));
  const setWeight = (i, v) => patchKpi(i, { weight: v });
  const setTarget = (i, v) => patchKpi(i, { target: v });
  const setKpiName = (i, name) => {
    const old = kpis[i].name;
    patchKpi(i, { name });
    if (old) setQuestions(s => s.map(q => q.kpi === old ? { ...q, kpi: name } : q));
  };
  const addKpi = () => setEv(s => ({ ...s, kpis: [...s.kpis, { name: '', target: 7.0, weight: 0 }] }));
  const removeKpi = (i) => setEv(s => s.kpis.length > 1 ? ({ ...s, kpis: s.kpis.filter((_, j) => j !== i) }) : s);
  const sumW = kpis.reduce((a, k) => a + (k.weight || 0), 0);
  const normalize = () => setEv(s => {
    const tot = s.kpis.reduce((a, k) => a + k.weight, 0) || 1;
    const scaled = s.kpis.map(k => Math.round(k.weight / tot * 100));
    if (scaled.length) { const diff = 100 - scaled.reduce((a, b) => a + b, 0); scaled[scaled.indexOf(Math.max(...scaled))] += diff; }
    return { ...s, kpis: s.kpis.map((k, j) => ({ ...k, weight: scaled[j] })) };
  });

  const setText = (id, text) => setQuestions(s => s.map(q => q.id === id ? { ...q, text } : q));
  const toggleOn = (id) => setQuestions(s => s.map(q => q.id === id ? { ...q, on: !q.on } : q));
  const setKpi = (id, kpi) => setQuestions(s => s.map(q => q.id === id ? { ...q, kpi } : q));
  const setType = (id, type) => setQuestions(s => s.map(q => q.id === id
    ? { ...q, type, options: type === 'Opción' && !(q.options && q.options.length) ? ['', ''] : (q.options || []) }
    : q));
  const addOption = (id) => setQuestions(s => s.map(q => q.id === id ? { ...q, options: [...(q.options || []), ''] } : q));
  const setOption = (id, oi, val) => setQuestions(s => s.map(q => q.id === id ? { ...q, options: q.options.map((o, j) => j === oi ? val : o) } : q));
  const removeOption = (id, oi) => setQuestions(s => s.map(q => q.id === id ? { ...q, options: q.options.filter((_, j) => j !== oi) } : q));
  const toggleOpts = (id) => setQuestions(s => s.map(q => q.id === id ? { ...q, optsHidden: !q.optsHidden } : q));
  const removeQ = (id) => setQuestions(s => s.length > 1 ? s.filter(q => q.id !== id) : s);
  const addAfter = (id) => setQuestions(s => { const i = s.findIndex(q => q.id === id); const c = [...s]; c.splice(i + 1, 0, newQ()); return c; });
  const addEnd = () => setQuestions(s => [...s, newQ()]);
  const pasteAt = (id, lines) => setQuestions(s => {
    const i = s.findIndex(q => q.id === id);
    const qs = lines.map(t => newQ(t));
    const c = [...s];
    if (s[i].text.trim() === '') c.splice(i, 1, ...qs);
    else c.splice(i + 1, 0, ...qs);
    return c;
  });
  const activeCount = questions.filter(q => q.on && q.text.trim()).length;
  const weightedTarget = sumW > 0 ? kpis.reduce((a, k) => a + k.target * k.weight, 0) / sumW : 0;
  const thrShown = dragVal != null ? dragVal : weightedTarget;
  const applyThreshold = (val) => setEv(s => {
    const sw = s.kpis.reduce((a, k) => a + k.weight, 0) || 1;
    const cur = s.kpis.reduce((a, k) => a + k.target * k.weight, 0) / sw;
    const sumSq = s.kpis.reduce((a, k) => a + k.weight * k.weight, 0) || 1;
    const c = (val - cur) * sw / sumSq;
    return { ...s, kpis: s.kpis.map(k => ({ ...k, target: Math.max(0, Math.min(10, Math.round((k.target + c * k.weight) * 2) / 2)) })) };
  });
  const commitThr = () => { if (dragVal != null && Math.abs(dragVal - weightedTarget) > 0.001) setPendThr(dragVal); else setDragVal(null); };

  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 4 de 5</span>
        <h1>Configurar encuesta</h1>
        <p>Crea preguntas una por una, o escríbelas por líneas (una pregunta por renglón). Define el peso de cada dimensión del Creative Science Index (jerga LINK).</p>
      </div>

      <div className="subhead-row">
        <span className="subhead-inline">Preguntas {activeCount > 0 && <span className="tg-total num">{activeCount} activas</span>}</span>
        <div className="seg2">
          <button className={qmode === 'list' ? 'on' : ''} onClick={() => setQmode('list')}>Una por una</button>
          <button className={qmode === 'lines' ? 'on' : ''} onClick={() => setQmode('lines')}>Por líneas</button>
        </div>
      </div>

      {qmode === 'list' ? (
        <div className="q-list">
          {questions.map((q, i) => (
            <div className={`q-block ${q.on ? '' : 'is-off'}`} key={q.id}>
              <div className="q-item">
                <span className="q-n num">{i + 1}</span>
                <div className="q-txt">
                  <input className="q-edit" value={q.text} placeholder="Escribe una pregunta…" onChange={e => setText(q.id, e.target.value)} />
                  <div className="q-kpi"><span className="q-kpi-lbl">KPI</span>
                    <select className="q-kpi-sel" value={q.kpi} onChange={e => setKpi(q.id, e.target.value)}>{(kpiNames.includes(q.kpi) ? kpiNames : [q.kpi, ...kpiNames]).map(k => <option key={k}>{k}</option>)}</select>
                  </div>
                </div>
                <select className="q-type-sel" value={q.type} onChange={e => setType(q.id, e.target.value)}>{Q_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                <button className={`switch ${q.on ? 'on' : ''}`} onClick={() => toggleOn(q.id)} />
                <button className="q-del" title="Eliminar" onClick={() => removeQ(q.id)}><Icon n="trash" w={15} /></button>
              </div>
              {q.type === 'Opción' && (
                <div className="q-opts">
                  <div className="q-opts-head">
                    <span className="q-opts-lbl">Opciones de respuesta{q.options.filter(o => o.trim()).length > 0 && <span className="num"> · {q.options.filter(o => o.trim()).length}</span>}</span>
                    <button className="q-opts-toggle" onClick={() => toggleOpts(q.id)}><Icon n="chevron" w={14} />{q.optsHidden ? 'Mostrar' : 'Ocultar'}</button>
                  </div>
                  {!q.optsHidden && (
                    <div className="q-opts-list">
                      {q.options.map((o, oi) => (
                        <div className="q-opt" key={oi}>
                          <span className="q-opt-bullet num">{oi + 1}</span>
                          <input className="q-opt-in" value={o} placeholder={`Opción ${oi + 1}`} onChange={e => setOption(q.id, oi, e.target.value)} />
                          <button className="q-opt-del" title="Eliminar opción" onClick={() => removeOption(q.id, oi)} disabled={q.options.length <= 1}><Icon n="trash" w={13} /></button>
                        </div>
                      ))}
                      <button className="q-add inline q-opt-add" onClick={() => addOption(q.id)}><Icon n="plus" w={14} /> Agregar opción</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button className="q-add" onClick={addEnd}><Icon n="plus" w={16} /> Agregar pregunta</button>
        </div>
      ) : (
        <div className="qbulk-wrap">
          <div className="qbulk">
            {questions.map((q, i) => (
              <QLine key={q.id} q={q} n={i + 1} onText={t => setText(q.id, t)} onEnter={() => addAfter(q.id)} onRemove={() => removeQ(q.id)} onPaste={lines => pasteAt(q.id, lines)} />
            ))}
          </div>
          <div className="qbulk-foot">
            <button className="q-add inline" onClick={addEnd}><Icon n="plus" w={15} /> Nueva línea</button>
            <span className="qbulk-hint">Cada renglón es una pregunta · Enter agrega otra · una pregunta larga conserva su número.</span>
          </div>
        </div>
      )}

      <div className="subhead">KPIs · target esperado y peso</div>
      <div className="weights">
        <div className="wrow whead">
          <span className="wn">KPI</span>
          <span className="wt-h">Target /10</span>
          <span></span>
          <span className="wv-h">Peso</span>
          <span></span>
        </div>
        {kpis.map((k, i) => (
          <div className="wrow" key={i}>
            <input className="wn wn-in" value={k.name} placeholder="Nombre del KPI" onChange={e => setKpiName(i, e.target.value)} />
            <input className="wt-in num" type="number" min="0" max="10" step="0.5" value={k.target} onChange={e => setTarget(i, +e.target.value)} />
            <input className="range" type="range" min="0" max="40" value={k.weight}
              onChange={e => setWeight(i, +e.target.value)} />
            <span className="wv num">{k.weight}%</span>
            <button className="wkpi-del" title="Eliminar KPI" onClick={() => removeKpi(i)} disabled={kpis.length <= 1}><Icon n="trash" w={14} /></button>
          </div>
        ))}
        <button className="q-add inline wkpi-add" onClick={addKpi}><Icon n="plus" w={15} /> Agregar KPI</button>
        <div className={`wsum ${sumW === 100 ? 'ok' : 'warn'}`}>
          <span className="wsum-l">{sumW === 100 ? <><Icon n="check" w={14} /> Suma de pesos</> : 'Suma de pesos'}</span>
          <span className="wsum-v num">{sumW}%</span>
          {sumW !== 100 && <button className="wsum-fix" onClick={normalize}>Ajustar a 100%</button>}
        </div>
      </div>
      <div className="subhead">Umbral de aprobación</div>
      <div className="thresh-box">
        <span className="tv num">{thrShown.toFixed(1)}</span>
        <div className="tt"><b>Creative Science Index weighted acceptance target</b><p>Es la <b>ponderación de los targets</b> por su peso. Muévelo y recalcularemos los targets de cada KPI según su peso · target &lt; umbral → la pieza regresa a creatividad.</p></div>
        <input className="range" type="range" min="5" max="9" step="0.1" value={thrShown}
          onChange={e => setDragVal(+e.target.value)}
          onMouseUp={commitThr} onTouchEnd={commitThr} onKeyUp={commitThr} />
      </div>
      {pendThr != null && (
        <div className="confirm-ov" onClick={() => { setPendThr(null); setDragVal(null); }}>
          <div className="confirm-card" onClick={e => e.stopPropagation()}>
            <b>¿Modificar los targets de arriba?</b>
            <p>El umbral es la ponderación de los targets por su peso. Ajustarlo a <b className="num">{pendThr.toFixed(1)}</b> recalculará el <b>target esperado</b> de cada KPI proporcionalmente a su peso.</p>
            <div className="confirm-actions">
              <button className="btn ghost" onClick={() => { setPendThr(null); setDragVal(null); }}>Cancelar</button>
              <button className="btn primary" onClick={() => { applyThreshold(pendThr); setPendThr(null); setDragVal(null); }}>Sí, modificar targets</button>
            </div>
          </div>
        </div>
      )}
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
            <div className="rev-row"><span className="k">Tipo de campaña</span><span className="v">Lanzamiento de un nuevo producto</span></div>
          </div>
          <div className="rev-card">
            <h3><Icon n="play" /> Audiovisuales</h3>
            <div className="rev-row"><span className="k">spot_30s_sabor.mp4</span><span className="v">TV abierta · Nacional</span></div>
            <div className="rev-row"><span className="k">valla_insurgentes.jpg</span><span className="v">OOH · CDMX</span></div>
          </div>
          <div className="rev-card">
            <h3><Icon n="users" /> Panel y encuesta</h3>
            <div className="rev-row"><span className="k">Personas</span><span className="v num">{N} agentes</span></div>
            <div className="rev-row"><span className="k">NSE</span><span className="v">{(ev.target.nse || []).join(' · ')}</span></div>
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

function Wizard({ route, go, ev, setEv, mode, theme, setTheme }) {
  const idx = WSTEPS.findIndex(s => s.id === route);
  const N = Math.min(540, Math.max(90, ev.panelSize || 180));
  const back = () => idx > 0 ? go(WSTEPS[idx - 1].id) : go('dashboard');
  const weightsOk = (ev.kpis || []).reduce((a, k) => a + (k.weight || 0), 0) === 100;
  const distOk = distAllOk(ev);
  const blockMsg = route === 'w3' && !distOk ? 'corrige la distribución de cada categoría: debe sumar 100%'
    : route === 'w4' && !weightsOk ? 'corrige los pesos de KPI: deben sumar 100%' : null;
  const blocked = !!blockMsg;
  const next = () => { if (blocked) return; idx < WSTEPS.length - 1 ? go(WSTEPS[idx + 1].id) : go('progress'); };
  let body;
  if (route === 'w1') body = <StepCampana mode={mode} ev={ev} setEv={setEv} />;
  else if (route === 'w2') body = <StepAudiovisuales />;
  else if (route === 'w3') body = <StepSegmentacion ev={ev} setEv={setEv} />;
  else if (route === 'w4') body = <StepEncuesta ev={ev} setEv={setEv} />;
  else body = <StepRevision ev={{ ...ev, _N: N }} go={go} />;
  return (
    <div className="main">
      <div className="wz-top">
        <span className="wz-title">{mode === 'pieza' ? 'Analizar pieza' : 'Nuevo análisis'}</span>
        <Stepper route={route} go={go} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="btn ghost icon wz-close" onClick={() => go('dashboard')}><Icon n="x" w={16} /></button>
      </div>
      <div className="wz-scroll">{body}</div>
      <div className="wz-foot">
        <div className="ftext">Panel actual: <b>{N}</b> agentes · {(ev.target.nse || []).length} NSE · {(ev.target.geo || []).length} plazas{blockMsg && <span className="foot-warn"> · {blockMsg}</span>}</div>
        <div className="fend">
          <Btn kind="ghost" icon="arrowL" onClick={back}>{idx === 0 ? 'Salir' : 'Atrás'}</Btn>
          {route === 'w5'
            ? <Btn kind="primary" icon="spark" onClick={next}>Lanzar análisis</Btn>
            : <Btn kind="primary" iconR="arrowR" cls={blocked ? 'is-disabled' : ''} onClick={next}>Continuar</Btn>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Wizard });
