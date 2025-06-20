'use client';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SkillCardProps {
  name: string;
  imagePath: string;
  index: number;
  invertColor?: boolean;
  description?: string;
}

const SkillCard = ({ name, imagePath, index, invertColor = false, description }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (isHovered && description) {
      if (currentIndex < description.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + description[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 30); // ความเร็วในการพิมพ์
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Reset เมื่อเอาเมาส์ออก
      setDisplayText('');
      setCurrentIndex(0);
    }
  }, [isHovered, currentIndex, description]);
  
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={isHovered && !!description}>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.03, 
              duration: 0.4,
              ease: "easeOut"
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative"
          >
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  initial={{
                    x: Math.random() * 100,
                    y: 100,
                    opacity: 0
                  }}
                  animate={isHovered ? {
                    y: -20,
                    opacity: [0, 1, 0],
                    transition: {
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }
                  } : {}}
                />
              ))}
            </div>

            {/* Main card container */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              {/* Glow backdrop */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"
                animate={isHovered ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <Card className="relative bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden rounded-2xl">
                {/* Animated background mesh */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${isHovered ? '50% 50%' : '0% 0%'}, rgba(168, 85, 247, 0.15) 0%, transparent 60%)`,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                
                <CardContent className="relative p-4 sm:p-5 flex flex-col items-center z-10">
                  {/* Icon container */}
                  <motion.div 
                    className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3"
                    animate={{
                      rotateY: isHovered ? 360 : 0
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut"
                    }}
                  >
                    {/* Rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent)',
                      }}
                      animate={{
                        rotate: isHovered ? 360 : 0
                      }}
                      transition={{ 
                        duration: 3, 
                        ease: "linear"
                      }}
                    />
                    
                    {/* Icon background */}
                    <motion.div 
                      className="absolute inset-2 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    
                    {/* Icon */}
                    <div className="absolute inset-2 flex items-center justify-center">
                      <Image 
                        src={imagePath} 
                        alt={name} 
                        width={48} 
                        height={48}
                        className="object-contain w-full h-full"
                        style={{
                          filter: invertColor 
                            ? `brightness(0) invert(1) ${isHovered ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))' : ''}`
                            : isHovered 
                              ? 'brightness(1.2) drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))' 
                              : 'brightness(0.9)'
                        }}
                      />
                    </div>
                    
                    {/* Pulse effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{
                          scale: [1, 1.2, 1.2],
                          opacity: [0.5, 0, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                          border: '2px solid rgba(168, 85, 247, 0.5)'
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Skill name */}
                  <motion.h3 
                    className="text-center font-semibold text-sm text-gray-200 group-hover:text-white transition-colors duration-300"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {name}
                  </motion.h3>
                  
                  {/* Skill level dots */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < 4 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </CardContent>
                
                {/* Bottom gradient line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.8), transparent)',
                    scaleX: isHovered ? 1 : 0,
                    transition: 'transform 0.3s ease-out'
                  }}
                />
              </Card>
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        
        <TooltipContent 
          side="top" 
          className="max-w-xs bg-black/90 border-purple-500/50 text-gray-200"
        >
          <p className="text-sm">
            {displayText}
            {currentIndex < (description?.length || 0) && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-3 bg-purple-400 ml-0.5 align-middle"
              />
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SkillCard;