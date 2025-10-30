'use client';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import ScrollMouseIndicator from "./ScrollMouseIndicator";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32 relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t("สวัสดี ผมชื่อ", "Hi, I'm")}
              </span>
              <br className="block sm:hidden" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t(" วรกันต์ นาไทร (แจ๊ค)", " Worrakan Nasai (Jack)")}
              </span>
            </h2>
            
            <div className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 h-8 sm:h-10">
              <TypeWriter 
                words={
                  t('IT Specialist,Web Developer,Full Stack Developer,Python Developer', 
                    'IT Specialist,Web Developer,Full Stack Developer,Python Developer').split(',')
                }
              />
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transform hover:scale-105 transition-all duration-200 px-6 py-3 text-base font-semibold" 
                asChild
              >
                <Link href="#contact">{t('ติดต่อฉัน', 'Get In Touch')}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 px-6 py-3 text-base font-semibold" 
                asChild
              >
                <Link href="#projects">{t('ดูผลงาน', 'View Projects')}</Link>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('ปีประสบการณ์', 'Years Experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">20+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('โปรเจค', 'Projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">15+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('เทคโนโลยี', 'Technologies')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">10+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('ลูกค้า', 'Clients')}</div>
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t('พร้อมรับงาน Freelance', 'Available for Freelance')}</span>
            </motion.div>
          </motion.div>
          
          {/* Profile Image Section */}
          <motion.div 
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Background with gradient and blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-white/10" />
            
            {/* Animated glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-purple-400 to-pink-400"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
                borderRadius: '50%'
              }}
            />
            
            {/* Profile Image Container */}
            <div className="absolute inset-3 sm:inset-4 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Profile Image */}
              <Image
                src="/images/profile.jpg"
                alt={t("วรกันต์ นาไทร", "Worrakan Nasai")}
                fill
                className="object-cover"
                priority
                onError={() => {
                  // Handle image load error
                  console.log('Profile image not found');
                }}
              />
              
            </div>
            
            {/* Quick Skills Badges */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 flex-wrap justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {['React', 'Python', 'AWS', 'Next.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Floating particles around image - responsive sizes */}
            <motion.div
              className="absolute top-6 sm:top-8 right-6 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-400 rounded-full"
              animate={{
                y: [0, -6, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-12 sm:top-16 left-3 sm:left-4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400 rounded-full"
              animate={{
                y: [0, -4, 0],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator - Hide on small screens */}
      <div className="hidden sm:block">
        <ScrollMouseIndicator />
      </div>
    </section>
  );
};

export default HeroSection;