'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CpuChipIcon } from "@heroicons/react/24/outline";

const SkillsSection = () => {
  const { t } = useLanguage();
  
  const skills = [
    { 
      name: 'Python', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
      description: t('ภาษาโปรแกรมหลักที่ใช้ในการพัฒนา Backend, API และ Data Processing', 'Main programming language for Backend, API and Data Processing')
    },
    { 
      name: 'Flask', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg', 
      invertColor: true,
      description: t('Micro Web Framework สำหรับพัฒนา Web Application ขนาดเล็กถึงกลาง', 'Micro Web Framework for small to medium Web Application development')
    },
    { 
      name: 'FastAPI', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
      description: t('Modern Web Framework สำหรับสร้าง API ที่รวดเร็วและมี Auto Documentation', 'Modern Web Framework for building fast APIs with Auto Documentation')
    },
    { 
      name: 'Django', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg', 
      invertColor: true,
      description: t('Full-stack Web Framework พร้อม ORM และ Admin Interface', 'Full-stack Web Framework with ORM and Admin Interface')
    },
    { 
      name: 'React', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      description: t('JavaScript Library สำหรับสร้าง User Interface แบบ Component-based', 'JavaScript Library for building Component-based User Interfaces')
    },
    { 
      name: 'Next.js', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
      description: t('React Framework พร้อม SSR, SSG และ Built-in Optimization', 'React Framework with SSR, SSG and Built-in Optimization')
    },
    { 
      name: 'TypeScript', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      description: t('JavaScript พร้อม Type System ช่วยลดข้อผิดพลาดและเพิ่มประสิทธิภาพการพัฒนา', 'JavaScript with Type System to reduce errors and improve development efficiency')
    },
    { 
      name: 'Tailwind CSS', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
      description: t('Utility-first CSS Framework สำหรับสร้าง UI ที่สวยงามอย่างรวดเร็ว', 'Utility-first CSS Framework for rapid beautiful UI development')
    },
    { 
      name: 'SQLite', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg',
      description: t('Embedded Database ที่เบาและเร็ว เหมาะสำหรับ Application ขนาดเล็ก', 'Lightweight and fast Embedded Database for small applications')
    },
    { 
      name: 'Prisma', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg', 
      invertColor: true,
      description: t('Modern ORM พร้อม Type-safe Database Access และ Migration', 'Modern ORM with Type-safe Database Access and Migration')
    },
    { 
      name: 'WordPress', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg', 
      invertColor: true,
      description: t('CMS ยอดนิยมสำหรับสร้างเว็บไซต์และบล็อก พร้อม Plugin มากมาย', 'Popular CMS for building websites and blogs with numerous plugins')
    },
    { 
      name: 'MySQL', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', 
      invertColor: true,
      description: t('Relational Database ที่นิยมใช้กับ Web Application ขนาดใหญ่', 'Popular Relational Database for large Web Applications')
    },
    { 
      name: 'Docker', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
      description: t('Container Platform สำหรับ Deploy Application อย่างมีประสิทธิภาพ', 'Container Platform for efficient Application deployment')
    },
    { 
      name: 'Git', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
      description: t('Version Control System สำหรับจัดการ Source Code และทำงานเป็นทีม', 'Version Control System for source code management and team collaboration')
    },
    { 
      name: 'AWS', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      description: t('Cloud Platform สำหรับ Deploy และจัดการ Infrastructure แบบ Scalable', 'Cloud Platform for scalable Infrastructure deployment and management')
    },
    { 
      name: 'Node.js', 
      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
      description: t('JavaScript Runtime สำหรับ Backend Development และ Server-side Applications', 'JavaScript Runtime for Backend Development and Server-side Applications')
    }
  ];

  return (
    <section id="skills" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <CpuChipIcon className="w-8 h-8 text-purple-400" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('เทคโนโลยีที่ใช้', 'Tech Stack')}
          </h3>
        </motion.div>
        <div className="relative">
          {/* Floating Tech Stack Display */}
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500" />
                
                {/* Main badge */}
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-purple-500/50 transition-all duration-300 group-hover:bg-black/70 w-24 h-28 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center gap-2 flex-1 justify-center">
                    {/* Icon */}
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Image 
                        src={skill.image} 
                        alt={skill.name} 
                        width={32}
                        height={32}
                        className="object-contain"
                        style={{
                          filter: skill.invertColor 
                            ? 'brightness(0) invert(1)' 
                            : 'none'
                        }}
                      />
                      
                      {/* Pulse effect on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Name */}
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                  
                  {/* Skill level indicator */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + i * 0.1 }}
                        className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    ))}
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 max-w-xs text-center border border-purple-500/30">
                      {skill.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${
                    i === 0 ? 'rgba(168, 85, 247, 0.1)' : 
                    i === 1 ? 'rgba(236, 72, 153, 0.1)' : 
                    'rgba(59, 130, 246, 0.1)'
                  } 0%, transparent 70%)`,
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;