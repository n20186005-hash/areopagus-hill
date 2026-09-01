import { useTranslations, useMessages } from 'next-intl';

export default function SunsetGuide() {
  const t = useTranslations('sunsetGuide');
  const messages = useMessages() as any;
  const tips = (messages?.sunsetGuide?.tips?.items || []) as string[];

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

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3
            className="font-display text-xl font-semibold mb-6 flex items-center gap-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {messages?.sunsetGuide?.tips?.title}
          </h3>
          <ul className="space-y-4">
            {tips.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent)' }}
                />
                <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
