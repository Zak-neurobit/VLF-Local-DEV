'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import MainNav from '@/components/Navigation/MainNav';
import { Footer } from '@/components/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <MainNav language={language} setLanguage={setLanguage} />
      {children}
      <Footer language={language} />
    </>
  );
}
