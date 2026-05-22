'use client';
import { motion, MotionConfig, useScroll, useTransform, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import SplashLoader from "@/components/SplashLoader";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const sections = [AboutSection, SkillsSection, ProjectsSection, ContactSection];

export default function Home() {
  const [showTop, setShowTop] = useState(false);
  const { scrollY } = useScroll();
  const yShape = useTransform(scrollY, [0, 800], [0, -100]);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 600);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader />
      <div className="min-h-screen bg-brut-cream text-brut-ink relative pb-8">
        {/* Fixed UI */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <ScrollProgress />
          <Header />
        </div>

        {/* Decorative parallax shapes */}
        <motion.div
          style={{ y: yShape }}
          aria-hidden
          className="pointer-events-none fixed -z-0 top-1/3 -left-10 w-24 h-24 bg-brut-pink brut-border brut-shadow-md rotate-12 hidden lg:block"
        />
        <motion.div
          style={{ y: yShape }}
          aria-hidden
          className="pointer-events-none fixed -z-0 top-2/3 -right-8 w-20 h-20 bg-brut-cyan brut-border brut-shadow-md rounded-full hidden lg:block"
        />

        <main className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <HeroSection />
          </motion.div>

          {sections.map((Section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <Section />
            </motion.div>
          ))}
        </main>

        {/* Scroll to top */}
        <motion.button
          className="fixed bottom-10 right-4 sm:bottom-14 sm:right-8 z-40 w-11 h-11 sm:w-14 sm:h-14 bg-brut-yellow text-brut-ink brut-border brut-shadow-md brut-hover flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </MotionConfig>
  );
}
