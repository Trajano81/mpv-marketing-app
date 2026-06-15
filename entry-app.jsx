/* Entrada — login + selección de rol (T1). Reutiliza Icon de proto-ui.jsx */
const { useState: useStateE } = React;

const ROLES = [
  { id: 'tenant', href: 'Prototipo navegable.html', icon: 'box', t: 'Equipo de marketing', d: 'Sube piezas, define el panel y lee resultados de tu workspace.', tag: 'Portal del tenant' },
  { id: 'admin', href: 'SPA de Administración.html', icon: 'cpu', t: 'Operador de plataforma', d: 'Catálogos, tenants, modelos y monitor de ejecuciones.', tag: 'Consola admin' },
];

function Entry() {
  const [theme, setTheme] = useStateE('dir-a');
  const [role, setRole] = useStateE('tenant');
  const current = ROLES.find(r => r.id === role);
  return (
    <div className={`ui-screen entry ${theme}`}>
      <div className="entry-grid">
        {/* ---- brand panel ---- */}
        <aside className="entry-brand">
          <div className="eb-top">
            <span className="brand-mark"><Icon n="flask" w={20} s={1.8} /></span>
            <div className="brand-text"><b>Panel Sintético</b><small>Pre-test creativo · MX</small></div>
          </div>
          <div className="eb-mid">
            <span className="eb-eyebrow">Panel sintético de consumidores</span>
            <h1>Pre-testea tu campaña con 187 consumidores mexicanos antes de gastar el primer peso en medios.</h1>
            <ul className="eb-list">
              <li><Icon n="check" w={16} /> Personas ancladas en AMAI · ENIGH · Censo 2020</li>
              <li><Icon n="check" w={16} /> Score tipo LINK + gate de intención de compra</li>
              <li><Icon n="check" w={16} /> Diagnóstico por NSE, ciudad y dimensión + PDF</li>
            </ul>
          </div>
          <div className="eb-foot">
            <div className="eb-quote">“Esto me habla a mí.”</div>
            <span>— señal direccional de relevancia cultural, no ground truth.</span>
          </div>
          <div className="eb-glow" />
        </aside>

        {/* ---- form panel ---- */}
        <main className="entry-form">
          <div className="ef-toggle"><ThemeToggle theme={theme} setTheme={setTheme} /></div>
          <div className="ef-box">
            <h2>Inicia sesión</h2>
            <p className="ef-sub">Bienvenido de vuelta. Elige cómo quieres entrar.</p>

            <div className="ef-roles">
              {ROLES.map(r => (
                <button key={r.id} className={`role-card ${role === r.id ? 'on' : ''}`} onClick={() => setRole(r.id)}>
                  <span className="rc-ic"><Icon n={r.icon} w={18} /></span>
                  <span className="rc-t"><b>{r.t}</b><small>{r.tag}</small></span>
                  <span className="rc-radio" />
                </button>
              ))}
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label>Correo de trabajo</label>
              <input className="input" defaultValue={role === 'admin' ? 'diego@plataforma.mx' : 'mariana@aurorabebidas.mx'} />
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>Contraseña</label>
              <input className="input" type="password" defaultValue="••••••••••" />
            </div>

            <a className="btn primary big-entry" href={current.href}>
              Entrar como {role === 'admin' ? 'operador' : 'marketing'} <Icon n="arrowR" w={16} />
            </a>
            <div className="ef-links">
              <span>¿Olvidaste tu contraseña?</span>
              <span className="dot-sep">·</span>
              <span>SSO empresarial</span>
            </div>
          </div>
          <div className="ef-legal">Señal direccional de pre-screening · v0.1 MVP</div>
        </main>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<Entry />);
