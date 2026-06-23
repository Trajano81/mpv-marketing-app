/* Prototipo — Wizard Paso 1 reconstruido: "Campaña y contexto".
   - Nombre de campaña como campo principal (varía en modo Pieza única)
   - Categoría y Tipo de campaña creables/eliminables por tenant (localStorage)
   - Target declarado por categorías expandibles con subcategorías
   Reutiliza ChipSel (proto-wizard.jsx) e Icon/Btn (proto-ui.jsx). */
const { useState: useStateW1 } = React;

/* ---- persistencia por tenant ---- */
const TENANT = 'aurora';
function loadList(key, def) { try { const v = JSON.parse(localStorage.getItem(`mkt_${key}_${TENANT}`)); return Array.isArray(v) && v.length ? v : def; } catch (e) { return def; } }
function saveList(key, arr) { try { localStorage.setItem(`mkt_${key}_${TENANT}`, JSON.stringify(arr)); } catch (e) {} }
function loadObj(key, def) { try { const v = JSON.parse(localStorage.getItem(`mkt_${key}_${TENANT}`)); return v && typeof v === 'object' && !Array.isArray(v) ? { ...def, ...v } : def; } catch (e) { return def; } }
function saveObj(key, obj) { try { localStorage.setItem(`mkt_${key}_${TENANT}`, JSON.stringify(obj)); } catch (e) {} }

const DEF_CATS = ['Bebidas', 'Alimentos', 'Cuidado personal', 'Retail', 'Financiero', 'Telecom', 'Venta de vehículos'];
/* Canales de compra precargados por categoría de producto */
const CAT_CHANNELS = {
  'Bebidas': ['Tienda de barrio', 'Oxxo', 'Supermercado', 'Bodega Aurrera'],
  'Alimentos': ['Tienda de barrio', 'Supermercado', 'Mercado / tianguis', 'Bodega Aurrera', 'Ecommerce'],
  'Cuidado personal': ['Farmacia', 'Supermercado', 'Tienda departamental', 'Tienda especializada', 'Ecommerce'],
  'Retail': ['Tienda física', 'Tienda departamental', 'Marketplace', 'Ecommerce', 'Outlet'],
  'Financiero': ['Sucursal bancaria', 'App / banca digital', 'Cajero', 'Corresponsal', 'Asesor'],
  'Telecom': ['Tienda de la marca', 'Distribuidor autorizado', 'Autoservicio', 'Ecommerce', 'Call center'],
  'Venta de vehículos': ['Concesionario', 'Reventa / seminuevos', 'Ecommerce / marketplace', 'Agencia de marca'],
};
const DEF_TIPOS = ['Lanzamiento de un nuevo producto', 'Campaña Core', 'Modernización marca', 'Evento', 'Influencers'];
const DEF_CANALES = ['TV abierta nacional', 'TV de paga', 'Streaming', 'YouTube', 'TikTok', 'Instagram', 'Facebook', 'OOH / Valla', 'Radio', 'Cine', 'WhatsApp', 'Spotify', 'Influencer'];
const DEF_PLAZAS = ['Nacional', 'CDMX', 'Zona Metropolitana', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Mérida', 'León', 'Querétaro', 'Cancún', 'Norte', 'Bajío', 'Occidente', 'Centro', 'Sur', 'Sureste'];

/* ---- select editable (crear / eliminar opciones) ---- */
function EditableSelect({ value, onChange, options, onAdd, onDelete, placeholder }) {
  const [open, setOpen] = useStateW1(false);
  const [draft, setDraft] = useStateW1('');
  const add = () => { const v = draft.trim(); if (v && !options.includes(v)) { onAdd(v); onChange(v); } setDraft(''); };
  return (
    <div className={`esel ${open ? 'open' : ''}`}>
      <button type="button" className="esel-btn" onClick={() => setOpen(o => !o)}>
        <span className={value ? '' : 'ph'}>{value || placeholder}</span><Icon n="chevron" w={16} />
      </button>
      {open && <>
        <div className="esel-scrim" onClick={() => setOpen(false)} />
        <div className="esel-pop">
          <div className="esel-opts">
            {options.map(o => (
              <div key={o} className={`esel-opt ${o === value ? 'sel' : ''}`} onClick={() => { onChange(o); setOpen(false); }}>
                {o === value ? <Icon n="check" w={14} /> : <span className="esel-spacer" />}
                <span className="esel-lbl">{o}</span>
                <button className="esel-del" title="Eliminar" onClick={e => { e.stopPropagation(); onDelete(o); }}><Icon n="x" w={12} /></button>
              </div>
            ))}
          </div>
          <div className="esel-add">
            <input value={draft} placeholder="Crear nueva…" onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
            <button type="button" onClick={add}><Icon n="plus" w={15} /></button>
          </div>
        </div>
      </>}
    </div>
  );
}

/* ---- multi-select con tokens (varios + crear/eliminar del catálogo) ---- */
function MultiSelect({ values, onToggle, options, onAdd, onRemoveOption, placeholder }) {
  const [open, setOpen] = useStateW1(false);
  const [draft, setDraft] = useStateW1('');
  const add = () => { const v = draft.trim(); if (!v) return; if (!options.includes(v)) onAdd(v); if (!values.includes(v)) onToggle(v); setDraft(''); };
  return (
    <div className={`msel ${open ? 'open' : ''}`}>
      <div className="msel-field" onClick={() => setOpen(o => !o)}>
        <div className="msel-tags">
          {values.length
            ? values.map(v => <span className="msel-tag" key={v} onClick={e => { e.stopPropagation(); onToggle(v); }}>{v}<Icon n="x" w={11} /></span>)
            : <span className="msel-ph">{placeholder}</span>}
        </div>
        <Icon n="chevron" w={15} />
      </div>
      {open && <>
        <div className="esel-scrim" onClick={() => setOpen(false)} />
        <div className="esel-pop">
          <div className="esel-opts">
            {options.map(o => (
              <div key={o} className={`esel-opt ${values.includes(o) ? 'sel' : ''}`} onClick={() => onToggle(o)}>
                <span className="msel-box">{values.includes(o) && <Icon n="check" w={12} />}</span>
                <span className="esel-lbl">{o}</span>
                <button className="esel-del" title="Quitar del catálogo" onClick={e => { e.stopPropagation(); onRemoveOption(o); }}><Icon n="x" w={12} /></button>
              </div>
            ))}
          </div>
          <div className="esel-add">
            <input value={draft} placeholder="Crear nuevo…" onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
            <button type="button" onClick={add}><Icon n="plus" w={15} /></button>
          </div>
        </div>
      </>}
    </div>
  );
}

/* ---- catálogo de targets con subcategorías ---- */
const TARGET_GROUPS = [
  { id: 'nse', ic: 'coin', label: 'NSE', hint: 'Nivel socioeconómico · INEGI / AMAI', items: ['A/B', 'C+', 'C', 'C−', 'D+', 'D', 'E'] },
  { id: 'sexo', ic: 'users', label: 'Sexo y género', hint: 'Incluye comunidades diversas', items: ['Hombre', 'Mujer', 'No binario', 'Comunidad LGBT+', 'Trans'] },
  { id: 'edad', ic: 'clock', label: 'Edad', items: ['13–17', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'] },
  { id: 'generacion', ic: 'pulse', label: 'Generación', items: ['Gen Alfa', 'Gen Z', 'Millennials', 'Gen X', 'Boomers', 'Silent'] },
  { id: 'hogar', ic: 'home', label: 'Tipo de hogar', items: ['Soltero(a)', 'Pareja sin hijos', 'Familias jóvenes', 'Familias con hijos', 'Nido vacío', 'Multigeneracional', 'Roomies'] },
  { id: 'intereses', ic: 'spark', label: 'Intereses', hint: 'Afinidades de estilo de vida', items: ['Deportes', 'Fútbol', 'Fitness', 'Gaming', 'Música', 'Cine y series', 'Viajes', 'Moda', 'Belleza', 'Gastronomía', 'Cocina', 'Tecnología', 'Finanzas personales', 'Autos', 'Mascotas', 'Arte', 'Fotografía', 'Lectura', 'Salud y bienestar', 'Vida nocturna', 'Familia y crianza', 'Sustentabilidad'] },
  { id: 'tipoinfluencer', ic: 'spark', label: 'Tipo de influencer que sigue', hint: 'Por afinidad de contenido', items: ['Comedia / Entretenimiento', 'Belleza y maquillaje', 'Fitness y salud', 'Gaming', 'Lifestyle', 'Gastronomía / Food', 'Moda', 'Viajes', 'Música', 'Educación / Divulgación', 'Finanzas', 'Tecnología', 'Mamás / Familia', 'Deportes'] },
  { id: 'influencers', ic: 'idcard', label: 'Influencers que sigue', hint: 'Creadores específicos · agrega los que quieras', creatable: true, items: ['Kimberly Loaiza', 'Juanpa Zurita', 'Kenia OS', 'Luisito Comunica', 'Yeri Mua'] },
  { id: 'medios', ic: 'tv', label: 'Consumo de medios', items: ['TV abierta', 'TV de paga', 'Streaming', 'YouTube', 'TikTok', 'Instagram', 'Facebook', 'WhatsApp', 'Spotify', 'Radio', 'Podcast', 'Periódico', 'Revistas'] },
  { id: 'canales', ic: 'cart', label: 'Canales de compra', hint: 'Según la categoría del producto (Paso 1)', dynamic: true, items: [] },
  { id: 'transporte', ic: 'car', label: 'Medio de transporte usado por el agente tester', items: ['Auto propio', 'Transporte público', 'Metro / Metrobús', 'Bicicleta', 'Motocicleta', 'A pie', 'App de movilidad'] },
  {
    id: 'geo', ic: 'globe', label: 'Geografía', hint: 'Por región, estado o ciudad', groups: [
      { sub: 'Regiones', items: ['Norte', 'Bajío', 'Occidente', 'Centro', 'Sur', 'Sureste', 'Península'] },
      { sub: 'Estados', items: ['CDMX', 'Jalisco', 'Nuevo León', 'Edo. de México', 'Puebla', 'Guanajuato', 'Veracruz', 'Yucatán', 'Oaxaca', 'Baja California', 'Chihuahua', 'Quintana Roo'] },
      { sub: 'Ciudades', items: ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Mérida', 'León', 'Querétaro', 'Cancún', 'Oaxaca'] },
    ],
  },
];

/* ---- editor de canales de compra por categoría (Paso 1) ---- */
function ChannelEditor({ channels, onAdd, onRemove }) {
  const [draft, setDraft] = useStateW1('');
  const add = () => { const v = draft.trim(); if (v) { onAdd(v); setDraft(''); } };
  return (
    <div className="chan-editor">
      <div className="chan-chips">
        {channels.length
          ? channels.map(c => (
            <span className="chan-chip" key={c}>{c}<button type="button" className="chip-x" title="Eliminar" onClick={() => onRemove(c)}><Icon n="x" w={11} /></button></span>
          ))
          : <span className="chan-empty">Sin canales — agrega los puntos de venta de esta categoría</span>}
      </div>
      <div className="chan-add">
        <input value={draft} placeholder="Agregar canal de compra…" onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
        <button type="button" onClick={add}><Icon n="plus" w={15} /> Agregar</button>
      </div>
    </div>
  );
}

function GroupAdder({ onAdd }) {
  const [draft, setDraft] = useStateW1('');
  const add = () => { const v = draft.trim(); if (v) { onAdd(v); setDraft(''); } };
  return (
    <div className="tg-add">
      <input value={draft} placeholder="Agregar otro influencer…" onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
      <button type="button" onClick={add}><Icon n="plus" w={15} /></button>
    </div>
  );
}

function TargetGroups({ sel, setSel, chanItems }) {
  const [openId, setOpenId] = useStateW1('nse');
  const [lists, setLists] = useStateW1(() => { const o = {}; TARGET_GROUPS.forEach(g => { if (g.creatable) o[g.id] = [...g.items]; }); return o; });
  const toggleItem = (gid, item) => setSel(s => {
    const arr = s[gid] || []; const next = arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
    return { ...s, [gid]: next };
  });
  const addCustom = (gid, v) => {
    setLists(s => (s[gid] || []).includes(v) ? s : ({ ...s, [gid]: [...(s[gid] || []), v] }));
    setSel(s => ({ ...s, [gid]: (s[gid] || []).includes(v) ? s[gid] : [...(s[gid] || []), v] }));
  };
  const removeItem = (gid, v) => {
    setLists(s => ({ ...s, [gid]: (s[gid] || []).filter(x => x !== v) }));
    setSel(s => ({ ...s, [gid]: (s[gid] || []).filter(x => x !== v) }));
  };
  return (
    <div className="tgroups">
      {TARGET_GROUPS.map(g => {
        const open = openId === g.id;
        const items = g.creatable ? (lists[g.id] || []) : (g.dynamic ? (chanItems || []) : g.items);
        const c = (sel[g.id] || []).length;
        return (
          <div className={`tgroup ${open ? 'open' : ''}`} key={g.id}>
            <button type="button" className="tg-head" onClick={() => setOpenId(open ? null : g.id)}>
              <span className="tg-ic"><Icon n={g.ic} w={16} /></span>
              <div className="tg-id"><b>{g.label}</b>{g.hint && <small>{g.hint}</small>}</div>
              {c > 0 && <span className="tg-count num">{c}</span>}
              <Icon n="chevron" w={16} />
            </button>
            {open && (
              <div className="tg-body">
                {g.dynamic && !items.length
                  ? <div className="hint">Define los canales de compra de esta categoría en el <b>Paso 1</b> para poder segmentarlos aquí.</div>
                  : g.groups
                  ? g.groups.map(sub => (
                    <div className="tg-sub" key={sub.sub}>
                      <span className="tg-sublbl">{sub.sub}</span>
                      <div className="chip-row">{sub.items.map(it =>
                        <ChipSel key={sub.sub + it} check on={(sel[g.id] || []).includes(it)} onClick={() => toggleItem(g.id, it)}>{it}</ChipSel>)}</div>
                    </div>
                  ))
                  : <div className="chip-row">{items.map(it => g.creatable
                    ? <span key={it} className={`chip-sel del-chip ${(sel[g.id] || []).includes(it) ? 'on' : ''}`} onClick={() => toggleItem(g.id, it)}>
                        {(sel[g.id] || []).includes(it) && <Icon n="check" w={14} />}{it}
                        <button type="button" className="chip-x" title="Eliminar" onClick={e => { e.stopPropagation(); removeItem(g.id, it); }}><Icon n="x" w={12} /></button>
                      </span>
                    : <ChipSel key={it} check on={(sel[g.id] || []).includes(it)} onClick={() => toggleItem(g.id, it)}>{it}</ChipSel>)}</div>}
                {g.creatable && <GroupAdder onAdd={v => addCustom(g.id, v)} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepCampana({ mode = 'campana', ev, setEv }) {
  const [cats, setCats] = useStateW1(() => loadList('cat', DEF_CATS));
  const [cat, setCat] = useStateW1(() => loadList('cat', DEF_CATS)[0]);
  const [tipos, setTipos] = useStateW1(() => loadList('tipo', DEF_TIPOS));
  const [tipo, setTipo] = useStateW1(() => loadList('tipo', DEF_TIPOS)[0]);
  const [catCh, setCatCh] = useStateW1(() => loadObj('catch', CAT_CHANNELS));

  const channels = catCh[cat] || [];
  const writeCh = (c, arr) => { const n = { ...catCh, [c]: arr }; setCatCh(n); saveObj('catch', n); };
  const addCh = (v) => { const t = v.trim(); if (t && !channels.includes(t)) writeCh(cat, [...channels, t]); };
  const removeCh = (v) => writeCh(cat, channels.filter(x => x !== v));

  React.useEffect(() => {
    if (setEv) setEv(s => ({ ...s, catId: cat, canalesCat: catCh[cat] || [] }));
  }, [cat, catCh]);

  const addCat = (v) => { const n = [...cats, v]; setCats(n); saveList('cat', n); if (!catCh[v]) writeCh(v, []); };
  const delCat = (v) => { const n = cats.filter(x => x !== v); setCats(n); saveList('cat', n); if (cat === v) setCat(n[0] || ''); };
  const addTipo = (v) => { const n = [...tipos, v]; setTipos(n); saveList('tipo', n); };
  const delTipo = (v) => { const n = tipos.filter(x => x !== v); setTipos(n); saveList('tipo', n); if (tipo === v) setTipo(n[0] || ''); };

  const isCamp = mode === 'campana';

  return (
    <div>
      <div className="wz-head">
        <span className="eyebrow">Paso 1 de 5</span>
        <h1>{isCamp ? 'Campaña y contexto' : 'Pieza y contexto'}</h1>
        <p>{isCamp
          ? 'Define la campaña y su contexto. Esto alimenta al agente de percepción y a la selección de personas — y se reutiliza cada vez que agregues una pieza nueva.'
          : 'Analiza una sola pieza sin crear una campaña completa. Igual capturas el contexto mínimo para que el panel la juzgue bien.'}</p>
      </div>

      <div className="form-grid">
        <div className="field full">
          <label>{isCamp ? 'Nombre de la campaña' : 'Nombre de la pieza'} <span className="opt">· campo principal</span></label>
          <input className="input lead" defaultValue={isCamp ? 'Verano Aurora 2025' : 'spot_30s_sabor'} placeholder={isCamp ? 'Ej. Verano Aurora 2025' : 'Ej. spot_30s_sabor'} />
        </div>

        <div className="field">
          <label>Categoría <span className="opt">· tuya, editable</span></label>
          <EditableSelect value={cat} onChange={setCat} options={cats} onAdd={addCat} onDelete={delCat} placeholder="Elige o crea…" />
        </div>
        <div className="field"><label>Marca</label><input className="input" defaultValue="Aurora" /></div>

        <div className="field full">
          <label>Canales de compra <span className="opt">· de la categoría «{cat || '—'}» · se usan en Segmentación</span></label>
          <ChannelEditor channels={channels} onAdd={addCh} onRemove={removeCh} />
        </div>

        <div className="field full"><label>Nombre del producto</label><input className="input" defaultValue="Néctar Aurora Mango" /></div>
        <div className="field full"><label>Descripción <span className="opt">· qué es y qué promete</span></label>
          <textarea className="textarea" defaultValue="Néctar de mango 100% natural, sin azúcar añadida: 'el sabor de casa', dirigido a familias que buscan opciones más sanas sin perder el sabor de siempre." /></div>

        <div className="field"><label>Precio percibido <span className="opt">· MXN</span></label><input className="input num" defaultValue="$24.00 / 1L" /></div>
        {isCamp && <div className="field">
          <label>Tipo de campaña <span className="opt">· editable</span></label>
          <EditableSelect value={tipo} onChange={setTipo} options={tipos} onAdd={addTipo} onDelete={delTipo} placeholder="Elige o crea…" />
        </div>}
      </div>
    </div>
  );
}

Object.assign(window, { StepCampana, EditableSelect, TargetGroups, MultiSelect, ChannelEditor, loadList, saveList, loadObj, saveObj, CAT_CHANNELS, DEF_CANALES, DEF_PLAZAS });
