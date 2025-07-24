'use client';

import { LanguageSwitcher } from '@/components/Navigation/LanguageSwitcher';
import { usePathname } from 'next/navigation';

export default function TestLangSwitch() {
  const pathname = usePathname();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Language Switcher Test</h1>
      
      <div className="mb-4">
        <p>Current pathname: <code className="bg-gray-100 px-2 py-1">{pathname}</code></p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-bold mb-2">Minimal variant:</h2>
          <LanguageSwitcher variant="minimal" />
        </div>
        
        <div>
          <h2 className="font-bold mb-2">Toggle variant:</h2>
          <LanguageSwitcher variant="toggle" />
        </div>
        
        <div>
          <h2 className="font-bold mb-2">Dropdown variant:</h2>
          <LanguageSwitcher variant="dropdown" />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="font-bold mb-2">Test Links:</h2>
        <ul className="space-y-2">
          <li><a href="/" className="text-blue-600 hover:underline">Homepage (English)</a></li>
          <li><a href="/es" className="text-blue-600 hover:underline">Homepage (Spanish)</a></li>
          <li><a href="/blog" className="text-blue-600 hover:underline">Blog (English)</a></li>
          <li><a href="/es/blog" className="text-blue-600 hover:underline">Blog (Spanish)</a></li>
          <li><a href="/contact" className="text-blue-600 hover:underline">Contact (English)</a></li>
          <li><a href="/es/contacto" className="text-blue-600 hover:underline">Contact (Spanish)</a></li>
        </ul>
      </div>
    </div>
  );
}