'use client';
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="px-6 py-8 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <p className="text-center text-gray-400">
        © 2025 {t('วรกันต์ นาไทร', 'Worrakan Nasai')}. {t('สงวนลิขสิทธิ์', 'All rights reserved.')}.
      </p>
    </footer>
  );
};

export default Footer;