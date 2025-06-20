'use client';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('หน้าแรก', 'Home') },
    { href: '#about', label: t('เกี่ยวกับ', 'About') },
    { href: '#skills', label: t('ทักษะ', 'Skills') },
    { href: '#experience', label: t('ประสบการณ์', 'Experience') },
    { href: '#education', label: t('การศึกษา', 'Education') },
    { href: '#projects', label: t('ผลงาน', 'Projects') },
    { href: '#contact', label: t('ติดต่อ', 'Contact') },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="group">
              <h1 className="text-xl md:text-2xl font-bold relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {t('W', 'W')}
                </span>
                <span className="text-white/60 font-light ml-2">
                  {t('Portfolio', 'Portfolio')}
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-1"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: '80%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
                <button
                  onClick={() => language === 'en' && toggleLanguage()}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'th'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ไทย
                </button>
                <button
                  onClick={() => language === 'th' && toggleLanguage()}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-black/50 backdrop-blur-xl rounded-lg border border-white/10 p-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
                    <button
                      onClick={() => {
                        if (language === 'en') toggleLanguage();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        language === 'th'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-400'
                      }`}
                    >
                      ไทย
                    </button>
                    <button
                      onClick={() => {
                        if (language === 'th') toggleLanguage();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        language === 'en'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-400'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;