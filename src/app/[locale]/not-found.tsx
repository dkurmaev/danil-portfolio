import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

// Localized 404 — rendered inside `[locale]/layout.tsx` for any path under
// a valid locale that doesn't match a route, so it keeps the full site
// chrome and next-intl context. The invalid-locale case (e.g. `/xx/...`)
// is caught one level up by the root `src/app/not-found.tsx` instead.
export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <>
      <Header />
      <main>
        <section className="border-border flex min-h-[60vh] items-center border-b py-20">
          <Container>
            <div className="mx-auto max-w-xl text-center">
              <span
                aria-hidden="true"
                className="text-[clamp(4rem,10vw,7rem)] leading-none font-light tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-border)]"
              >
                404
              </span>
              <p className="text-fg-muted mt-4 font-mono text-xs tracking-[0.2em] uppercase">
                {t('eyebrow')}
              </p>
              <h1 className="text-fg mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h1>
              <p className="text-fg-secondary mt-4 text-base leading-relaxed sm:text-lg">
                {t('description')}
              </p>
              <Button href="/" variant="primary" className="mt-8">
                <Home size={16} aria-hidden="true" />
                {t('cta')}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
