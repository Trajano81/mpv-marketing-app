/* Prototipo — App / router */
function ProtoApp() {
  const [route, setRoute] = React.useState('dashboard');
  const [theme, setTheme] = React.useState('dir-a');
  const [ev, setEv] = React.useState({
    target: {
      nse: ['A/B', 'C+', 'C', 'C−', 'D+'], geo: ['CDMX', 'Guadalajara', 'Monterrey'],
      generacion: ['Millennials'], hogar: ['Familias jóvenes', 'Familias con hijos'],
      intereses: ['Gastronomía', 'Familia y crianza'], medios: ['TV abierta', 'Facebook'],
    },
    kpis: [
      { name: 'Relevancia cultural', target: 7.0, weight: 22 },
      { name: 'Intención de compra', target: 8.0, weight: 20 },
      { name: 'Atractivo (Enjoyment)', target: 7.0, weight: 16 },
      { name: 'Claridad del mensaje', target: 7.5, weight: 14 },
      { name: 'Memorabilidad', target: 7.0, weight: 12 },
      { name: 'Vínculo de marca', target: 7.0, weight: 10 },
      { name: 'Distintividad', target: 6.5, weight: 6 },
    ],
  });
  const [libCampaign, setLibCampaign] = React.useState(null);
  const [wizMode, setWizMode] = React.useState('campana');
  const go = (r) => {
    if (r === 'new-campana') { setWizMode('campana'); r = 'w1'; }
    else if (r === 'new-pieza') { setWizMode('pieza'); r = 'w1'; }
    setRoute(r); const el = document.querySelector('.scroll, .wz-scroll'); if (el) el.scrollTop = 0;
  };
  const navGo = (r) => { setLibCampaign(null); go(r); };

  let screen;
  if (route === 'dashboard')
    screen = <Dashboard go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'products')
    screen = <Products go={go} setCampaign={setLibCampaign} theme={theme} setTheme={setTheme} />;
  else if (route === 'analyses' || route === 'library')
    screen = <Analyses go={go} campaign={libCampaign} setCampaign={setLibCampaign} theme={theme} setTheme={setTheme} />;
  else if (route === 'insights')
    screen = <Insights go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'postview')
    screen = <Postview go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'personas')
    screen = <Personas go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'ajustes')
    screen = <Settings go={go} theme={theme} setTheme={setTheme} />;
  else if (route.startsWith('w'))
    screen = <Wizard route={route} go={go} ev={ev} setEv={setEv} mode={wizMode} theme={theme} setTheme={setTheme} />;
  else if (route === 'progress')
    screen = <Progress go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'results')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><ResultsExec ev={ev} /></ResultsShell>;
  else if (route === 'desglose')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><Desglose /></ResultsShell>;
  else if (route === 'recos')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><Recos /></ResultsShell>;

  // wizard screens carry their own topbar with the theme toggle built in
  return (
    <div className={`ui-screen proto-root ${theme}`}>
      <div className="app">
        <Sidebar route={route} go={navGo} />
        {screen}
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProtoApp />);
