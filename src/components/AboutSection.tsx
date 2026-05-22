'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import GitHubStats from "@/components/GitHubStats";
import AnimatedBlobs from "@/components/AnimatedBlobs";

const palette = ['bg-brut-yellow', 'bg-brut-cyan', 'bg-brut-pink', 'bg-brut-lime', 'bg-brut-orange', 'bg-brut-violet'];

const AboutSection = () => {
  const { t } = useLanguage();

  const skills = [
    { title: t('Infrastructure & Network', 'Infrastructure & Network'), subtitle: t('Server Management, LAN/WAN, IoT', 'Server Management, LAN/WAN, IoT'), image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&fit=crop' },
    { title: t('Full-Stack Development', 'Full-Stack Development'), subtitle: t('React, Next.js, Python, FastAPI, Django', 'React, Next.js, Python, FastAPI, Django'), image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80&fit=crop' },
    { title: t('Cloud & DevOps', 'Cloud & DevOps'), subtitle: t('AWS, Google Cloud, Docker, Kubernetes', 'AWS, Google Cloud, Docker, Kubernetes'), image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80&fit=crop' },
    { title: t('Database Expertise', 'Database Expertise'), subtitle: t('MySQL, PostgreSQL, MongoDB, Redis', 'MySQL, PostgreSQL, MongoDB, Redis'), image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=700&q=80&fit=crop' },
    { title: t('AI/ML Integration', 'AI/ML Integration'), subtitle: t('Face Recognition, Computer Vision, ML', 'Face Recognition, Computer Vision, ML'), image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80&fit=crop' },
    { title: t('Cybersecurity', 'Cybersecurity'), subtitle: t('Network Security, Firewall, VPN, CCTV', 'Network Security, Firewall, VPN, CCTV'), image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&fit=crop' },
    { title: t('Web Technologies', 'Web Technologies'), subtitle: t('WordPress, E-commerce, SEO, Responsive', 'WordPress, E-commerce, SEO, Responsive'), image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80&fit=crop' },
    { title: t('System Administration', 'System Administration'), subtitle: t('Linux, Shell Scripting, Automation', 'Linux, Shell Scripting, Automation'), image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=80&fit=crop' },
    { title: t('Technical Support', 'Technical Support'), subtitle: t('Windows Server, Microsoft Office, Hardware', 'Windows Server, Microsoft Office, Hardware'), image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=700&q=80&fit=crop' },
  ];

  return (
    <section id="about" className="relative px-4 sm:px-6 py-16 sm:py-20 bg-brut-cream border-y-[4px] border-brut-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] brut-dots pointer-events-none animate-brut-drift" />
      <AnimatedBlobs variant="about" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="code-tag mb-4">
            section/about
          </span>
          <h3 className="brut-heading text-3xl sm:text-4xl md:text-5xl">
            {t('นักพัฒนาผู้หลงใหล', 'PASSIONATE')}
            <br />
            <span className="bg-brut-cyan inline-block px-3 py-1 brut-border brut-shadow-sm -rotate-1 mt-2">
              {t('ในเทคโนโลยี', 'DEVELOPER')}
            </span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="bg-white brut-border brut-shadow-lg p-4 sm:p-7">
            <div className="font-mono-brut text-[10px] sm:text-[11px] text-zinc-500 mb-3 flex items-center justify-between border-b border-dashed border-zinc-300 pb-2 gap-2">
              <span className="truncate">{'// README.md'}</span>
              <span className="text-brut-pink flex-shrink-0">@worrakan</span>
            </div>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              <span className="font-mono-brut text-brut-pink mr-1">{'/**'}</span>
              {t(
                'สวัสดีครับ! ผมวรกันต์ นาไทร นักพัฒนาซอฟต์แวร์และ IT Infrastructure Specialist ที่มีประสบการณ์ในการพัฒนาระบบขนาดใหญ่ ตั้งแต่ Web Application, AI/ML Integration ไปจนถึงการจัดการระบบ Cloud และ Database ผมมีความชื่นชอบในการเรียนรู้เทคโนโลยีใหม่และแก้ไขปัญหาที่ซับซ้อน พร้อมที่จะสร้างสรรค์โซลูชันที่ตอบโจทย์ทุกความต้องการ',
                "Hello! I'm Worrakan Nasai, a Software Developer and IT Infrastructure Specialist with experience in developing large-scale systems, from Web Applications and AI/ML Integration to Cloud Systems and Database management. I have a passion for learning new technologies and solving complex problems, ready to create innovative solutions that meet every need."
              )}
              <span className="font-mono-brut text-brut-pink ml-1">{'*/'}</span>
            </p>
          </div>
        </motion.div>

        <GitHubStats />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 mt-16"
        >
          <span className="code-tag mb-3">
            interface CoreSkills
          </span>
          <h4 className="brut-heading text-2xl sm:text-3xl">
            {t('ทักษะหลักของผม', 'MY CORE SKILLS')}
          </h4>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, rotate: index % 2 === 0 ? -1 : 1 }}
              className={`group relative overflow-hidden brut-border brut-shadow-md ${palette[index % palette.length]}`}
            >
              <div className="relative aspect-video overflow-hidden border-b-[3px] border-brut-ink">
                <Image
                  src={skill.image}
                  alt={skill.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="font-black text-base uppercase leading-tight mb-1">{skill.title}</p>
                <p className="text-xs sm:text-sm font-medium text-zinc-700">{skill.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
