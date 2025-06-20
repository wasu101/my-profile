'use client';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollMouseIndicator = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <div className="flex flex-col items-center">
        <motion.p 
          className="text-white/50 text-sm mb-2 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t('เลื่อนลง', 'Scroll Down')}
        </motion.p>
        <div className="flex flex-col">
          <motion.svg
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M2 2L16 16L30 2"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/40"
            />
          </motion.svg>
          <motion.svg
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-mt-3"
            animate={{
              y: [0, 5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <path
              d="M2 2L16 16L30 2"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/30"
            />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollMouseIndicator;