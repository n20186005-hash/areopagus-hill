import { useTranslations, useMessages } from 'next-intl';

const iconMap: Record<string, React.ReactNode> = {
  shoe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 18h20v2H2zM4 18V8l4-3 3 2h5l4 4v7" />
      <path d="M8 14h2M12 14h2" />
    </svg>
  ),
  flashlight: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 2h10v6l-2 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2V10L7 8V2z" />
      <line x1="12" y1="14" x2="12" y2="18" />
    </svg>
  ),
  warning: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  children: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M9 10v4l-2 6M9 14l2 6M17 11v3l-1 4M17 14l1.5 4" />
    </svg>
  ),
};

export default function SafetyTips() {
  const t = useTranslations('safetyTips');
  const messages = useMessages() as any;
  const items = (messages?.safetyTips?.items || []) as Array<{ icon: string; title: string; description: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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
              style={{ background: 'var(--bg-primary)' }}
            >
              <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--accent)' }}>
                {iconMap[item.icon] || iconMap.warning}
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
