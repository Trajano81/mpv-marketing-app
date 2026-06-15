/* Prototipo — App / router */
function ProtoApp() {
  const [route, setRoute] = React.useState('dashboard');
  const [theme, setTheme] = React.useState('dir-a');
  const [ev, setEv] = React.useState({ nse: ['A/B', 'C+', 'C', 'C−', 'D+'], cities: ['CDMX', 'Guadalajara', 'Monterrey'] });
  const go = (r) => { setRoute(r); const el = document.querySelector('.scroll, .wz-scroll'); if (el) el.scrollTop = 0; };

  let screen;
  if (route === 'dashboard')
    screen = <Dashboard go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'products')
    screen = <Products go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'library')
    screen = <Library go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'analyses')
    screen = <Analyses go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'personas')
    screen = <Personas go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'ajustes')
    screen = <Settings go={go} theme={theme} setTheme={setTheme} />;
  else if (route.startsWith('w'))
    screen = <Wizard route={route} go={go} ev={ev} setEv={setEv} theme={theme} setTheme={setTheme} />;
  else if (route === 'progress')
    screen = <Progress go={go} theme={theme} setTheme={setTheme} />;
  else if (route === 'results')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><ResultsExec /></ResultsShell>;
  else if (route === 'desglose')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><Desglose /></ResultsShell>;
  else if (route === 'recos')
    screen = <ResultsShell route={route} go={go} theme={theme} setTheme={setTheme}><Recos /></ResultsShell>;

  // wizard screens carry their own topbar with the theme toggle built in
  return (
    <div className={`ui-screen proto-root ${theme}`}>
      <div className="app">
        <Sidebar route={route} go={go} />
        {screen}
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProtoApp />);
