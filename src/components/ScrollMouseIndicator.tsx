'use client';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollMouseIndicator = () => {
  const { t } = useLanguage();

  return (
    <motion.button
      type="button"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex items-center gap-3 bg-brut-ink text-brut-cream font-extrabold uppercase tracking-widest text-xs px-4 py-2 brut-border brut-shadow-sm brut-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.4 }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      aria-label="Scroll to next section"
    >
      <span>{t('เลื่อนลง', 'Scroll Down')}</span>
      <motion.svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 4v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth={3} strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>
    </motion.button>
  );
};

export default ScrollMouseIndicator;
