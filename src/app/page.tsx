'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import ParticlesBackground from "@/components/ParticlesBackground";


export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Transform values for background animations
  const blurAmount = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);

  // Hide scrollbar
  useEffect(() => {
    // Hide scrollbar globally
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
    document.body.style.overflow = 'overlay';
    
    // Custom CSS for hiding scrollbar
    const style = document.createElement('style');
    style.textContent = `
      /* Hide scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      
      /* Hide scrollbar for Firefox */
      html {
        scrollbar-width: none;
      }
      
      /* Ensure smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      
      /* Hide scrollbar for IE and Edge */
      body {
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Base Background with lighter gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-700"
        />
        
        {/* Enhanced Animated Background Shapes - More vibrant */}
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 60%), radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating orbs - Brighter and more visible */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-45"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(244, 114, 182, 0.3) 50%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Additional bright accent orbs */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full opacity-40"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -180, -360],
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)',
            filter: 'blur(25px)',
          }}
        />

        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Lighter Dynamic Blur Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/15"
          style={{
            backdropFilter: useTransform(blurAmount, (value) => `blur(${value}px) brightness(1.1) contrast(1.15)`),
          }}
        />

        {/* Lighter Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        
        {/* Brighter noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='47' cy='13' r='1'/%3E%3Ccircle cx='23' cy='41' r='1'/%3E%3Ccircle cx='13' cy='27' r='1'/%3E%3Ccircle cx='53' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Fixed UI Elements */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        {/* Content Sections with Backdrop Blur */}
        <motion.div className="backdrop-blur-sm">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AboutSection />
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <SkillsSection />
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <ExperienceSection />
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <EducationSection />
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <ProjectsSection />
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <ContactSection />
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Elements */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {/* Custom Scroll to Top Button */}
        <motion.button
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </motion.div>
          
    </>
  );
}