import React, { useState } from 'react'
import { askClaude } from '../lib/claude'

interface AiPanelProps {
  placeholder?: string
  systemContext?: string
}

export default function AiPanel({ placeholder = 'Ask anything about INFQ...', systemContext = '' }: AiPanelProps) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResult('')
    setError('')
    try {
      const prompt = systemContext ? `${systemContext}\n\nUser question: ${query}` : query
      const answer = await askClaude(prompt)
      setResult(answer)
    } catch (e: any) {
      setError(e.message || 'Request failed')
    }
    setLoading(false)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: result || error ? 10 : 0 }}>
        <input
          className="ai-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder={placeholder}
        />
        <button className="btn-primary" onClick={handleAsk} disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? ' Searching...' : 'Ask AI ↗'}
        </button>
      </div>
      {error && (
        <div style={{ color: 'var(--red)', fontSize: 13, padding: '8px 12px', background: '#2e0e0e', borderRadius: 8 }}>
          {error}
        </div>
      )}
      {result && (
        <div className="ai-box">
          <div style={{ fontSize: 10, color: 'var(--quantum-green)', fontWeight: 500, marginBottom: 6 }}>
            ✦ AI Answer — live web search
          </div>
          <div style={{ color: 'var(--text-primary)' }}>{result}</div>
        </div>
      )}
    </div>
  )
}
