import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="text-sm opacity-70">{t('subtitle')}</p>
    </main>
  );
}
