'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SparklesIcon } from "@heroicons/react/24/outline";
import GitHubStats from "@/components/GitHubStats";

const AboutSection = () => {
  const { t } = useLanguage();

  const skills = [
    {
      title: t('Infrastructure & Network', 'Infrastructure & Network'),
      subtitle: t('Server Management, LAN/WAN, IoT', 'Server Management, LAN/WAN, IoT'),
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&fit=crop',
    },
    {
      title: t('Full-Stack Development', 'Full-Stack Development'),
      subtitle: t('React, Next.js, Python, FastAPI, Django', 'React, Next.js, Python, FastAPI, Django'),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80&fit=crop',
    },
    {
      title: t('Cloud & DevOps', 'Cloud & DevOps'),
      subtitle: t('AWS, Google Cloud, Docker, Kubernetes', 'AWS, Google Cloud, Docker, Kubernetes'),
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80&fit=crop',
    },
    {
      title: t('Database Expertise', 'Database Expertise'),
      subtitle: t('MySQL, PostgreSQL, MongoDB, Redis', 'MySQL, PostgreSQL, MongoDB, Redis'),
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=700&q=80&fit=crop',
    },
    {
      title: t('AI/ML Integration', 'AI/ML Integration'),
      subtitle: t('Face Recognition, Computer Vision, ML', 'Face Recognition, Computer Vision, ML'),
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80&fit=crop',
    },
    {
      title: t('Cybersecurity', 'Cybersecurity'),
      subtitle: t('Network Security, Firewall, VPN, CCTV', 'Network Security, Firewall, VPN, CCTV'),
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&fit=crop',
    },
    {
      title: t('Web Technologies', 'Web Technologies'),
      subtitle: t('WordPress, E-commerce, SEO, Responsive', 'WordPress, E-commerce, SEO, Responsive'),
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80&fit=crop',
    },
    {
      title: t('System Administration', 'System Administration'),
      subtitle: t('Linux, Shell Scripting, Automation', 'Linux, Shell Scripting, Automation'),
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=80&fit=crop',
    },
    {
      title: t('Technical Support', 'Technical Support'),
      subtitle: t('Windows Server, Microsoft Office, Hardware', 'Windows Server, Microsoft Office, Hardware'),
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=700&q=80&fit=crop',
    },
  ];

  return (
    <section id="about" className="px-6 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0  pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
            {t('เกี่ยวกับฉัน', 'About Me')}
          </h3>
          <p className="text-gray-400 mt-2">{t('ผู้พัฒนาที่หลงใหลในเทคโนโลยีและนวัตกรรม', 'Passionate Developer & Technology Innovator')}</p>
          
          {/* Introduction paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {t(
                  'สวัสดีครับ! ผมวรกันต์ นาไทร นักพัฒนาซอฟต์แวร์และ IT Infrastructure Specialist ที่มีประสบการณ์ในการพัฒนาระบบขนาดใหญ่ ตั้งแต่ Web Application, AI/ML Integration ไปจนถึงการจัดการระบบ Cloud และ Database ผมมีความชื่นชอบในการเรียนรู้เทคโนโลยีใหม่และแก้ไขปัญหาที่ซับซ้อน พร้อมที่จะสร้างสรรค์โซลูชันที่ตอบโจทย์ทุกความต้องการ',
                  'Hello! I\'m Worrakan Nasai, a Software Developer and IT Infrastructure Specialist with experience in developing large-scale systems, from Web Applications and AI/ML Integration to Cloud Systems and Database management. I have a passion for learning new technologies and solving complex problems, ready to create innovative solutions that meet every need.'
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── GitHub Stats ─── */}
        <GitHubStats />

        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-1">
              {t('ความเชี่ยวชาญ', 'Core Expertise')}
            </p>
            <h4 className="text-2xl font-bold text-white">
              {t('ทักษะและความเชี่ยวชาญหลักของผม', 'My Core Skills & Expertise')}
            </h4>
          </motion.div>

          {/* Image overlay grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer"
              >
                {/* Background image */}
                <Image
                  src={skill.image}
                  alt={skill.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay — always dark at bottom, gets slightly lighter on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10 transition-opacity duration-300 group-hover:from-zinc-950/90 group-hover:via-zinc-950/50 group-hover:to-zinc-950/20" />

                {/* Cyan bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-base leading-tight mb-1">
                    {skill.title}
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {skill.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;