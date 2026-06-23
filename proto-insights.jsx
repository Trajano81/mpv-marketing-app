/* Prototipo — Insights (top hallazgos por campaña) y Postview
   (predicho vs. real + cuestionario que alimenta a los agentes).
   Reutiliza Icon / Btn / ThemeToggle / TopbarP. */
const { useState: useStateIns, useEffect: useEffectIns } = React;

/* ===================== INSIGHTS ===================== */
const INS_CAMPAIGNS = [
  { key: 'all', label: 'Todas' },
  { key: 'mango', label: 'Néctar Mango' },
  { key: 'tamarindo', label: 'Tamarindo' },
  { key: 'agua', label: 'Agua Mineral' },
];
const INSIGHTS = [
  { pkey: 'mango', type: 'Mensaje', impact: 'Alto', impactCls: 'hi',
    title: 'El cierre emocional convierte mejor que el racional',
    detail: 'El remate “sabor que abraza” del Spot 30s eleva la intención de compra frente a los cortes sin narrativa, con el mayor efecto en familias NSE C / C+.',
    metric: '+1.4', metricLbl: 'pts de intención', segment: 'NSE C · C+ · familias', evidence: 'Spot 30s · 187 agentes' },
  { pkey: 'mango', type: 'Canal', impact: 'Alto', impactCls: 'hi',
    title: 'La valla no carga el claim en exterior',
    detail: 'En OOH el mensaje aspiracional se pierde sin audio ni contexto; la pieza cae por debajo del gate y regresa a creatividad.',
    metric: '6.4', metricLbl: 'compuesto · regresa', segment: 'CDMX · OOH / Valla', evidence: 'Valla Insurgentes · 96 agentes' },
  { pkey: 'mango', type: 'Creatividad', impact: 'Medio', impactCls: 'mid',
    title: 'El creador local supera al spot en TikTok',
    detail: 'La pieza de influencer en Monterrey logra más intención que el spot de TV en el mismo público joven. Conviene priorizar creadores regionales en redes.',
    metric: '8.3', metricLbl: 'vs. 7.8 del spot', segment: 'TikTok · 18–28', evidence: 'Influencer MTY · 110 agentes' },
  { pkey: 'tamarindo', type: 'Segmento', impact: 'Medio', impactCls: 'mid',
    title: 'El norte premia rendimiento, no aspiración',
    detail: 'NSE C− / D+ en Monterrey responde a litros y precio por porción; los claims aspiracionales bajan la intención en ese segmento.',
    metric: '−0.9', metricLbl: 'pts en NSE C−', segment: 'Monterrey · C− · D+', evidence: 'Reel @chefcito · 142 agentes' },
  { pkey: 'agua', type: 'Precio', impact: 'Medio', impactCls: 'mid',
    title: 'Gen Z castiga el precio premium en agua',
    detail: 'Alto recall pero intención frenada por la percepción de precio. Una versión de valor podría desbloquear conversión sin perder la imagen de marca.',
    metric: '6.8', metricLbl: 'intención · al límite', segment: 'Gen Z urbano', evidence: 'Post Gen Z · 130 agentes' },
];

function CampaignCombo({ value, onChange }) {
  const [open, setOpen] = useStateIns(false);
  const [q, setQ] = useStateIns('');
  const wrapRef = React.useRef(null);
  useEffectIns(() => {
    if (!open) return;
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setQ(''); } };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const cur = INS_CAMPAIGNS.find(k => k.key === value) || INS_CAMPAIGNS[0];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const opts = INS_CAMPAIGNS.filter(k => norm(k.label).includes(norm(q.trim())));
  return (
    <div className="cbx" ref={wrapRef}>
      <button className={`cbx-btn ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
        <Icon n="box" w={15} />
        <span className="cbx-val">{cur.label}</span>
        <Icon n="chevron" w={16} />
      </button>
      {open && (
        <div className="cbx-pop">
          <div className="cbx-search">
            <Icon n="search" w={15} />
            <input autoFocus placeholder="Buscar campaña…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div className="cbx-opts">
            {opts.length ? opts.map(k => (
              <button key={k.key} className={`cbx-opt ${k.key === value ? 'sel' : ''}`} onClick={() => { onChange(k.key); setOpen(false); setQ(''); }}>
                <span>{k.label}</span>
                {k.key === value && <Icon n="check" w={15} />}
              </button>
            )) : <div className="cbx-empty">Sin resultados</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function Insights({ go, theme, setTheme }) {
  const [c, setC] = useStateIns('all');
  const groups = INS_CAMPAIGNS.filter(k => k.key !== 'all')
    .filter(k => c === 'all' || c === k.key)
    .map(k => ({ ...k, items: INSIGHTS.filter(x => x.pkey === k.key) }))
    .filter(g => g.items.length);
  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="search"><Icon n="search" w={16} /><input placeholder="Buscar hallazgos…" /></div>}
        actions={<Btn kind="ghost" icon="download">Exportar</Btn>} />
      <div className="scroll">
        <div className="ph2">
          <div>
            <h1>Insights</h1>
            <p>Los hallazgos más accionables de cada campaña, ordenados por impacto en la intención de compra.</p>
          </div>
        </div>
        <div className="toolbar">
          <CampaignCombo value={c} onChange={setC} />
        </div>
        {groups.map(g => (
          <div className="ins-group" key={g.key}>
            <div className="ins-group-head">
              <span className="igh-name"><Icon n="box" w={15} />{g.label}</span>
              <span className="igh-count num">{g.items.length} {g.items.length === 1 ? 'hallazgo' : 'hallazgos'}</span>
            </div>
            <div className="ins-list">
              {g.items.map((x, i) => (
                <div className="ins-row" key={x.title}>
                  <div className="ins-rank">{i + 1}</div>
                  <div className="ins-body">
                    <div className="ins-head">
                      <span className="chip sm accent">{x.type}</span>
                      <span className={`imp imp-${x.impactCls}`}><span className="imp-dot" />Impacto {x.impact}</span>
                    </div>
                    <b className="ins-title">{x.title}</b>
                    <p className="ins-detail">{x.detail}</p>
                    <div className="ins-foot">
                      <div className="ins-metric"><b className="num">{x.metric}</b><span>{x.metricLbl}</span></div>
                      <div className="ins-evidence">
                        <span><Icon n="target" w={13} />{x.segment}</span>
                        <span><Icon n="users" w={13} />{x.evidence}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="ins-feed">
          <span className="if-ic"><Icon n="cpu" w={18} /></span>
          <div><b>Aprendizaje continuo</b><small>Registra los resultados reales en <a className="if-link" onClick={() => go('postview')}>Postview</a> y el panel sintético recalibra estos hallazgos en tu próximo análisis.</small></div>
        </div>
      </div>
    </div>
  );
}

/* ===================== POSTVIEW ===================== */
const PV_STORE = 'aurora_postview_v1';
const PV_SEED = {
  mango: { intent: 8.1, lift: 12, recall: 64, cumplio: true, nota: 'Encuesta post-campaña (n=600) + lift de sell-out en autoservicio.', seeded: true },
};
const PV_CAMPAIGNS = [
  { key: 'mango', name: 'Néctar Aurora Mango', pieza: 'Spot 30s — “Sabor que abraza”', pred: 7.8, gate: 'Pasa', gcls: 'pass', when: 'Lanzada · May 2025' },
  { key: 'tamarindo', name: 'Néctar Aurora Tamarindo', pieza: 'Reel @chefcito', pred: 7.1, gate: 'Al límite', gcls: 'warn', when: 'Lanzada · Abr 2025' },
  { key: 'agua', name: 'Agua Aurora Mineral', pieza: 'Post Gen Z', pred: 6.8, gate: 'Al límite', gcls: 'warn', when: 'En pauta' },
];
function loadPV() { try { return JSON.parse(localStorage.getItem(PV_STORE)) || {}; } catch (e) { return {}; } }
function accuracyOf(pred, real) { return Math.max(0, Math.round(100 - Math.abs(pred - real) * 10)); }
function accCls(a) { return a >= 85 ? 'pass' : a >= 70 ? 'warn' : 'fail'; }

function Postview({ go, theme, setTheme }) {
  const [data, setData] = useStateIns(() => ({ ...PV_SEED, ...loadPV() }));
  const [open, setOpen] = useStateIns(false);

  const withReal = PV_CAMPAIGNS.filter(c => data[c.key]);
  const accs = withReal.map(c => accuracyOf(c.pred, data[c.key].intent));
  const overall = accs.length ? Math.round(accs.reduce((a, b) => a + b, 0) / accs.length) : null;

  const save = (key, payload) => {
    const next = { ...data, [key]: { ...payload, ts: Date.now() } };
    setData(next);
    const persist = { ...next }; // strip seed flag so seeded default doesn't masquerade as user data
    try { localStorage.setItem(PV_STORE, JSON.stringify(persist)); } catch (e) {}
    setOpen(false);
  };

  return (
    <div className="main">
      <TopbarP theme={theme} setTheme={setTheme}
        left={<div className="crumbs">Aprendizaje · <b>Postview</b></div>}
        actions={<Btn kind="primary" icon="plus" onClick={() => setOpen(true)}>Registrar resultados</Btn>} />
      <div className="scroll">
        <div className="ph2">
          <div>
            <h1>Postview</h1>
            <p>Lo que predijo el panel sintético frente a los resultados reales en mercado. Mide qué tan bien aprende la marca y recalibra a los agentes.</p>
          </div>
        </div>

        <div className="pv-summary">
          <div className="pv-acc">
            <span className="pv-acc-lbl">Precisión de aprendizaje</span>
            {overall != null
              ? <span className="pv-acc-num num">{overall}<small>%</small></span>
              : <span className="pv-acc-num num muted">—</span>}
            <span className="pv-acc-sub">{accs.length} de {PV_CAMPAIGNS.length} campañas con resultado real</span>
          </div>
          <div className="pv-feed">
            <span className="if-ic"><Icon n="cpu" w={18} /></span>
            <div><b>{withReal.length} resultado{withReal.length === 1 ? '' : 's'} alimentando al panel</b><small>Cada resultado real ajusta los pesos por segmento y mejora la calibración de tus próximos pre-tests.</small></div>
          </div>
        </div>

        <div className="ph2"><div><h2 className="sec-title">Campañas</h2></div></div>
        <div className="pv-list">
          {PV_CAMPAIGNS.map(c => {
            const r = data[c.key];
            const acc = r ? accuracyOf(c.pred, r.intent) : null;
            return (
              <div className="pv-card" key={c.key}>
                <div className="pv-id">
                  <b>{c.name}</b>
                  <small>{c.pieza} · {c.when}</small>
                </div>
                <div className="pv-compare">
                  <div className="pvc-scale">
                    <div className="pvc-track"><span className="pvc-gate" /></div>
                    <span className="pvc-dot pred" style={{ left: `${c.pred * 10}%` }} />
                    <span className="pvc-lbl pred" style={{ left: `${c.pred * 10}%` }}>Pred {c.pred}</span>
                    {r && <span className="pvc-dot real" style={{ left: `${r.intent * 10}%` }} />}
                    {r && <span className="pvc-lbl real" style={{ left: `${r.intent * 10}%` }}>Real {r.intent}</span>}
                  </div>
                </div>
                <div className="pv-result">
                  {r ? (
                    <>
                      <span className={`pv-accbadge ${accCls(acc)}`}>{acc}% precisión</span>
                      <div className="pv-kpis">
                        <span>Lift <b className="num">{r.lift > 0 ? '+' : ''}{r.lift}%</b></span>
                        <span>Recall <b className="num">{r.recall}%</b></span>
                        <span className={`pv-goal ${r.cumplio ? 'ok' : 'no'}`}>{r.cumplio ? <Icon n="check" w={13} /> : <Icon n="x" w={13} />}{r.cumplio ? 'Cumplió' : 'No cumplió'}</span>
                      </div>
                      <button className="lib-go" onClick={() => setOpen(c.key)}><Icon n="edit" w={13} />Editar</button>
                    </>
                  ) : (
                    <>
                      <span className="tag neutral">Sin resultado real</span>
                      <button className="btn primary sm" onClick={() => setOpen(c.key)}><Icon n="plus" w={14} />Registrar resultados</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && <PostviewForm presetKey={typeof open === 'string' ? open : null} data={data} onSave={save} onClose={() => setOpen(false)} />}
    </div>
  );
}

function PostviewForm({ presetKey, data, onSave, onClose }) {
  const first = presetKey || (PV_CAMPAIGNS.find(c => !data[c.key]) || PV_CAMPAIGNS[0]).key;
  const [key, setKey] = useStateIns(first);
  const existing = data[key] || {};
  const [intent, setIntent] = useStateIns(existing.intent ?? 7.5);
  const [lift, setLift] = useStateIns(existing.lift ?? 0);
  const [recall, setRecall] = useStateIns(existing.recall ?? 50);
  const [cumplio, setCumplio] = useStateIns(existing.cumplio ?? true);
  const [nota, setNota] = useStateIns(existing.nota ?? '');

  // re-sync fields when the user switches campaign in the selector
  const onKey = (k) => {
    setKey(k); const e = data[k] || {};
    setIntent(e.intent ?? 7.5); setLift(e.lift ?? 0); setRecall(e.recall ?? 50); setCumplio(e.cumplio ?? true); setNota(e.nota ?? '');
  };
  const camp = PV_CAMPAIGNS.find(c => c.key === key);

  return (
    <div className="pv-modal-bg" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <div className="pvm-head">
          <div><b>Registrar resultados reales</b><small>Captura el desempeño en mercado para medir la precisión y recalibrar el panel.</small></div>
          <button className="pvm-x" onClick={onClose}><Icon n="x" w={16} /></button>
        </div>
        <div className="pvm-body">
          <div className="field">
            <label>Campaña</label>
            <select className="select" value={key} onChange={e => onKey(e.target.value)}>
              {PV_CAMPAIGNS.map(c => <option key={c.key} value={c.key}>{c.name}{data[c.key] ? ' · ya registrada' : ''}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Intención de compra real <span className="lbl-hint">encuesta post-campaña · 0–10</span></label>
            <div className="thresh-box"><span className="tv num">{Number(intent).toFixed(1)}</span>
              <div className="tt"><b>Predicho por el panel: {camp.pred}</b><p>Diferencia: {(intent - camp.pred).toFixed(1)} pts → {accuracyOf(camp.pred, intent)}% precisión.</p></div>
              <input className="range" type="range" min="0" max="10" step="0.1" value={intent} onChange={e => setIntent(+e.target.value)} />
            </div>
          </div>
          <div className="pvm-grid">
            <div className="field"><label>Lift de ventas (%)</label><input className="input" type="number" value={lift} onChange={e => setLift(+e.target.value)} /></div>
            <div className="field"><label>Recall publicitario (%)</label><input className="input" type="number" value={recall} onChange={e => setRecall(+e.target.value)} /></div>
          </div>
          <div className="field">
            <label>¿Cumplió el objetivo de negocio?</label>
            <div className="seg2">
              <button className={cumplio ? 'on' : ''} onClick={() => setCumplio(true)}>Sí cumplió</button>
              <button className={!cumplio ? 'on' : ''} onClick={() => setCumplio(false)}>No cumplió</button>
            </div>
          </div>
          <div className="field"><label>Nota / fuente <span className="lbl-hint">opcional</span></label><textarea className="input" rows="2" value={nota} placeholder="Ej. encuesta n=600, sell-out Nielsen, brand lift study…" onChange={e => setNota(e.target.value)} /></div>
        </div>
        <div className="pvm-foot">
          <span className="pvm-note"><Icon n="cpu" w={14} /> Se almacena y alimenta el raciocinio de los agentes.</span>
          <div className="pvm-actions">
            <button className="btn ghost" onClick={onClose}>Cancelar</button>
            <button className="btn primary" onClick={() => onSave(key, { intent: +intent, lift: +lift, recall: +recall, cumplio, nota })}>Guardar resultados</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Insights, Postview });
