import { useIsMobile } from '../hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{
      background: '#0D0F18',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '24px 20px' : '32px 40px',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className="font-display" style={{
          fontSize: '20px', fontWeight: 600,
          color: '#FAFAF8', letterSpacing: '-0.03em',
        }}>
          SN<span style={{ color: '#0891B2' }}>.</span>
        </span>
        <span style={{ fontSize: '13px', color: '#4B5563' }}>
          Sriram Naidu Thota · Washington D.C. · 2026
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {['About', 'Education', 'Projects', 'Contact'].map(link => (
          <a
            key={link}
            href={'#' + link.toLowerCase()}
            style={{
              fontSize: '13px', color: '#6B7280',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#0891B2'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
          >
            {link}
          </a>
        ))}
      </div>

      <span style={{ fontSize: '12px', color: '#374151' }}>
        M.S. ISAI · Johns Hopkins University
      </span>
    </footer>
  )
}
