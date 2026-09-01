import { useTranslations, useMessages } from 'next-intl';

export default function HistoryLegends() {
  const t = useTranslations('historyLegends');
  const messages = useMessages() as any;
  const timeline = (messages?.historyLegends?.timeline || []) as Array<{ era: string; title: string; content: string }>;

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
          className="text-lg leading-relaxed text-center mb-12 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="relative">
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 sm:-translate-x-0.5"
            style={{ background: 'var(--accent)', opacity: 0.3 }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${i % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}
              >
                <div className="sm:w-1/2" />

                <div
                  className="absolute left-4 sm:left-1/2 top-0 w-3 h-3 rounded-full sm:-translate-x-1.5 mt-1.5 z-10"
                  style={{ background: 'var(--accent)' }}
                />

                <div
                  className="flex-1 ml-10 sm:ml-0 p-6 rounded-2xl border border-white/10 hover:shadow-md transition-shadow"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <span
                    className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                    style={{ background: 'var(--accent)', color: 'white', opacity: 0.9 }}
                  >
                    {item.era}
                  </span>
                  <h3
                    className="font-display text-xl font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
