'use client';
import { motion, type Variants } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Fixed UI */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
        <Header />
      </div>

      {/* Subtle background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <HeroSection />
        </motion.div>

        {[AboutSection, SkillsSection, ProjectsSection, ContactSection].map(
          (Section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <Section />
            </motion.div>
          )
        )}
      </main>

      {/* Scroll to top */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 w-10 h-10 bg-cyan-600 hover:bg-cyan-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
}