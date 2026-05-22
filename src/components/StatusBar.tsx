'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * VS Code-style bottom status bar — adds developer flavor without
 * breaking the Neo-Brutalism layout. Shows git branch, language,
 * build status, and a live clock.
 */
const StatusBar = () => {
  const { language, t } = useLanguage();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dev-statusbar fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between w-full">
      <div className="flex items-center min-w-0 overflow-hidden">
        <span className="seg seg-accent">
          <span className="seg-dot" /> main
        </span>
        <span className="seg hidden xs:inline-flex sm:inline-flex">
          <span aria-hidden>↑</span> 0 <span aria-hidden>↓</span> 0
        </span>
        <span className="seg hidden md:inline-flex">
          {t('สร้างด้วย', 'built with')} Next.js · TS
        </span>
        <span className="seg hidden xl:inline-flex">
          worrakan.me
        </span>
      </div>
      <div className="flex items-center flex-shrink-0">
        <span className="seg hidden lg:inline-flex">UTF-8</span>
        <span className="seg hidden md:inline-flex">LF</span>
        <span className="seg hidden sm:inline-flex">{language.toUpperCase()}</span>
        <span className="seg seg-pink">{time}</span>
      </div>
    </div>
  );
};

export default StatusBar;
