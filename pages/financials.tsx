import { useState } from 'react'
import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'

export default function FinancialsPage() {
  const [tab, setTab] = useState('income')

  return (
    <Layout title="Financials">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span className="ticker-badge">$INFQ</span>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Financial Statements</h1>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>Source: SEC 10-Q, 8-K/A · USD thousands</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 16 }}>
        {[
          { l: 'FY2025 Revenue', v: '$32.5M', s: '+12.6% YoY', g: true },
          { l: 'FY2025 Net Loss', v: '$(31.8M)', s: '41% improvement', g: false },
          { l: 'Q1 2026 Revenue', v: '$9.5M', s: '+13.9% YoY', g: true },
          { l: 'Cash & Securities', v: '$568.7M', s: 'Post-SPAC', g: true },
          { l: 'Total Assets', v: '$115.3M', s: 'Q1 2026', g: false },
          { l: '2026 Guidance', v: '≥$40M', s: '+23% growth', g: true },
        ].map((k) => (
          <div className="kpi-card" key={k.l}>
            <div className="kpi-label">{k.l}</div>
            <div className={`kpi-value ${k.g ? 'kpi-green' : ''}`}>{k.v}</div>
            <div className="kpi-sub">{k.s}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-card)', borderLeft: '3px solid var(--quantum-green)', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>2026 Revenue Guidance (raised April 2026)</div>
        <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'monospace', color: 'var(--quantum-green)' }}>≥ $40 Million</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>SPAC/PIPE raised $551.4M · IPO closed Feb 13, 2026 · 216.5M shares · Debt-free</div>
      </div>

      <AiPanel
        placeholder='Ask: "What was INFQ Q1 2026 gross margin?" or "Compare cash position pre and post SPAC"'
        systemContext="You are a financial analyst with access to Infleqtion (INFQ) SEC filings. Answer financial statement questions accurately."
      />

      <div className="tab-bar">
        {['income', 'balance', 'cashflow'].map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'income' ? 'Income Statement' : t === 'balance' ? 'Balance Sheet' : 'Cash Flow'}
          </button>
        ))}
      </div>

      {tab === 'income' && (
        <div className="card">
          <table className="fin-table">
            <thead>
              <tr><th style={{ textAlign: 'left' }}>Line Item</th><th>Q1 2026</th><th>Q1 2025</th><th>FY 2025</th><th>FY 2024</th></tr>
            </thead>
            <tbody>
              <tr className="section-row"><td colSpan={5}>Revenue</td></tr>
              <tr className="total"><td>Total Revenue</td><td>9,461</td><td>8,303</td><td>32,464</td><td>28,836</td></tr>
              <tr className="total"><td>Total Cost of Revenue</td><td>7,470</td><td>4,926</td><td>20,651</td><td>19,772</td></tr>
              <tr className="total"><td>Gross Profit</td><td>1,991</td><td>3,377</td><td>11,813</td><td>9,064</td></tr>
              <tr><td className="indent" style={{ color: 'var(--text-muted)', fontSize: 11 }}>Gross Margin</td><td style={{ color: 'var(--text-muted)', fontSize: 11 }}>21.0%</td><td style={{ color: 'var(--text-muted)', fontSize: 11 }}>40.7%</td><td style={{ color: 'var(--text-muted)', fontSize: 11 }}>36.4%</td><td style={{ color: 'var(--text-muted)', fontSize: 11 }}>31.4%</td></tr>
              <tr className="section-row"><td colSpan={5}>Operating Expenses</td></tr>
              <tr><td className="indent">Research &amp; development</td><td>9,951</td><td>5,167</td><td>24,089</td><td>22,303</td></tr>
              <tr><td className="indent">Selling, general &amp; administrative</td><td>26,320</td><td>5,784</td><td>25,343</td><td>27,287</td></tr>
              <tr><td className="indent">Grant income (offset)</td><td className="text-green">(705)</td><td className="text-green">(624)</td><td className="text-green">(2,333)</td><td className="text-green">(1,057)</td></tr>
              <tr className="total"><td>Loss from Operations</td><td className="text-red">(33,575)</td><td className="text-red">(6,950)</td><td className="text-red">(35,286)</td><td className="text-red">(53,008)</td></tr>
              <tr><td className="indent">Interest income</td><td className="text-green">3,202</td><td className="text-green">356</td><td>—</td><td>—</td></tr>
              <tr className="total"><td>Net Loss</td><td className="text-red">(30,263)</td><td className="text-red">(5,985)</td><td className="text-red">(31,800)</td><td className="text-red">(53,800)</td></tr>
              <tr className="section-row"><td colSpan={5}>Non-GAAP (FY only)</td></tr>
              <tr><td className="indent">Non-GAAP net loss</td><td>—</td><td>—</td><td className="text-red">(24,600)</td><td>—</td></tr>
              <tr><td className="indent">Stock-based compensation</td><td>—</td><td>—</td><td>3,100</td><td>3,700</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>Source: SEC 10-Q (Q1 2026), 8-K/A (FY2025 audited).</p>
        </div>
      )}

      {tab === 'balance' && (
        <div className="card">
          <table className="fin-table">
            <thead><tr><th style={{ textAlign: 'left' }}>Line Item</th><th>Q1 2026 (Mar 31)</th><th>FY 2025 (Dec 31)</th></tr></thead>
            <tbody>
              <tr className="section-row"><td colSpan={3}>Assets</td></tr>
              <tr><td className="indent">Cash, securities &amp; restricted (post-SPAC)</td><td className="text-green">568,700</td><td>11,900</td></tr>
              <tr><td className="indent">Total short-term assets</td><td>74,600</td><td>—</td></tr>
              <tr className="total"><td>Total Assets</td><td>115,300</td><td>—</td></tr>
              <tr className="section-row"><td colSpan={3}>Liabilities</td></tr>
              <tr><td className="indent">Short-term liabilities</td><td>22,700</td><td>—</td></tr>
              <tr><td className="indent">Long-term liabilities</td><td>4,100</td><td>—</td></tr>
              <tr className="total"><td>Total Liabilities</td><td>26,700</td><td>—</td></tr>
              <tr><td className="indent">Total debt</td><td className="text-green">0</td><td className="text-green">0</td></tr>
              <tr className="section-row"><td colSpan={3}>Equity</td></tr>
              <tr><td className="indent">Common shares outstanding</td><td colSpan={2} style={{ textAlign: 'right' }}>216,471,927 shares</td></tr>
              <tr className="total"><td>Total Shareholders&apos; Equity</td><td>88,600</td><td>—</td></tr>
              <tr className="section-row"><td colSpan={3}>SPAC Transaction (Feb 13, 2026)</td></tr>
              <tr><td className="indent">Gross proceeds from trust</td><td>424,800</td><td>—</td></tr>
              <tr><td className="indent">PIPE proceeds</td><td>126,500</td><td>—</td></tr>
              <tr className="total"><td>Total gross proceeds</td><td className="text-green">551,400</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {tab === 'cashflow' && (
        <div className="card">
          <table className="fin-table">
            <thead><tr><th style={{ textAlign: 'left' }}>Line Item</th><th>FY 2025</th><th>FY 2024</th></tr></thead>
            <tbody>
              <tr className="section-row"><td colSpan={3}>Operating Activities</td></tr>
              <tr><td className="indent">Net loss</td><td className="text-red">(31,800)</td><td className="text-red">(53,800)</td></tr>
              <tr><td className="indent">Stock-based compensation</td><td>3,100</td><td>3,700</td></tr>
              <tr className="total"><td>Net Cash Used in Operations</td><td className="text-red">(24,100)</td><td>—</td></tr>
              <tr className="section-row"><td colSpan={3}>Financing Activities</td></tr>
              <tr><td className="indent">Series C preferred stock proceeds</td><td className="text-green">100,000</td><td>—</td></tr>
              <tr><td className="indent">SPAC / PIPE proceeds (Feb 2026)</td><td className="text-green">551,400</td><td>—</td></tr>
              <tr className="section-row"><td colSpan={3}>Cash Position</td></tr>
              <tr><td className="indent">Cash end of FY2025 (pre-SPAC)</td><td>11,900</td><td>—</td></tr>
              <tr><td className="indent">Cash &amp; securities post-SPAC (Q1 2026)</td><td colSpan={2} style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--quantum-green)' }}>568,700</td></tr>
              <tr><td className="indent">Implied cash runway</td><td colSpan={2} style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-secondary)' }}>~27 years at current burn rate</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
