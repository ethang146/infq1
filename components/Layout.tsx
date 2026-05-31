import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

const NAV_ITEMS = [
  { href: '/',            label: 'Overview',    icon: '⬡' },
  { href: '/financials',  label: 'Financials',  icon: '₿' },
  { href: '/news',        label: 'News',        icon: '◎' },
  { href: '/analysts',    label: 'Analysts',    icon: '◈' },
  { href: '/chart',       label: 'Chart & TA',  icon: '◬' },
  { href: '/competitors', label: 'Competitors', icon: '⊕' },
]

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title = 'INFQ' }: LayoutProps) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{title} | Infleqtion Intelligence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.30.0/dist/tabler-icons.min.css" />
      </Head>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <aside style={{ width: 210, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100 }}>
          <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--quantum-dark)', border: '1px solid rgba(74,240,184,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--quantum-green)' }}>⬡</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>Infleqtion</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Intelligence Suite</div>
              </div>
            </div>
            <span className="ticker-badge" style={{ fontSize: 10 }}>NYSE: $INFQ</span>
          </div>
          <nav style={{ padding: '10px 8px', flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, fontSize: 13, fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--quantum-green)' : 'var(--text-secondary)', background: isActive ? 'rgba(74,240,184,0.08)' : 'transparent', border: isActive ? '1px solid rgba(74,240,184,0.15)' : '1px solid transparent', marginBottom: 2, textDecoration: 'none' }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                  {isActive && <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: 'var(--quantum-green)', flexShrink: 0 }} />}
                </Link>
              )
            })}
          </nav>
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <div className="live-dot" style={{ width: 5, height: 5 }} />
