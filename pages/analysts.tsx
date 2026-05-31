import { useState } from 'react'
import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'

export default function AnalystsPage() {
  const [tab, setTab] = useState('coverage')

  return (
    <Layout title="Analysts">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span className="ticker-badge">$INFQ</span>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Analyst Coverage & Research</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 16 }}>
        {[
          { l: 'Consensus Rating', v: 'Strong Buy', c: 'kpi-green', s: '2 of 2 analysts' },
          { l: 'Avg Price Target', v: '$21.00', c: 'kpi-green', s: '12-month' },
          { l: 'High Target', v: '$22.00', c: 'kpi-green', s: 'BTIG · Sobelson' },
          { l: 'Low Target', v: '$20.00', c: 'kpi-green', s: 'Citi · Malik' },
          { l: 'Implied Upside', v: '+30.8%', c: 'kpi-green', s: 'vs. ~$16 current' },
          { l: 'Fwd P/S (2026E)', v: '~89×', c: 'kpi-green', s: '$3.54B ÷ $40M' },
        ].map((k) => (
          <div className="kpi-card" key={k.l}>
            <div className="kpi-label">{k.l}</div>
            <div className={`kpi-value ${k.c}`}>{k.v}</div>
            <div className="kpi-sub">{k.s}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
          <span>Buy / Strong Buy</span><span>Hold</span><span>Sell</span>
        </div>
        <div style={{ height: 10, background: 'var(--bg-primary)', borderRadius: 5, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '100%', height: '100%', background: '#16a34a', borderRadius: 5 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>
          <span style={{ color: '#16a34a', fontWeight: 500 }}>100% Buy (2/2)</span><span>0%</span><span>0%</span>
        </div>
      </div>

      <AiPanel
        placeholder='Ask: "What is Citi\'s thesis on INFQ?" or "How do quantum P/S multiples compare to AI stocks?"'
        systemContext="You are a senior equity research analyst. Use forward revenue guidance when calculating P/S multiples. Answer questions about Infleqtion analyst coverage and quantum sector valuation."
      />

      <div className="tab-bar">
        {[['coverage', 'INFQ Coverage'], ['sector', 'Sector Views'], ['peers', 'Peer Comparison']].map(([id, label]) => (
          <button key={id} className={`tab-btn ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'coverage' && (
        <div>
          {[
            {
              firm: 'BTIG', fc: '#1a3a5c', ft: '#6bb5ff', analyst: 'Jesse Sobelson, CFA',
              date: 'April 10, 2026', action: 'Initiating Coverage', rating: 'BUY', pt: '$22.00', upside: '~85% upside at initiation',
              thesis: 'Infleqtion is one of the few public quantum computing companies generating revenue today from its neutral-atom platform. BTIG cited a competitive cost advantage and a platform addressing both $130B quantum computing and $30B quantum sensing markets. Forward P/S of ~89× vs. Rigetti at ~860× represents meaningful relative value.',
              tags: ['Revenue-generating', 'Cost advantage', 'Neutral atom', '$160B TAM', 'Fwd P/S ~89×'],
              url: 'https://www.investing.com/news/analyst-ratings/btig-initiates-infleqtion-stock-with-buy-on-quantum-platform-revenue-93CH-4607271',
            },
            {
              firm: 'Citi', fc: '#1a2a5c', ft: '#aac0ff', analyst: 'Atif Malik',
              date: 'April 14, 2026', action: 'Initiating Coverage', rating: 'BUY', pt: '$20.00', upside: '~59% upside at initiation',
              thesis: 'Infleqtion has already deployed quantum technology commercially and is generating revenue — rare among peers. Market opportunity exceeds $160B by 2040. The Nvidia partnership is "key validation" for current AI workloads. At ~89× forward P/S, INFQ trades at a discount to D-Wave (~421×) and Rigetti (~860×) while offering dual revenue streams neither competitor provides.',
              tags: ['Nvidia partnership', '$160B market by 2040', 'Commercial deployment', 'Fwd P/S ~89×'],
              url: 'https://www.cnbc.com/2026/04/14/wall-street-has-a-new-quantum-computing-play-analysts-see-as-much-as-75percent-gain.html',
            },
            {
              firm: 'Citron', fc: '#2a1a0e', ft: '#ffaa66', analyst: 'Andrew Left (rare bull call)',
              date: 'April 2026', action: 'Bullish Call', rating: 'BULLISH', pt: 'N/A', upside: '"Most mispriced quantum stock"',
              thesis: 'Citron published a rare bullish call describing INFQ as the "most mispriced stock in quantum." At ~89× forward P/S — below D-Wave (~421×) and Rigetti (~860×) — INFQ is undervalued. Cited $5B market cap (~$19.61/share) as justified, $10B (~$39.22/share) plausible on quantum adoption acceleration.',
              tags: ['Mispriced vs peers', 'Nvidia catalyst', 'Forward P/S discount'],
              url: null,
            },
          ].map((a) => (
            <div className={`analyst-card ${a.rating === 'BUY' ? 'featured' : ''}`} key={a.firm}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: a.fc, color: a.ft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{a.firm}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{a.firm} <span style={{ fontSize: 9, background: 'rgba(74,240,184,0.15)', color: 'var(--quantum-green)', borderRadius: 4, padding: '1px 5px', marginLeft: 4 }}>{a.action}</span></div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{a.analyst}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.date}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className={a.rating === 'BUY' ? 'pill-buy' : 'pill-hold'}>{a.rating}</span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Price Target</div>
                  <div style={{ fontSize: 18, fontWeight: 500, fontFamily: 'monospace', color: 'var(--quantum-green)' }}>{a.pt}</div>
                  <div style={{ fontSize: 11, color: '#16a34a' }}>▲ {a.upside}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, borderTop: '1px solid var(--border-color)', paddingTop: 10 }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Thesis:</strong> {a.thesis}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {a.tags.map((t) => <span key={t} style={{ fontSize: 10, background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '2px 8px' }}>{t}</span>)}
              </div>
              {a.url && <a href={a.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--quantum-green)', textDecoration: 'none', marginTop: 7, display: 'inline-block' }}>Read coverage ↗</a>}
            </div>
          ))}
        </div>
      )}

      {tab === 'sector' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Quantum Computing TAM — 2040 Outlook', src: 'Citi · BTIG · 2026', body: 'Wall Street analysts at Citi and BTIG converged on a $160B+ total addressable market by 2040: ~$130B in quantum computing and ~$30B in quantum sensing. BCG estimates up to $850B in global economic value. Infleqtion is uniquely positioned to address both verticals from a single neutral-atom platform.', stats: [['QC TAM', '$130B'], ['Sensing TAM', '$30B'], ['BCG total TAM', '$850B'], ['US gov 2026', '$2B']] },
            { title: 'Forward P/S — Corrected to May 2026 Live Data', src: 'Live market data · May 29–30, 2026', body: 'On a forward revenue basis, INFQ at ~89× ($3.54B ÷ $40M 2026E guidance) is the cheapest revenue-generating quantum stock. IonQ at ~100× is slightly more expensive despite $260M revenue. D-Wave at ~421× and Rigetti at ~860× trade at substantial premiums. Bull case: INFQ at the largest discount to peers despite the broadest capabilities and deepest Nvidia integration.', stats: [['INFQ fwd P/S', '~89×'], ['IONQ fwd P/S', '~100×'], ['QBTS fwd P/S', '~421×'], ['RGTI fwd P/S', '~860×']] },
            { title: 'U.S. Government $2B Quantum Investment', src: 'CNBC · CHIPS Act · May 2026', body: 'The U.S. DOC CHIPS R&D Office announced $2B across 9 quantum companies with minority equity stakes. Infleqtion received a $100M LOI plus a $100M stock purchase commitment at a 15% discount. All quantum stocks surged on the announcement.', stats: [['Total deployment', '$2B'], ['Companies selected', '9'], ['INFQ LOI', '$100M'], ['Gov equity stake', '$100M']] },
          ].map((s) => (
            <div className="card" key={s.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.src}</div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 10 }}>{s.body}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>
                {s.stats.map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{l}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, fontFamily: 'monospace' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'peers' && (
        <div className="card" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(74,240,184,0.07)', border: '1px solid rgba(74,240,184,0.25)', borderRadius: 6, padding: '3px 9px', fontSize: 10, color: 'var(--quantum-green)', marginBottom: 10 }}>
            ★ All P/S multiples use forward 2026E revenue · Market caps as of May 29–30, 2026
          </div>
          <table className="fin-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Company</th>
                <th>Ticker</th>
                <th>Rating</th>
                <th>Avg PT</th>
                <th>Fwd Rev 2026E</th>
                <th>Fwd P/S</th>
                <th>Market Cap</th>
                <th>Cash</th>
              </tr>
            </thead>
            <tbody>
              {[
                { co: 'Infleqtion ★', t: 'INFQ', r: 'Strong Buy', pt: '$21.00', rev: '$40M', ps: '~89×', mc: '$3.54B', cash: '$569M', hi: true },
                { co: 'IonQ', t: 'IONQ', r: 'Buy', pt: '—', rev: '$260M', ps: '~100×', mc: '~$26.1B', cash: '$3.1B', hi: false },
                { co: 'D-Wave', t: 'QBTS', r: 'Mixed', pt: '—', rev: '~$28M est.', ps: '~421×', mc: '~$11.8B', cash: '$884M', hi: false },
                { co: 'Rigetti', t: 'RGTI', r: 'Hold/Buy', pt: '—', rev: '~$10M est.', ps: '~860×', mc: '~$8.6B', cash: '$589.8M', hi: false },
                { co: 'IBM Quantum', t: 'IBM', r: 'Buy', pt: '—', rev: 'Div. unit', ps: 'N/A', mc: '~$250B', cash: '—', hi: false },
              ].map((p) => (
                <tr key={p.t} style={p.hi ? { background: 'rgba(74,240,184,0.04)' } : {}}>
                  <td style={{ fontWeight: p.hi ? 600 : 400, color: p.hi ? 'var(--quantum-green)' : 'var(--text-primary)' }}>{p.co}</td>
                  <td style={{ color: p.hi ? 'var(--quantum-green)' : undefined }}>{p.t}</td>
                  <td style={{ color: p.r.includes('Buy') ? '#16a34a' : '#d4c300', fontFamily: 'inherit' }}>{p.r}</td>
                  <td>{p.pt}</td>
                  <td style={{ color: p.hi ? 'var(--quantum-green)' : undefined }}>{p.rev}</td>
                  <td style={{ color: p.ps.includes('860') ? 'var(--red)' : p.ps.includes('421') ? 'var(--amber)' : p.hi ? 'var(--quantum-green)' : '#6bb5ff', fontWeight: 600 }}>{p.ps}</td>
                  <td>{p.mc}</td>
                  <td>{p.cash}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>Not investment advice. Forward P/S = market cap ÷ 2026E revenue guidance.</p>
        </div>
      )}
    </Layout>
  )
}
