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
  { name: 'Tiqker Optical Atomic Clock', desc: 'GPS-denied precision timing · Royal Navy sea trials · D
