import { setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Locale validity is already enforced by the layout above; this call only
  // primes next-intl's per-request cache so this segment can be prerendered
  // statically instead of opting into `headers()`-based dynamic rendering.
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
