'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const skills = [
  { name: 'Python',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
  { name: 'FastAPI',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg' },
  { name: 'Django',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg', whiteBg: true },
  { name: 'Flask',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg', whiteBg: true },
  { name: 'React',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
  { name: 'Next.js',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg', whiteBg: true },
  { name: 'TypeScript',  image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind',    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Docker',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
  { name: 'MySQL',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', whiteBg: true },
  { name: 'AWS',         image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', whiteBg: true },
  { name: 'Git',         image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
  { name: 'Node.js',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
  { name: 'WordPress',   image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg', whiteBg: true },
  { name: 'Prisma',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg', whiteBg: true },
  { name: 'SQLite',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg' },
];

const UNSPLASH_BG = 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1600&q=80&fit=crop';

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={UNSPLASH_BG}
          alt="Tech workspace"
          fill
          className="object-cover"
          priority={false}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-zinc-950/80" />
        {/* Gradient fade top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">
            {t('เทคโนโลยี', 'Technologies')}
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('เทคโนโลยีที่ใช้', 'Tech Stack')}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            {t(
              'เครื่องมือและเทคโนโลยีที่ใช้ในการพัฒนาโปรเจคจริง',
              'Tools and technologies used across real-world projects'
            )}
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.08, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 rounded-2xl p-4 w-20 sm:w-24 cursor-default transition-colors duration-300"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-colors duration-300 ${'whiteBg' in skill && skill.whiteBg ? 'bg-white/90 p-1.5' : ''}`}>
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-zinc-400 group-hover:text-white text-center leading-tight transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;