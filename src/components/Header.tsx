'use client';
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItemsData = [
  { href: '#about',    path: '~/about',    th: 'เกี่ยวกับ',     en: 'about' },
  { href: '#skills',   path: '~/skills',   th: 'ทักษะ',          en: 'skills' },
  { href: '#projects', path: '~/projects', th: 'ผลงาน',          en: 'projects' },
  { href: '#contact',  path: '~/contact',  th: 'ติดต่อ',         en: 'contact' },
];

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-brut-cream border-b-[3px] border-brut-ink py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center gap-3">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center gap-2 min-w-0">
            <span className="bg-brut-ink text-brut-yellow font-mono-brut font-black text-sm sm:text-base w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center brut-border brut-shadow-sm brut-hover flex-shrink-0">
              &lt;/&gt;
            </span>
            <span className="hidden xs:inline sm:inline font-mono-brut font-bold text-sm sm:text-base tracking-tight truncate">
              <span className="text-brut-ink">{t('วรกันต์', 'worrakan')}</span>
              <span className="bg-brut-yellow text-brut-ink px-1 ml-0.5">.me</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItemsData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono-brut text-[11px] lg:text-xs px-2 lg:px-3 py-1.5 bg-white brut-border-2 brut-shadow-sm brut-hover text-brut-ink lowercase whitespace-nowrap"
              >
                <span className="text-brut-pink">$</span> <span className="font-bold">cd</span> {item.path}
              </Link>
            ))}

            {/* Language switch */}
            <button
              onClick={toggleLanguage}
              className="ml-1 lg:ml-2 bg-brut-ink text-brut-yellow font-mono-brut font-bold text-[11px] lg:text-xs px-2.5 lg:px-3 py-1.5 brut-border-2 brut-shadow-sm brut-hover whitespace-nowrap"
              aria-label="Toggle language"
            >
              lang=&apos;{language}&apos;
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden bg-brut-yellow text-brut-ink p-2 brut-border-2 brut-shadow-sm brut-hover"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3"
            >
              <div className="bg-white brut-border brut-shadow-md p-3 grid gap-2">
                {navItemsData.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-3 font-mono-brut text-sm brut-border-2 bg-white text-brut-ink"
                  >
                    <span className="text-brut-pink">$</span> <span className="font-bold">cd</span> {item.path}
                  </Link>
                ))}
                <button
                  onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                  className="block py-2 px-3 font-mono-brut font-bold text-sm bg-brut-yellow text-brut-ink brut-border-2 text-center"
                >
                  <span className="text-brut-pink">lang</span>.<span className="font-black">toggle</span>() <span className="text-zinc-500">{'// →'}</span> {language === 'th' ? 'EN' : 'TH'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
