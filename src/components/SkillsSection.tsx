'use client';
import SkillCard from './SkillCard';
import { motion } from "framer-motion";
import { useEffect, useRef } from 'react';
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
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const cards = sectionRef.current.querySelectorAll('.skill-card');
      
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const screenCenterY = window.innerHeight / 2;
        const distance = Math.abs(centerY - screenCenterY);
        const maxDistance = window.innerHeight / 2;
        const scale = 1 - (distance / maxDistance) * 0.1;
        
        cardElement.style.transform = `scale(${Math.max(0.9, scale)})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="px-6 py-20" ref={sectionRef}>
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
            {t('ทักษะและเทคโนโลยี', 'Skills & Technologies')}
          </h3>
        </motion.div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-card transition-transform duration-300">
              <SkillCard 
                name={skill.name} 
                imagePath={skill.image} 
                index={index} 
                invertColor={skill.invertColor}
                description={skill.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;