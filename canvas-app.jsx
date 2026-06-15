const { useState } = React;

function Screen({ html, dir }) {
  return <div className={"ui-screen " + dir} dangerouslySetInnerHTML={{ __html: html }} />;
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="dash" title="T2 · Dashboard" subtitle="Lista de productos y evaluaciones — las dos direcciones, lado a lado">
        <DCArtboard id="dash-a" label="A · Clarity — clara · fría · flat · densa" width={1360} height={892}>
          <Screen html={window.DASHBOARD_HTML} dir="dir-a" />
        </DCArtboard>
        <DCArtboard id="dash-b" label="B · Lumbre — oscura · cálida · redondeada" width={1360} height={892}>
          <Screen html={window.DASHBOARD_HTML} dir="dir-b" />
        </DCArtboard>
      </DCSection>
      <DCSection id="res" title="T9 · Resultados — vista ejecutiva" subtitle="Score compuesto · gate de intención · diagnóstico por dimensión · heatmap NSE">
        <DCArtboard id="res-a" label="A · Clarity" width={1360} height={1058}>
          <Screen html={window.RESULTS_HTML} dir="dir-a" />
        </DCArtboard>
        <DCArtboard id="res-b" label="B · Lumbre" width={1360} height={1058}>
          <Screen html={window.RESULTS_HTML} dir="dir-b" />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
