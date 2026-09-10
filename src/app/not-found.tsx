import Link from 'next/link';

import './globals.css';

// Root fallback — catches the case where `[locale]/layout.tsx` itself calls
// notFound() for an invalid locale segment (e.g. `/xx/...`). That happens
// before the layout finishes rendering, so there's no next-intl context and
// no parent layout to supply <html>/<body> here — this file has to bring
// its own, per Next.js' documented root not-found behaviour. Content is
// hardcoded in German (the default locale), the one language guaranteed to
// make sense with no locale context available.
//
// `[locale]/not-found.tsx` handles the normal, localized 404 case.
export default function RootNotFound() {
  return (
    <html lang="de">
      <body
        style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
        className="bg-bg text-fg m-0 flex min-h-screen items-center justify-center px-5"
      >
        <div className="text-center">
          <p className="text-fg-muted font-mono text-xs tracking-[0.2em] uppercase">
            Fehler 404
          </p>
          <h1 className="text-fg mt-4 text-3xl font-bold tracking-tight">
            Diese Seite gibt es nicht
          </h1>
          <p className="text-fg-secondary mx-auto mt-3 max-w-sm text-base leading-relaxed">
            Die aufgerufene Adresse existiert nicht oder wurde verschoben.
          </p>
          <Link
            href="/de"
            className="bg-accent text-fg-inverse rounded-button hover:bg-accent-secondary mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-colors duration-200"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
