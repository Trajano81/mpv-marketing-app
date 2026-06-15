/* Admin SPA — router */
function AdminApp() {
  const [route, setRoute] = React.useState('a1');
  const [theme, setTheme] = React.useState('dir-a');
  const go = (r) => { setRoute(r); const el = document.querySelector('.scroll'); if (el) el.scrollTop = 0; };
  React.useEffect(() => { window.setGoA8(() => go('a8')); }, []);
  const map = { a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8, a9: A9 };
  const Screen = map[route] || A1;
  return (
    <div className={`ui-screen proto-root ${theme}`}>
      <div className="app">
        <AdminSidebar route={route} go={go} />
        <Screen go={go} theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp />);
