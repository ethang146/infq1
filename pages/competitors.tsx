import { useState } from 'react'
import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'
import { askClaude } from '../lib/claude'

const CO_COLORS: Record<string, string> = { ionq: '#6bb5ff', rgti: '#ffaa66', qbts: '#cc99ff', qubt: '#6fcf6f', xndu: '#f87171' }
const CO_BGS: Record<string, string> = { ionq: '#1a3a5c', rgti: '#2a1a0e', qbts: '#1a0e2e', qubt: '#0e2a0e', xndu: '#2e0e0e' }

const NEWS = [
  { co: 'ionq', date: 'May 30, 2026', hl: 'IonQ vs. D-Wave: Best Quantum Buy 2026?', sum: 'Motley Fool compares the sector leaders on revenue, technology, and valuation after the $2B U.S. quantum commitment.', src: 'Motley Fool' },
  { co: 'ionq', date: 'May 28, 2026', hl: '$931M Insider Sale Warning Across IONQ, RGTI, QBTS', sum: 'Insiders at the three pure-play quantum companies collectively sold $931M raising valuation sustainability concerns.', src: 'Motley Fool' },
  { co: 'ionq', date: 'May 6, 2026', hl: 'IonQ Q1 2026: $64.7M Revenue +755% YoY', sum: 'Record quarter. First public quantum company to exceed $100M GAAP annual revenue. FY guide raised to $260–270M.', src: 'SEC 8-K' },
  { co: 'rgti', date: 'May 28, 2026', hl: 'Rigetti +72% in 7 Sessions Despite Revenue Decline', sum: 'Surged on government quantum news. Revenue fell 34% in 2025; forward P/S ~860× is highest in the sector.', src: 'Motley Fool' },
  { co: 'rgti', date: 'Mar 2026', hl: 'Rigetti FY2025: Revenue $7.1M (-34%), Net Loss $216M', sum: 'Revenue declined on delayed system deliveries. 336-qubit Lyra chiplet system is the key 2026 catalyst.', src: 'SEC 8-K' },
  { co: 'qbts', date: 'May 29, 2026', hl: 'D-Wave at $30.14 — Market Cap Now ~$11.8B', sum: 'D-Wave surged from ~$9 earlier in 2026 to ~$30, tripling its market cap on government funding and commercial traction.', src: 'Google Finance' },
  { co: 'qbts', date: 'Feb 2026', hl: 'D-Wave FY2025: Revenue $24.6M (+179%), Cash $884M', sum: 'Best year in company history. 179% revenue growth, record $884M liquidity, Q4 bookings +471%.', src: 'D-Wave IR' },
  { co: 'qubt', date: 'May 29, 2026', hl: 'QCI (QUBT) at $11.88 — Market Cap ~$2.2B', sum: 'QCI has nearly doubled from its lows as quantum sector momentum drives the pre-revenue name higher.', src: 'Google Finance' },
  { co: 'xndu', date: 'May 27, 2026', hl: 'Xanadu +17% on S-8 Filing, Bucking Quantum Pullback', sum: 'Rose 17% while peers fell, triggered by an S-8 registration filing. Pre-revenue but gaining investor interest.', src: 'TipRanks' },
]

const COMPANIES: Record<string, any> = {
  ionq: {
    name: 'IonQ, Inc.', sub: 'NYSE: IONQ · Trapped-Ion · College Park, MD', tech: 'Trapped Ion',
    price: '~$70', mcap: '~$26.1B', chg: '▲ +16% YTD', up: true,
    fwdPs: '~100×', calc: '$26.1B ÷ $260M (2026E) = ~100×',
    kpis: [['Market Cap','~$26.1B'],['FY2025 Revenue','$130M'],['Q1 2026 Revenue','$64.7M'],['FY2026 Guide','$260–270M'],['Cash','$3.1B'],['Fwd P/S','~100×']],
    vs: [['Market Cap','$3.54B','$26.1B','⚡ IonQ 7.4× larger'],['Fwd P/S','~89×','~100×','✅ INFQ slightly cheaper'],['Fwd Revenue','$40M','$260M','⚡ IonQ 6.5× larger'],['Cash','$569M','$3.1B','⚡ IonQ larger'],['Rev Streams','Compute+Sense','Compute only','✅ INFQ diversified'],['NVIDIA','Deep NVQLink','Limited','✅ INFQ deeper']],
    note: 'Sources: Morningstar (IONQ ~$70 May 29), SEC 8-K Q1 2026.',
  },
  rgti: {
    name: 'Rigetti Computing', sub: 'NASDAQ: RGTI · Superconducting · Berkeley, CA', tech: 'Superconducting',
    price: '~$25.54', mcap: '~$8.6B', chg: '▼ -10% YTD', up: false,
    fwdPs: '~860×', calc: '$8.6B ÷ ~$10M (2026E est.) = ~860×',
    kpis: [['Market Cap','~$8.6B'],['FY2025 Revenue','$7.1M'],['Rev Growth','-34% in 2025'],['2026E Revenue','~$10M est.'],['Cash','$589.8M'],['Fwd P/S','~860×']],
    vs: [['Market Cap','$3.54B','$8.6B','⚡ RGTI larger'],['Fwd P/S','~89×','~860×','✅ INFQ 9.7× cheaper'],['Fwd Revenue','$40M','~$10M','✅ INFQ 4× larger'],['Rev Growth','23% (2026E)','-34% (2025)','✅ INFQ growing'],['Cash','$569M','$589.8M','≈ Comparable'],['Rev Streams','Compute+Sense','Compute only','✅ INFQ diversified']],
    note: 'Sources: Google Finance (RGTI $25.54 May 29), SEC 8-K FY2025.',
  },
  qbts: {
    name: 'D-Wave Quantum Inc.', sub: 'NYSE: QBTS · Annealing + Gate-Model · Palo Alto, CA', tech: 'Quantum Annealing',
    price: '~$30.14', mcap: '~$11.8B', chg: '▲ +2.2% May 29', up: true,
    fwdPs: '~421×', calc: '$11.8B ÷ ~$28M (2026E est.) = ~421×',
    kpis: [['Market Cap','~$11.8B'],['FY2025 Revenue','$24.6M'],['Rev Growth','+179% in 2025'],['Gross Margin','~83%'],['Cash','$884M'],['Fwd P/S','~421×']],
    vs: [['Market Cap','$3.54B','$11.8B','⚡ QBTS 3.3× larger'],['Fwd P/S','~89×','~421×','✅ INFQ 4.7× cheaper'],['Fwd Revenue','$40M','~$28M','✅ INFQ larger'],['Gross Margin','36.4%','~83%','⚡ D-Wave higher'],['Cash','$569M','$884M','⚡ D-Wave more'],['Tech','Neutral Atom','Annealing/Gate','≈ Different TAMs']],
    note: 'Sources: Google Finance (QBTS $30.14 May 29). Market cap updated to ~$11.8B reflecting ~$30 stock price.',
  },
  qubt: {
    name: 'Quantum Computing Inc.', sub: 'NASDAQ: QUBT · Photonic / Software · Leesburg, VA', tech: 'Photonic / Software',
    price: '~$11.88', mcap: '~$2.2B', chg: '▼ -2.9% May 29', up: false,
    fwdPs: 'N/M', calc: 'N/A — pre-revenue; P/S not meaningful',
    kpis: [['Market Cap','~$2.2B'],['Revenue Stage','Pre-revenue'],['Fwd P/S','N/M'],['Focus','NASA/Gov'],['Tech','Photonic'],['Cash Burn','Ongoing']],
    vs: [['Market Cap','$3.54B','~$2.2B','✅ INFQ larger'],['Fwd P/S','~89×','N/M','✅ INFQ revenue-generating'],['Fwd Revenue','$40M','~$0','✅ INFQ clear lead'],['Gov Contracts','DoD/NASA/DARPA','NASA only','✅ INFQ broader'],['Stage','Deployed','Development','✅ INFQ ahead']],
    note: 'Sources: Google Finance (QUBT $11.88 May 29). Pre-revenue / minimal revenue.',
  },
  xndu: {
    name: 'Xanadu Quantum Technologies', sub: 'NYSE: XNDU · Photonic Gate-Model · Toronto, Canada', tech: 'Photonic Gate-Model',
    price: '~$7', mcap: '~$1B est.', chg: '▲ +17% (S-8 filing)', up: true,
    fwdPs: 'N/M', calc: 'N/A — pre-revenue; P/S not meaningful',
    kpis: [['Market Cap','~$1B est.'],['Revenue Stage','Pre-revenue'],['Fwd P/S','N/M'],['Software','PennyLane'],['Listed','NYSE 2026'],['Cash Burn','R&D stage']],
    vs: [['Market Cap','$3.54B','~$1B','✅ INFQ 3.5× larger'],['Fwd P/S','~89×','N/M','✅ INFQ revenue-generating'],['Fwd Revenue','$40M','~$0','✅ INFQ clear lead'],['Stage','Deployed','Pre-commercial','✅ INFQ ahead'],['Software','Superstaq+CML','PennyLane','≈ Both strong']],
    note: 'Xanadu pre-revenue. +17% on S-8 filing May 27, 2026.',
  },
}

export default function CompetitorsPage() {
  const [activeCo, setActiveCo] = useState('ionq')
  const [newsFilter, setNewsFilter] = useState('all')
  const [refreshResult, setRefreshResult] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const co = COMPANIES[activeCo]
  const filteredNews = newsFilter === 'all' ? NEWS : NEWS.filter((n) => n.co === newsFilter)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const result = await askClaude('Get the current stock price and market cap for: IonQ (IONQ), Rigetti (RGTI), D-Wave (QBTS), Quantum Computing Inc (QUBT), Xanadu (XNDU), and Infleqtion (INFQ). Also list any news from the past 7 days for each. Use forward 2026E revenue for P/S calculations.')
      setRefreshResult(result)
    } catch (e) { console.error(e) }
    setRefreshing(false)
  }

  return (
    <Layout title="Competitors">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <span className="ticker-badge">$INFQ</span>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Quantum Competitor Intelligence</h1>
        <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? <span className="spinner" /> : '↻'}
          {refreshing ? ' Refreshing...' : ' AI Refresh'}
        </button>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,240,184,0.07)', border: '1px solid rgba(74,240,184,0.2)', borderRadius: 7, padding: '6px 12px', marginBottom: 14, fontSize: 11, color: 'var(--quantum-green)' }}>
        🕐 Prices & market caps as of May 29–30, 2026 · All P/S use forward 2026E revenue
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Forward P/S Multiples — Live Market Cap ÷ 2026E Revenue Guidance</div>
        {[['INFQ ★','#4af0b8','~89×','$3.54B ÷ $40M',89],['IONQ','#6bb5ff','~100×','$26.1B ÷ $260M',100],['QBTS','#cc99ff','~421×','$11.8B ÷ ~$28M',421],['RGTI','#ffaa66','~860×','$8.6B ÷ ~$10M',860]].map(([co, col, ps, calc, val]) => (
          <div key={co as string} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: col as string, minWidth: 70 }}>{co}</span>
            <div style={{ flex: 1, background: 'var(--bg-secondary)', borderRadius: 3, height: 20, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, ((val as number) / 860) * 100)}%`, height: '100%', background: CO_BGS[co as string] || 'var(--bg-card)', borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 10, fontWeight: 600, color: col as string, whiteSpace: 'nowrap', overflow: 'hidden', minWidth: 40 }}>{ps}</div>
            </div>
            <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 600, color: col as string, minWidth: 44 }}>{ps}</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', minWidth: 140, textAlign: 'right' }}>{calc}</span>
          </div>
        ))}
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>★ INFQ (~89×) is the cheapest revenue-generating quantum stock — discount to IonQ (~100×), D-Wave (~421×), and Rigetti (~860×).</div>
      </div>

      <AiPanel
        placeholder='Ask: "What is IonQ\'s current market cap?" or "How does INFQ compare to D-Wave on revenue?"'
        systemContext="You are a quantum computing industry analyst. Use forward 2026E revenue for P/S calculations. Provide current market data and financial comparisons for INFQ, IONQ, RGTI, QBTS, QUBT, XNDU."
      />

      {refreshResult && (
        <div className="ai-box" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: 'var(--quantum-green)', fontWeight: 500, marginBottom: 5 }}>↻ AI Market Cap & News Refresh</div>
          <div style={{ color: 'var(--text-primary)' }}>{refreshResult}</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {Object.keys(COMPANIES).map((id) => (
              <button key={id} className={`filter-btn ${activeCo === id ? 'active' : ''}`} onClick={() => setActiveCo(id)}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: CO_COLORS[id] }} />
                {id.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 13 }}>
            <div style={{ width: 40, height: 40, borderRadius: 9, background: CO_BGS[activeCo], color: CO_COLORS[activeCo], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{activeCo.toUpperCase()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{co.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{co.sub}</div>
              <span style={{ fontSize: 10, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '2px 8px', marginTop: 4, display: 'inline-block' }}>{co.tech}</span>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 500, fontFamily: 'monospace' }}>{co.price}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>Mkt Cap: {co.mcap}</div>
              <div style={{ fontSize: 11, padding: '2px 7px', borderRadius: 5, marginTop: 3, display: 'inline-block', background: co.up ? '#0e2a0e' : '#2e0e0e', color: co.up ? 'var(--quantum-green)' : 'var(--red)' }}>{co.chg}</div>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(74,240,184,0.08)', border: '1px solid rgba(74,240,184,0.3)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: 'var(--quantum-green)', marginBottom: 8 }}>
            🧮 Fwd P/S: {co.calc}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 7, marginBottom: 10 }}>
            {co.kpis.map(([l, v]: [string, string]) => (
              <div className="kpi-card" key={l}><div className="kpi-label">{l}</div><div className="kpi-value">{v}</div></div>
            ))}
          </div>

          <div className="section-hd">vs. INFQ — Direct Comparison</div>
          <div className="vs-strip">
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--quantum-green)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>INFQ vs. {activeCo.toUpperCase()}</div>
            {co.vs.map(([metric, infqVal, peerVal, winner]: [string,string,string,string]) => (
              <div key={metric} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, fontSize: 12, flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 90, flexShrink: 0, fontSize: 11 }}>{metric}</span>
                <span style={{ background: 'var(--quantum-dark)', color: 'var(--quantum-green)', borderRadius: 4, padding: '1px 7px', fontFamily: 'monospace', fontSize: 11, fontWeight: 600, border: '1px solid rgba(74,240,184,0.3)' }}>{infqVal}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>vs</span>
                <span style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 4, padding: '1px 7px', fontFamily: 'monospace', fontSize: 11 }}>{peerVal}</span>
                <span style={{ fontSize: 10 }}>{winner}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{co.note}</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '10px 13px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="live-dot" />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Quantum Sector News</span>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: '8px 10px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <button className={`filter-btn ${newsFilter === 'all' ? 'active' : ''}`} style={{ fontSize: 10, padding: '3px 9px' }} onClick={() => setNewsFilter('all')}>All</button>
            {Object.keys(CO_COLORS).map((id) => (
              <button key={id} className={`filter-btn ${newsFilter === id ? 'active' : ''}`} style={{ fontSize: 10, padding: '3px 9px', color: newsFilter === id ? CO_COLORS[id] : undefined, borderColor: newsFilter === id ? CO_COLORS[id] : undefined, background: newsFilter === id ? CO_BGS[id] : undefined }} onClick={() => setNewsFilter(id)}>
                {id.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ maxHeight: 600, overflowY: 'auto' }}>
            {filteredNews.map((n, i) => (
              <div key={i} className="news-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 8, fontWeight: 600, background: CO_BGS[n.co] + '40', color: CO_COLORS[n.co], border: `1px solid ${CO_COLORS[n.co]}44` }}>{n.co.toUpperCase()}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{n.date}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 3 }}>{n.hl}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.sum}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>📰 {n.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
