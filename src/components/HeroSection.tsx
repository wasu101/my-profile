'use client';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import ScrollMouseIndicator from "./ScrollMouseIndicator";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Decorative floating brutalist shapes ────────────────────────────────
function BrutShapes() {
  const shapes = [
    { className: "bg-brut-pink",   style: { top: '8%',  left: '6%',  width: 70,  height: 70  }, rotate: -10, delay: 0 },
    { className: "bg-brut-cyan",   style: { top: '15%', right: '8%', width: 90,  height: 90  }, rotate: 12,  delay: 0.4, round: true },
    { className: "bg-brut-lime",   style: { bottom: '20%', left: '4%',  width: 110, height: 60 }, rotate: -6, delay: 0.2 },
    { className: "bg-brut-orange brut-stripes-thin", style: { top: '40%', right: '4%', width: 60, height: 120 }, rotate: 8, delay: 0.6 },
    { className: "bg-brut-violet", style: { bottom: '8%', right: '18%', width: 80, height: 80 }, rotate: -12, delay: 0.3, round: true },
    { className: "bg-brut-yellow", style: { top: '60%', left: '12%', width: 50, height: 50 }, rotate: 18, delay: 0.5 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
          transition={{ delay: s.delay, type: 'spring', stiffness: 120, damping: 14 }}
          className={`absolute brut-border brut-shadow-md hidden sm:block ${s.className} ${s.round ? 'rounded-full' : ''}`}
          style={s.style}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 md:py-32 relative min-h-screen flex items-center overflow-hidden">
      <BrutShapes />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="code-prompt mb-5 inline-block text-left max-w-full">
              <div className="mb-1">
                <span className="prompt-user">jack</span>
                <span className="prompt-host">@worrakan</span>
                <span className="prompt-out">:</span>
                <span className="prompt-path">~/portfolio</span>
                <span className="prompt-out"> $ </span>
                <span className="prompt-cmd">whoami</span>
              </div>
              <div className="prompt-out text-[0.65rem] sm:text-[0.7rem]">
                &gt; <span className="prompt-sigil">OPEN</span> {t('พร้อมรับงาน', 'available for hire')}<span className="code-cursor" />
              </div>
            </div>

            <h2 className="brut-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              {t('สวัสดี ผมชื่อ', "Hi, I'm")}
              <br />
              <span className="inline-block bg-brut-yellow text-brut-ink px-3 py-1 mt-2 brut-border brut-shadow-md -rotate-1">
                {t('แจ๊ค!', 'JACK!')}
              </span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-3 inline-block">
                {t('วรกันต์ นาไทร', 'Worrakan Nasai')}
              </span>
            </h2>

            <div className="bg-white brut-border brut-shadow-md inline-block px-4 py-2 text-base sm:text-lg md:text-xl font-bold mb-6 min-h-[2.75rem]">
              <span className="text-brut-ink">
                <TypeWriter
                  words={
                    t('IT Specialist,Web Developer,Full Stack Developer,Python Developer',
                      'IT Specialist,Web Developer,Full Stack Developer,Python Developer').split(',')
                  }
                />
              </span>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="#contact">{t('ติดต่อฉัน →', 'GET IN TOUCH →')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#projects">{t('ดูผลงาน', 'VIEW PROJECTS')}</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { v: '5+',  k: 'years',    th: 'ประสบการณ์',  bg: 'bg-white' },
                { v: '20+', k: 'projects', th: 'โปรเจค',          bg: 'bg-brut-yellow' },
                { v: '15+', k: 'stack',    th: 'เทคโนโลยี',      bg: 'bg-white' },
                { v: '10+', k: 'clients',  th: 'ลูกค้า',         bg: 'bg-brut-pink' },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  whileHover={{ y: -3, rotate: i % 2 === 0 ? -2 : 2 }}
                  className={`${s.bg} brut-border brut-shadow-sm p-3 text-left font-mono-brut`}
                >
                  <div className="text-[10px] text-zinc-500 lowercase">{s.k}:</div>
                  <div className="font-black text-2xl sm:text-3xl leading-none">{s.v}</div>
                  <div className="text-[10px] mt-0.5 text-zinc-600 lowercase">{'// '}{t(s.th, s.k)}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile */}
          <motion.div
            className="flex flex-col items-center gap-5 flex-shrink-0 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          >
            <div className="relative">
              {/* Yellow back-block */}
              <div className="absolute inset-0 bg-brut-yellow brut-border translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-brut-pink brut-border overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt={t("วรกันต์ นาไทร", "Worrakan Nasai")}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>
              {/* Sticker */}
              <motion.div
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-brut-yellow text-brut-ink brut-border brut-shadow-sm font-mono-brut font-black text-xs sm:text-sm px-3 py-2"
              >
                <span className="text-brut-pink">&lt;</span>dev<span className="text-brut-pink"> /&gt;</span>
              </motion.div>
            </div>

            <motion.div
              className="flex gap-2 flex-wrap justify-center max-w-[20rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[
                { name: 'react',   ver: 'latest',    bg: 'bg-white' },
                { name: 'python',  ver: '3.12',  bg: 'bg-brut-yellow' },
                { name: 'aws',     ver: 'latest',bg: 'bg-white' },
                { name: 'next.js', ver: 'latest',    bg: 'bg-brut-pink' },
              ].map((s, i) => (
                <motion.span
                  key={s.name}
                  whileHover={{ y: -3, rotate: i % 2 === 0 ? -3 : 3 }}
                  className={`${s.bg} text-brut-ink font-mono-brut text-[11px] px-2.5 py-1 brut-border-2 brut-shadow-sm lowercase`}
                >
                  {s.name}<span className="opacity-60">@</span>{s.ver}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="hidden sm:block">
        <ScrollMouseIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
