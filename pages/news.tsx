import { useState } from 'react'
import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'
import { askClaude } from '../lib/claude'

const COLORS: Record<string, string> = {
  company: '#4af0b8', gov: '#6fcf6f', tech: '#cc99ff',
  market: '#6bb5ff', insider: '#ffaa66', intl: '#66aaff', twitter: '#1d9bf0'
}
const BG: Record<string, string> = {
  company: '#0a1628', gov: '#0e2a0e', tech: '#1a0e2e',
  market: '#1a1a2e', insider: '#2a1a0e', intl: '#0a1628', twitter: '#0a1e2e'
}

const NEWS = [
  { tag: 'intl', tagLabel: 'International', isX: false, source: 'BusinessWire', followers: '500K+', date: 'May 29, 2026', headline: 'Infleqtion Opens Oxford Quantum Innovation Centre', summary: 'New facility at Oxford Technology Park triples R&D, production, and systems integration. Delivered UK\'s first 100-qubit quantum computer to NQCC Harwell.', url: 'https://www.businesswire.com' },
  { tag: 'insider', tagLabel: 'Insider Activity', isX: false, source: 'Investing.com', followers: '10M+', date: 'May 27, 2026', headline: 'Director David Singer Sells $47.6M in INFQ Shares', summary: '3,071,623 shares sold via Maverick fund distributions at $15.29–$15.98 per share.', url: 'https://www.investing.com' },
  { tag: 'gov', tagLabel: 'Government', isX: false, source: 'BusinessWire', followers: '500K+', date: 'May 21, 2026', headline: 'Infleqtion Signs $100M CHIPS Act LOI with U.S. Dept. of Commerce', summary: 'LOI for $100M in CHIPS R&D funding. DOC will also purchase $100M of common stock at 15% discount. Part of $2B U.S. quantum initiative across 9 companies.', url: 'https://www.businesswire.com' },
  { tag: 'tech', tagLabel: 'Technology', isX: false, source: 'BusinessWire', followers: '500K+', date: 'May 20, 2026', headline: 'Infleqtion Hits 1,600 Physical Qubits and 99.73% Gate Fidelity', summary: '1,600 physical qubits, 99.73% CZ-gate entangling fidelity, and world\'s first logical qubit materials science application co-published with NVIDIA.', url: 'https://www.businesswire.com' },
  { tag: 'company', tagLabel: 'Company', isX: false, source: 'Infleqtion IR', followers: 'Official', date: 'May 14, 2026', headline: 'Record Q1 2026 Revenue $9.5M — Full-Year Guidance Raised to ≥$40M', summary: 'Q1 revenue +14% YoY. $569M cash, zero debt. FY2026 guidance raised on accelerating customer demand.', url: 'https://ir.infleqtion.com' },
  { tag: 'tech', tagLabel: 'Technology', isX: false, source: 'BusinessWire', followers: '500K+', date: 'May 13, 2026', headline: 'Infleqtion Unveils "Quantum Spectrum" — New RF Sensing Category', summary: 'First fundamental shift in RF sensing architecture in decades, based on neutral-atom quantum RF receivers.', url: 'https://www.businesswire.com' },
  { tag: 'market', tagLabel: 'Market', isX: false, source: 'CNBC', followers: '10M+', date: 'May 15, 2026', headline: 'CEO Matt Kinsella on Jim Cramer: "Demand Shifting to Real Applications"', summary: 'CEO on Mad Money highlighting precision timing, navigation, and large-scale quantum milestones.', url: 'https://www.cnbc.com' },
  { tag: 'twitter', tagLabel: 'X / Twitter', isX: true, source: '@infleqtion', followers: '12K+ · Official', date: 'May 21, 2026', headline: 'Official: $100M CHIPS LOI signed with @commercegov', summary: 'Infleqtion signed a Letter of Intent with the CHIPS R&D Office for $100M in proposed funding to accelerate U.S. quantum computing technologies.', url: 'https://x.com/infleqtion' },
  { tag: 'twitter', tagLabel: 'X / Twitter', isX: true, source: '@theflynews', followers: '85K+ · Verified', date: 'Apr 25, 2026', headline: 'Infleqtion Secures DARPA Contract to Develop Multistaq', summary: 'Infleqtion secures DARPA contract to develop Multistaq for next-generation heterogeneous quantum systems.', url: 'https://x.com/theflynews' },
  { tag: 'twitter', tagLabel: 'X / Twitter', isX: true, source: '@SpaceInvestor_D', followers: '42K+ · Verified', date: 'May 21, 2026', headline: '$INFQ Signs $100M CHIPS LOI — Breaking', summary: 'Infleqtion signed LOI with U.S. DOC CHIPS R&D Office for $100M in proposed quantum computing funding.', url: 'https://x.com/SpaceInvestor_D' },
  { tag: 'intl', tagLabel: 'International', isX: false, source: 'Infleqtion IR', followers: 'Official', date: 'Feb 13, 2026', headline: 'Infleqtion Lists on NYSE as $INFQ — SPAC Merger Closes', summary: 'Business combination with Churchill Capital Corp X closed raising $551.4M. Pre-money equity: $1.8B. 216.5M shares outstanding.', url: 'https://infleqtion.com' },
]

const FILTERS = ['all', 'company', 'gov', 'tech', 'market', 'insider', 'intl', 'twitter']

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [refreshResult, setRefreshResult] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const filtered = activeFilter === 'all' ? NEWS : NEWS.filter((n) => n.tag === activeFilter)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const result = await askClaude('Search for the most recent Infleqtion (NYSE: INFQ) news from the past 48 hours including press releases, SEC filings, and verified X/Twitter posts from accounts with 10K+ followers. List each with date, source, and a 2-sentence summary.')
      setRefreshResult(result)
    } catch (e) { console.error(e) }
    setRefreshing(false)
  }

  return (
    <Layout title="News">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <span className="ticker-badge">$INFQ</span>
        <div className="live-dot" />
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>News Intelligence Hub</h1>
        <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? <span className="spinner" /> : '↻'}
          {refreshing ? ' Scanning...' : ' AI Refresh (48hr)'}
        </button>
      </div>

      {refreshResult && (
        <div className="ai-box" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--quantum-green)', fontWeight: 500, marginBottom: 6 }}>↻ AI 48-Hour Refresh</div>
          <div style={{ color: 'var(--text-primary)' }}>{refreshResult}</div>
        </div>
      )}

      <AiPanel
        placeholder='Ask: "What did Infleqtion announce this week?" or "What is X saying about $INFQ?"'
        systemContext="You are a financial news analyst covering Infleqtion (NYSE: INFQ). Search for current news and verified social media posts."
      />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 2 }}>Filter:</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'twitter' ? '𝕏 X / Twitter' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        {filtered.map((n, i) => (
          <div key={i} className="news-item" style={{ borderLeft: n.isX ? '2px solid rgba(29,155,240,0.3)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: 50, flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: n.isX ? '50%' : 7, background: BG[n.tag], border: `1px solid ${COLORS[n.tag]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: n.isX ? 14 : 9, fontWeight: 700, color: COLORS[n.tag] }}>
                  {n.isX ? '𝕏' : n.source.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.source}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 8, fontWeight: 600, background: BG[n.tag], color: COLORS[n.tag], border: `1px solid ${COLORS[n.tag]}33` }}>
                    {n.isX ? '𝕏 ' : ''}{n.tagLabel}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{n.date}</span>
                  <span style={{ fontSize: 10, background: 'rgba(74,240,184,0.08)', color: 'var(--quantum-green)', border: '1px solid rgba(74,240,184,0.2)', borderRadius: 4, padding: '1px 6px' }}>✓ {n.followers}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 4 }}>{n.headline}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{n.summary}</div>
                <a href={n.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: n.isX ? '#1d9bf0' : 'var(--quantum-green)', textDecoration: 'none', marginTop: 5, display: 'inline-block' }}>
                  {n.isX ? 'View on X ↗' : 'Read full story ↗'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
