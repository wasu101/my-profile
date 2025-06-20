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
    <section className="px-6 py-20 md:py-32 relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t("สวัสดี ผมชื่อ", "Hi, I'm")}
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t(" วรกันต์ นาไทร (แจ๊ค)", " Worrakan Nasai (Jack)")}
              </span>
            </h2>
            <div className="text-xl text-gray-400 mb-8 h-8">
              <TypeWriter 
                words={
                  t('IT Specialist,Web Developer,Full Stack Developer,Python Developer', 
                    'IT Specialist,Web Developer,Full Stack Developer,Python Developer').split(',')
                }
              />
            </div>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transform hover:scale-105 transition-all duration-200" 
                asChild
              >
                <Link href="#contact">{t('ติดต่อฉัน', 'Get In Touch')}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200" 
                asChild
              >
                <Link href="#projects">{t('ดูผลงาน', 'View Projects')}</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Profile Image Section */}
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 relative"
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
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Replace this with your actual image */}
              <Image
                src="/images/profile.jpg" // Add your image to public/images/
                alt={t("วรกันต์ นาไทร", "Worrakan Nasai")}
                fill
                className="object-cover"
                priority
              />
              
              {/* Fallback if no image - remove this once you add your image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-pink-600/30">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                
                </span>
              </div>
            </div>
            
            {/* Floating particles around image */}
            <motion.div
              className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-12 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full"
              animate={{
                y: [0, -8, 0],
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
              className="absolute top-16 left-4 w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                y: [0, -6, 0],
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
      <ScrollMouseIndicator />
    </section>
  );
};

export default HeroSection;