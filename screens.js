/* Iconos (línea, 20x20) y plantillas de pantalla compartidas.
   La misma estructura se pinta con .dir-a / .dir-b. */
(function () {
  const I = {
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
    flask: '<path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3L14 9V3"/>',
  };
  const svg = (n, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 1.7}" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;

  const sidebar = (active) => `
    <aside class="sidebar">
      <div class="side-brand">
        <span class="brand-mark">${svg('flask', 1.8)}</span>
        <div class="brand-text"><b>Panel Sintético</b><small>Pre-test creativo · MX</small></div>
      </div>
      <div class="ws">
        <span class="ws-logo">AB</span>
        <div class="ws-text"><b>Aurora Bebidas</b><small>Workspace</small></div>
        ${svg('chevron')}
      </div>
      <nav class="nav">
        <div class="nav-label">Trabajo</div>
        <a class="nav-item ${active==='home'?'is-active':''}">${svg('home')} Inicio</a>
        <a class="nav-item ${active==='prod'?'is-active':''}">${svg('box')} Productos</a>
        <a class="nav-item ${active==='an'?'is-active':''}">${svg('chart')} Análisis <span class="nav-count">3</span></a>
        <a class="nav-item">${svg('layers')} Biblioteca</a>
        <div class="nav-label">Configuración</div>
        <a class="nav-item">${svg('users')} Personas</a>
        <a class="nav-item">${svg('gear')} Ajustes</a>
      </nav>
      <div class="side-foot">
        <div class="usage">
          <div class="usage-head"><span>Plan Pro</span><span class="num">72%</span></div>
          <div class="usage-bar"><i style="width:72%"></i></div>
          <small>3,600 / 5,000 agentes este mes</small>
        </div>
        <div class="user">
          <span class="avatar">MR</span>
          <div class="user-text"><b>Mariana Ruiz</b><small>Estrategia creativa</small></div>
        </div>
      </div>
    </aside>`;

  /* ===================== DASHBOARD (T2) ===================== */
  const kpi = (label, ic, val, small, delta, dcls, dic) => `
    <div class="kpi">
      <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-ic">${svg(ic)}</span></div>
      <div class="kpi-val num">${val}${small?`<small> ${small}</small>`:''}</div>
      <span class="kpi-delta ${dcls}">${dic?svg(dic):''}${delta}</span>
    </div>`;

  const gate = (dot, num) => `<span class="gate"><span class="gate-dot" style="background:${dot}"></span><span class="gate-num num">${num}</span></span>`;
  const row = (o) => `
    <div class="row">
      <div class="cell piece">
        <span class="thumb ${o.thv} ${o.img?'':''}">${svg(o.img?'image':'play', o.img?1.7:1)}</span>
        <span class="piece-meta"><b>${o.name}</b><small>${o.cat}</small></span>
      </div>
      <div class="cell expo"><b>${o.chan}</b><small>${o.plaza}</small></div>
      <div class="cell num">${o.panel}</div>
      <div class="cell"><span class="score-pill ${o.comp==='—'?'muted':''}">${o.comp}</span></div>
      <div class="cell">${o.gateTag}</div>
      <div class="cell">${o.state}</div>
      <div class="cell date">${o.date}</div>
    </div>`;

  window.DASHBOARD_HTML = `
  <div class="app">
    ${sidebar('home')}
    <div class="main">
      <header class="topbar">
        <div class="search">${svg('search')}<input placeholder="Buscar productos, piezas, evaluaciones…"></div>
        <div class="top-actions">
          <button class="btn ghost icon">${svg('filter')}</button>
          <button class="btn primary">${svg('plus')} Nuevo análisis</button>
        </div>
      </header>
      <div class="scroll">
        <div class="page-head">
          <div>
            <h1>Evaluaciones</h1>
            <p>Pre-tests de tus piezas, evaluadas por el panel sintético de consumidores.</p>
          </div>
        </div>
        <div class="kpis">
          ${kpi('Análisis este mes','flask','24','','+6 vs. mayo','up','up')}
          ${kpi('Score compuesto prom.','chart','7.2','/10','+0.3 pts','up','up')}
          ${kpi('Tasa de aprobación','check','58','%','3 de 5 pasan el gate','flat')}
          ${kpi('Agentes corridos','users','4,488','','187 prom. por análisis','flat')}
        </div>
        <div class="toolbar">
          <div class="tabs">
            <span class="tab is-active">Todas <span class="pill">12</span></span>
            <span class="tab">Listo</span>
            <span class="tab">En análisis</span>
            <span class="tab">Borrador</span>
          </div>
          <div class="right">
            <button class="btn ghost">${svg('filter')} NSE · Ciudad</button>
          </div>
        </div>
        <div class="table">
          <div class="thead">
            <span>Pieza</span><span>Exposición</span><span>Panel</span><span>Compuesto</span><span>Intención · Gate</span><span>Estado</span><span>Fecha</span>
          </div>
          <div class="rows">
            ${row({thv:'v1',name:'Spot 30s — “Sabor que abraza”',cat:'Néctar Mango · Bebidas',chan:'TV abierta',plaza:'Nacional',panel:'187',comp:'7.8',gateTag:gate('var(--pass)','7.9')+' <span class="tag pass">'+svg('check')+'Pasa</span>',state:'<span class="state ready"><span class="dot"></span>Listo</span>',date:'12 jun'})}
            ${row({thv:'v6',name:'Influencer MTY — receta',cat:'Néctar Mango · Bebidas',chan:'TikTok',plaza:'Monterrey',panel:'110',comp:'8.3',gateTag:gate('var(--pass)','8.5')+' <span class="tag pass">'+svg('check')+'Pasa</span>',state:'<span class="state ready"><span class="dot"></span>Listo</span>',date:'7 jun'})}
            ${row({thv:'v3',name:'Reel @chefcito',cat:'Tamarindo · Bebidas',chan:'TikTok',plaza:'Nacional',panel:'142',comp:'7.1',gateTag:gate('var(--warn)','7.3')+' <span class="tag warn">Al límite</span>',state:'<span class="state ready"><span class="dot"></span>Listo</span>',date:'10 jun'})}
            ${row({thv:'v2',img:1,name:'Valla Insurgentes Sur',cat:'Néctar Mango · Bebidas',chan:'OOH / Valla',plaza:'CDMX',panel:'96',comp:'6.4',gateTag:gate('var(--fail)','6.1')+' <span class="tag fail">Regresa</span>',state:'<span class="state ready"><span class="dot"></span>Listo</span>',date:'11 jun'})}
            ${row({thv:'v5',name:'Spot 15s — corte',cat:'Tamarindo · Bebidas',chan:'TV abierta',plaza:'Norte',panel:'—',comp:'—',gateTag:'<span class="tag neutral">Procesando</span>',state:'<span class="state run"><span class="dot"></span>Fan-out 64%<span class="mini-prog"><i style="width:64%"></i></span></span>',date:'12 jun'})}
            ${row({thv:'v4',img:1,name:'Carrusel lanzamiento',cat:'Néctar Guayaba · Bebidas',chan:'Instagram',plaza:'—',panel:'—',comp:'—',gateTag:'<span class="tag neutral">Sin correr</span>',state:'<span class="state draft"><span class="dot"></span>Borrador</span>',date:'9 jun'})}
          </div>
        </div>
      </div>
    </div>
  </div>`;

  /* ===================== RESULTADOS — EJECUTIVA (T9) ===================== */
  const dim = (name, ref, val, pct, avgPct, cls) => `
    <div class="dim">
      <div class="dim-name">${name}<small>${ref}</small></div>
      <div class="track"><div class="fill ${cls||''}" style="width:${pct}%"></div><div class="avg-mark" style="left:${avgPct}%"></div></div>
      <div class="dim-val num">${val}</div>
    </div>`;
  const heat = (nse, v, wt, color) => `<div class="heatcell" style="background:${color}"><div class="nse">${nse}</div><div class="hv">${v}</div><div class="wt">${wt}</div></div>`;

  window.RESULTS_HTML = `
  <div class="app">
    ${sidebar('an')}
    <div class="main">
      <header class="topbar">
        <div class="crumbs">Evaluaciones · <b>Néctar Aurora Mango</b></div>
        <div class="top-actions">
          <button class="btn ghost">${svg('share')} Compartir</button>
          <button class="btn primary">${svg('download')} Exportar PDF</button>
        </div>
      </header>
      <div class="scroll">
        <div class="res-head">
          <div class="res-piece">
            <span class="thumb big v1">${svg('play',1)}</span>
            <div>
              <h1>Spot 30s — “Sabor que abraza”</h1>
              <div class="res-meta">
                <span class="chip">Video</span>
                <span class="chip">TV abierta · Nacional</span>
                <span class="chip">Néctar Aurora Mango</span>
                <span class="chip accent">Panel N = 187</span>
                <span class="chip">12 jun 2026</span>
              </div>
            </div>
          </div>
          <div class="res-tabs">
            <a class="is-active">Vista ejecutiva</a><a>Desglose</a><a>Recomendaciones</a>
          </div>
        </div>

        <div class="hero">
          <div class="hero-card score">
            <span class="eyebrow">Índice de Efectividad Creativa</span>
            <div class="gauge" style="--val:78">
              <div class="gauge-num"><b>7.8</b><small>/ 10</small></div>
            </div>
            <div class="score-foot"><b>+0.9</b> sobre el promedio de categoría (6.9)</div>
          </div>

          <div class="hero-card gate">
            <span class="eyebrow">Gate · Intención de compra</span>
            <div class="gate-big"><b>7.9</b><span class="gate-vs">vs. umbral 7.5</span></div>
            <div class="gate-status">
              <span class="tag pass">${svg('check')} La pieza pasa</span>
              <p>La intención de compra ponderada supera el umbral del workspace. Avanza a producción.</p>
            </div>
            <div class="gate-meter"><i style="width:79%"></i><span class="thresh" style="left:75%"></span></div>
          </div>

          <div class="hero-card verdict">
            <span class="eyebrow">Lectura rápida</span>
            <ul class="verdict-list">
              <li class="up">${svg('up')}<span><b>Relevancia cultural alta (8.4).</b> “Esto me habla a mí” — la pieza conecta.</span></li>
              <li class="up">${svg('up')}<span><b>Atractivo y memorabilidad fuertes.</b> Entretiene y se recuerda.</span></li>
              <li class="down">${svg('down')}<span><b>Vínculo de marca débil (6.2).</b> Recuerdan el spot, no la marca.</span></li>
              <li class="down">${svg('down')}<span><b>NSE D+ hacia abajo</b> queda por debajo del umbral.</span></li>
            </ul>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <h2>Diagnóstico por dimensión</h2>
            <span class="legend">marcador = promedio de categoría</span>
          </div>
          <div class="dim-list">
            ${dim('Relevancia cultural','Diferenciador MX','8.4',84,65,'strong')}
            ${dim('Atractivo (Enjoyment)','Kantar LINK','8.0',80,71,'')}
            ${dim('Claridad del mensaje','Kantar LINK','7.9',79,70,'')}
            ${dim('Intención de compra','Actionable standard','7.9',79,69,'')}
            ${dim('Memorabilidad','LINK / System1','7.6',76,68,'')}
            ${dim('Distintividad','Ehrenberg-Bass','7.0',70,66,'')}
            ${dim('Vínculo de marca (Fluency)','System1','6.2',62,69,'weak')}
          </div>
        </div>

        <div class="two-col">
          <div class="panel">
            <div class="panel-head"><h2>Intención por nivel socioeconómico</h2></div>
            <div class="heat-grid">
              ${heat('A/B','8.6','11%','#15803D')}
              ${heat('C+','8.1','14%','#3F9D52')}
              ${heat('C','7.7','19%','#67A33F')}
              ${heat('C−','7.4','17%','#B98A1E')}
              ${heat('D+','6.8','21%','#C56A22')}
              ${heat('D','5.9','13%','#BE4A2A')}
              ${heat('E','5.1','5%','#A8302E')}
            </div>
            <p class="heat-note">El gate se cumple en <b>A/B–C</b>; se pierde de <b>C−</b> hacia abajo. La pieza no le habla a los segmentos bajos — coherente con el claim aspiracional.</p>
          </div>

          <div class="panel verbatims">
            <div class="panel-head"><h2>Verbatims</h2></div>
            <div class="vquote">
              <p>“El color del mango se ve bien rico, se me antojó desde el primer cuadro.”</p>
              <div class="who"><span class="nse-tag">C</span> Mujer, 34 · Guadalajara</div>
            </div>
            <div class="vquote">
              <p>“Bonito el comercial… pero, ¿de qué marca era?”</p>
              <div class="who"><span class="nse-tag">C+</span> Hombre, 41 · CDMX</div>
            </div>
            <div class="vquote">
              <p>“Se siente caro, como que no es para mí.”</p>
              <div class="who"><span class="nse-tag">D+</span> Mujer, 52 · Oaxaca</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
})();
