import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'

const KPIS = [
  { label: 'FY2025 Revenue', value: '$32.5M', sub: '+12.6% YoY', color: 'kpi-green' },
  { label: 'Q1 2026 Revenue', value: '$9.5M', sub: '+14% YoY record', color: 'kpi-green' },
  { label: '2026 Guidance', value: '≥$40M', sub: 'Raised Apr 2026', color: 'kpi-green' },
  { label: 'Cash & Securities', value: '$569M', sub: 'Post-SPAC close', color: 'kpi-green' },
  { label: 'Market Cap', value: '~$3.54B', sub: 'NYSE: $INFQ', color: '' },
  { label: 'Total Debt', value: '$0', sub: 'Debt-free', color: 'kpi-green' },
  { label: 'Shares Outstanding', value: '218.2M', sub: 'Post SPAC close', color: '' },
  { label: 'Fwd P/S (2026E)', value: '~89×', sub: '$3.54B ÷ $40M', color: 'kpi-green' },
]

const MILESTONES = [
  { date: 'May 29, 2026', color: '#4af0b8', tag: 'International', event: 'Oxford Quantum Innovation Centre launched — tripling UK capacity' },
  { date: 'May 21, 2026', color: '#6fcf6f', tag: 'Government', event: '$100M CHIPS Act LOI signed with U.S. Dept. of Commerce' },
  { date: 'May 20, 2026', color: '#cc99ff', tag: 'Technology', event: '1,600 physical qubits · 99.73% CZ-gate fidelity milestone' },
  { date: 'May 14, 2026', color: '#4af0b8', tag: 'Earnings', event: 'Record Q1 2026 revenue $9.5M — FY guidance raised to ≥$40M' },
  { date: 'Apr 14, 2026', color: '#6bb5ff', tag: 'Analysts', event: 'Citi initiates Buy/$20PT · BTIG initiates Buy/$22PT' },
  { date: 'Apr 17, 2026', color: '#ffaa66', tag: 'Stock', event: 'All-time high $21.28 — NVIDIA Ising model launch' },
  { date: 'Feb 13, 2026', color: '#4af0b8', tag: 'Corporate', event: 'NYSE listing as $INFQ — $551.4M SPAC proceeds' },
]

const PARTNERS = ['U.S. Dept. of Defense', 'DARPA', 'NASA', 'NVIDIA (NVQLink)', 'SAIC', 'Lockheed Martin', 'UK NQCC', 'Safran', 'Voyager Technologies']

const TECH = [
  { name: 'Sqale Quantum Computer', desc: '1,600 physical qubits · 99.73% CZ-gate fidelity · Target: 30 logical qubits in 2026', color: '#4af0b8' },
  { name: 'Tiqker Optical Atomic Clock', desc: 'GPS-denied precision timing · Royal Navy sea trials · Deployed by multiple DoD agencies', color: '#6bb5ff' },
  { name: 'Quantum RF Sensors', desc: '"Quantum Spectrum" category · First fundamental RF architecture shift in decades', color: '#cc99ff' },
  { name: 'Superstaq + CML Software', desc: 'Quantum-classical hybrid control · NVQLink integration with NVIDIA', color: '#ffaa66' },
]

export default function OverviewPage() {
  return (
    <Layout title="Overview">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <span className="ticker-badge">$INFQ</span>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Infleqtion Overview</h1>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>Neutral-atom quantum · Founded 2007 · Louisville, CO</span>
      </div>

      <AiPanel
        placeholder='Ask: "What does Infleqtion do?" or "What is the CHIPS Act deal?" or "Latest news?"'
        systemContext="You are a financial analyst covering Infleqtion (NYSE: INFQ), a neutral-atom quantum computing and sensing company. Answer questions accurately, citing sources."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 20 }}>
        {KPIS.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-value ${k.color}`}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="section-hd">About Infleqtion</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            Infleqtion (formerly ColdQuanta) is a full-stack quantum technology company built on a single neutral-atom platform spanning <strong style={{ color: 'var(--text-primary)' }}>quantum computing</strong>, <strong style={{ color: 'var(--text-primary)' }}>quantum sensing</strong>, and <strong style={{ color: 'var(--text-primary)' }}>quantum software</strong>. The company went public on the NYSE on February 13, 2026 via SPAC merger with Churchill Capital Corp X, raising $551.4M in gross proceeds.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Core products include the <strong style={{ color: 'var(--text-primary)' }}>Sqale</strong> neutral-atom quantum computer, <strong style={{ color: 'var(--text-primary)' }}>Tiqker</strong> optical atomic clock, quantum RF receivers, and the <strong style={{ color: 'var(--text-primary)' }}>Superstaq</strong> software platform.
          </p>
          <div className="section-hd" style={{ marginTop: 14 }}>Key Partners & Customers</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PARTNERS.map((p) => (
              <span key={p} style={{ fontSize: 11, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '2px 9px' }}>{p}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-hd">Recent Milestones</div>
          {MILESTONES.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < MILESTONES.length - 1 ? '1px solid rgba(48,54,61,0.5)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0, marginTop: 5 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, background: 'var(--bg-secondary)', color: m.color, border: `1px solid ${m.color}33`, borderRadius: 8, padding: '1px 7px', fontWeight: 600 }}>{m.tag}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.date}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>{m.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-hd">Technology Platform — Neutral Atom Core</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {TECH.map((t) => (
            <div key={t.name} style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: '10px 12px', borderLeft: `3px solid ${t.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 5 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14 }}>
        Sources: Infleqtion SEC filings, BusinessWire, CNBC, SEC EDGAR. Not investment advice. Data as of May 2026.
      </p>
    </Layout>
  )
}
