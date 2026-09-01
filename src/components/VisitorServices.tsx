import { useTranslations, useMessages } from 'next-intl';

const iconMap: Record<string, React.ReactNode> = {
  restroom: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h4v5a2 2 0 002 2v0a2 2 0 002-2V7h2" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  parking: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 010 6H9" />
    </svg>
  ),
  dining: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  accommodation: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21V7l9-4 9 4v14" />
      <path d="M9 21V13h6v8" />
      <line x1="1" y1="21" x2="23" y2="21" />
    </svg>
  ),
  shopping: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  gasEV: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 16V4a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1h8a1 1 0 001-1z" />
      <path d="M14 8h2a2 2 0 012 2v4a2 2 0 002 2h0a2 2 0 002-2V9l-3-3" />
      <path d="M7 10l2 2-2 2" />
    </svg>
  ),
};

export default function VisitorServices() {
  const t = useTranslations('visitorServices');
  const messages = useMessages() as any;
  const items = (messages?.visitorServices?.items || []) as Array<{ icon: string; title: string; description: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8 mx-auto" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed text-center mb-10 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 hover:shadow-md transition-shadow"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--accent)' }}>
                {iconMap[item.icon] || iconMap.shopping}
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
