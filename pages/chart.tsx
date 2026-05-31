import { useState } from 'react'
import Layout from '../components/Layout'
import AiPanel from '../components/AiPanel'

export default function ChartPage() {
  const [tab, setTab] = useState('price')

  const EVENTS = [
    { date: 'Feb 13, 2026', color: '#4af0b8', tag: 'Listing', event: 'NYSE listing as $INFQ — $551.4M SPAC proceeds · Opened ~$15.59' },
    { date: 'Mar 30, 2026', color: '#f87171', tag: '52W Low', event: '52-week low: $8.52 — post-IPO SPAC bleed, lock-up anxiety' },
    { date: 'Apr 10–14, 2026', color: '#ffaa66', tag: 'Analysts', event: 'BTIG ($22PT) + Citi ($20PT) dual Buy initiations — stock recovered from $12 to $17+' },
    { date: 'Apr 17, 2026', color: '#cc99ff', tag: 'ATH', event: 'All-time high $21.28 — NVIDIA Ising model launch, INFQ selected for 2 roles' },
    { date: 'May 14, 2026', color: '#6fcf6f', tag: 'Earnings', event: 'Q1 2026 record $9.5M revenue (+14% YoY) — FY guidance raised to ≥$40M' },
    { date: 'May 21, 2026', color: '#4af0b8', tag: 'CHIPS', event: '$100M CHIPS Act LOI + $2B gov quantum program — +40% in 2 days' },
    { date: 'May 27–29, 2026', color: '#f87171', tag: 'Pullback', event: 'Maverick Capital $47.6M distribution sale — pullback from $17.77 to $16.22' },
  ]

  const TECHNICALS = [
    { lbl: 'RSI (14-day)', val: '66.3', sig: 'NEUTRAL', sc: '#d4c300', sb: '#2a2a0e' },
    { lbl: 'MACD (3mo)', val: 'Bullish', sig: 'BUY', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'MA5', val: '$15.80', sig: 'Above', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'MA20', val: '$13.90', sig: 'Strong Buy', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'MA50', val: '$13.20', sig: 'Above', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'MA200', val: '$14.57', sig: 'Buy', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'All 12 MAs', val: '12/12 Buy', sig: 'Strong Buy', sc: '#4af0b8', sb: '#0e2a0e' },
    { lbl: 'Support 1', val: '$14.57', sig: 'Key Level', sc: '#d4c300', sb: '#2a2a0e' },
    { lbl: 'Support 2', val: '$13.59', sig: 'Trend Line', sc: '#d4c300', sb: '#2a2a0e' },
    { lbl: 'Resistance', val: '$19.30', sig: 'Trend Top', sc: '#d4c300', sb: '#2a2a0e' },
    { lbl: 'ATH', val: '$21.28', sig: 'Apr 17 High', sc: '#ffaa66', sb: '#2a1a0e' },
    { lbl: 'Oscillators', val: 'Mixed', sig: 'NEUTRAL', sc: '#d4c300', sb: '#2a2a0e' },
  ]

  const FLOW = [
    { date: 'May 28', type: 'CALL', strike: '$18.00', expiry: 'Jun 20', vol: '8,240', oi: '1,180', ratio: '6.98×', sent: 'BULLISH', ctx: 'CHIPS LOI momentum' },
    { date: 'May 21', type: 'CALL', strike: '$15.00', expiry: 'Jun 6', vol: '12,500', oi: '2,300', ratio: '5.43×', sent: 'BULLISH', ctx: 'CHIPS LOI news day' },
    { date: 'Apr 24', type: 'PUT', strike: '$12.00', expiry: 'May 16', vol: '133,590', oi: '1,000', ratio: '133.59×', sent: 'BEARISH', ctx: 'Highest Vol/OI in market' },
    { date: 'Apr 17', type: 'CALL', strike: '$20.00', expiry: 'May 2', vol: '9,800', oi: '3,200', ratio: '3.06×', sent: 'BULLISH', ctx: 'ATH day — NVDA Ising' },
    { date: 'Apr 14', type: 'CALL', strike: '$17.50', expiry: 'Apr 25', vol: '7,400', oi: '890', ratio: '8.31×', sent: 'BULLISH', ctx: 'Citi initiation day' },
    { date: 'Apr 10', type: 'CALL', strike: '$15.00', expiry: 'Apr 18', vol: '5,600', oi: '1,240', ratio: '4.52×', sent: 'BULLISH', ctx: 'BTIG initiation day' },
    { date: 'Mar 30', type: 'PUT', strike: '$9.00', expiry: 'Apr 18', vol: '4,200', oi: '3,100', ratio: '1.35×', sent: 'BEARISH', ctx: '52-week low day' },
  ]

  const prices = [15.59,15.59,14.5,13.0,12.0,10.5,8.52,9.5,10.4,11.89,12.58,21.28,18.0,16.0,14.5,13.0,13.36,11.6,12.5,15.64,17.0,17.77,16.22]

  return (
    <Layout title="Chart & TA">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <span className="ticker-badge">$INFQ</span>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Stock Chart & Technical Analysis</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 600 }}>$16.22</span>
          <span style={{ background: '#2e0e0e', color: 'var(--red)', padding: '3px 9px', borderRadius: 6, fontSize: 13 }}>▼ -8.72% May 29</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: 16 }}>
        {[['Open','$15.82'],['Day High','$17.76'],['Day Low','$15.50'],['Prev Close','$17.77'],['52W High','$27.50'],['52W Low','$8.52'],['Market Cap','~$3.54B'],['Avg Vol (30d)','12.0M']].map(([l,v]) => (
          <div className="kpi-card" key={l}><div className="kpi-label">{l}</div><div className="kpi-value">{v}</div></div>
        ))}
      </div>

      <AiPanel
        placeholder='Ask: "What are the key support levels?" or "What is the options flow saying about INFQ?"'
        systemContext="You are a senior technical analyst covering Infleqtion (NYSE: INFQ). Provide specific price levels, indicators, and directional analysis with sources."
      />

      <div className="tab-bar">
        {[['price','Price Chart'],['technicals','Technicals'],['volume','Volume'],['options','Options Flow']].map(([id,label]) => (
          <button key={id} className={`tab-btn ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === 'price' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-hd">INFQ Price History (Feb–May 2026)</div>
            <div style={{ position: 'relative', height: 180, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '10px 8px 24px', gap: 2 }}>
              {prices.map((p, i) => {
                const min = 8, max = 22
                const h = Math.max(4, ((p - min) / (max - min)) * 130)
                const prev = prices[i - 1] || p
                const up = p >= prev
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div style={{ width: '80%', height: h, background: up ? '#16a34a' : '#dc2626', borderRadius: '2px 2px 0 0', opacity: 0.85 }} />
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 4, padding: '0 4px' }}>
              <span>Feb 13</span><span>Mar 30 (Low $8.52)</span><span>Apr 17 (ATH $21.28)</span><span>May 14</span><span>May 29</span>
            </div>
          </div>
          <div className="section-hd">Key Price Events</div>
          <div className="card" style={{ padding: 0 }}>
            {EVENTS.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', borderBottom: i < EVENTS.length - 1 ? '1px solid var(--border-color)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: e.color, flexShrink: 0, marginTop: 4 }} />
                <div style={{ minWidth: 80, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, background: 'var(--bg-secondary)', color: e.color, border: `1px solid ${e.color}33`, borderRadius: 6, padding: '1px 6px', fontWeight: 600 }}>{e.tag}</span>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{e.date}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{e.event}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'technicals' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 14 }}>
            {TECHNICALS.map((t) => (
              <div className="card" key={t.lbl} style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{t.lbl}</div>
                <div style={{ fontSize: 16, fontWeight: 500, fontFamily: 'monospace', marginBottom: 4 }}>{t.val}</div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 8, background: t.sb, color: t.sc, border: `1px solid ${t.sc}44` }}>{t.sig}</span>
              </div>
            ))}
          </div>
          {[
            { title: 'Trend Structure — Rising Channel', body: 'INFQ carved a pivot bottom on May 19 around $11.60, launching a +67% rally in under 2 weeks. Current price ~$16 sits in the upper portion of the channel. A breakout above $19.30 trend-line resistance would signal a fresh leg toward the ATH of $21.28.' },
            { title: 'Moving Average Stack — All 12 Bullish', body: 'All 12 tracked moving averages (MA5 through MA200) are on Buy signals — a rare clean sweep. MA5 ($15.80) > MA20 ($13.90) > MA50 ($13.20) — a bullish MA stack confirming the uptrend. Key support at MA200 ($14.57).' },
            { title: 'RSI at 66.3 — Elevated but Not Overbought', body: 'RSI of 66.3 approaches but has not reached the 70 overbought threshold. Prior RSI spike above 70 during the Apr 14–17 Nvidia rally coincided with the $21.28 ATH. Watch for RSI divergence as an early warning signal.' },
          ].map((a) => (
            <div key={a.title} style={{ background: 'var(--bg-card)', borderLeft: '3px solid var(--quantum-green)', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{a.title}</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{a.body}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'volume' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-hd">Notable Volume Days vs. 30-Day Average (12M shares)</div>
            {[
              ['May 28', 37.0, true, '+14.9% CHIPS surge'],
              ['May 21', 34.0, true, '+21.5% CHIPS LOI'],
              ['Apr 17', 32.5, true, 'ATH $21.28 / NVDA'],
              ['Feb 17', 26.0, true, 'First trading day'],
              ['May 29', 25.7, false, '-8.72% Maverick sale'],
              ['Apr 14', 20.4, true, 'Citi initiation'],
              ['30d Avg', 12.0, true, 'Baseline average'],
            ].map(([d, v, up, ctx]) => (
              <div key={d as string} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 56, flexShrink: 0 }}>{d}</span>
                <div style={{ flex: 1, background: 'var(--bg-secondary)', borderRadius: 3, height: 18, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, ((v as number) / 37) * 100)}%`, height: '100%', background: d === '30d Avg' ? '#534ab7' : up ? '#16a34a' : '#dc2626', borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 6, fontSize: 10, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {ctx}
                  </div>
                </div>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)', minWidth: 44, textAlign: 'right' }}>{v}M</span>
              </div>
            ))}
          </div>
          {[
            { title: 'Volume Confirms the Trend', body: 'The largest volume spikes align precisely with the largest price moves. May 20–21 CHIPS Act LOI generated ~34M shares — nearly 3× the 30-day average of 12M — on a +21% price surge. This is characteristic of institutional + retail co-buying.' },
            { title: 'Unusual Options Activity — Vol/OI of 133.59', body: 'In late April 2026, INFQ recorded the highest Vol/OI ratio among all active options names at 133.59. This means traders opened fresh positions at over 133× the existing open interest base — a massive surge in new directional bets signaling institutional awareness of a pending catalyst.' },
          ].map((a) => (
            <div key={a.title} style={{ background: 'var(--bg-card)', borderLeft: '3px solid var(--quantum-green)', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{a.title}</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{a.body}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'options' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: 14 }}>
            {[['Overall Sentiment','Bullish','kpi-green'],['Call/Put Ratio','~2.1×','kpi-green'],['Peak Vol/OI','133.59×','kpi-green'],['Unusual Activity','Yes — Apr 24','kpi-green'],['Dominant Flow','Calls (OTM)','kpi-green']].map(([l,v,c]) => (
              <div className="kpi-card" key={l as string}><div className="kpi-label">{l}</div><div className={`kpi-value ${c}`}>{v}</div></div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="section-hd">Put/Call Ratio</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: 'var(--quantum-green)' }}>Calls ~68%</span>
              <span style={{ color: 'var(--text-muted)' }}>C/P ratio ~2.1×</span>
              <span style={{ color: 'var(--red)' }}>Puts ~32%</span>
            </div>
            <div style={{ height: 14, background: 'var(--bg-secondary)', borderRadius: 7, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #16a34a, #4af0b8)', borderRadius: 7 }} />
            </div>
          </div>
          <div className="section-hd">Notable Options Flow</div>
          <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
            <table className="fin-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Date</th>
                  <th>Type</th><th>Strike</th><th>Expiry</th>
                  <th>Volume</th><th>OI</th><th>Vol/OI</th>
                  <th>Sentiment</th>
                  <th style={{ textAlign: 'left', fontFamily: 'inherit' }}>Context</th>
                </tr>
              </thead>
              <tbody>
                {FLOW.map((f, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'left', fontFamily: 'inherit' }}>{f.date}</td>
                    <td style={{ color: f.type === 'CALL' ? 'var(--quantum-green)' : 'var(--red)', fontWeight: 600 }}>{f.type}</td>
                    <td>{f.strike}</td><td>{f.expiry}</td>
                    <td>{f.vol}</td><td>{f.oi}</td>
                    <td style={{ color: parseFloat(f.ratio) > 50 ? 'var(--amber)' : 'inherit', fontWeight: parseFloat(f.ratio) > 50 ? 600 : 400 }}>{f.ratio}</td>
                    <td>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 8, background: f.sent === 'BULLISH' ? '#0e2a0e' : '#2e0e0e', color: f.sent === 'BULLISH' ? 'var(--quantum-green)' : 'var(--red)', border: `1px solid ${f.sent === 'BULLISH' ? 'rgba(74,240,184,0.4)' : 'rgba(248,113,113,0.4)'}`, fontFamily: 'inherit' }}>{f.sent}</span>
                    </td>
                    <td style={{ textAlign: 'left', fontFamily: 'inherit', color: 'var(--text-secondary)' }}>{f.ctx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Options flow from Barchart/Yahoo Finance (Apr–May 2026). Not investment advice.</p>
        </div>
      )}
    </Layout>
  )
}
