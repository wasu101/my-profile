'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedBlobs from "@/components/AnimatedBlobs";

const skills = [
  { name: 'Python',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
  { name: 'FastAPI',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg' },
  { name: 'Django',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg' },
  { name: 'Flask',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg' },
  { name: 'React',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
  { name: 'Next.js',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript',  image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind',    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Docker',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
  { name: 'MySQL',       image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
  { name: 'AWS',         image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Git',         image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
  { name: 'Node.js',     image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
  { name: 'WordPress',   image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg' },
  { name: 'Prisma',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg' },
  { name: 'SQLite',      image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg' },
];

const palette = ['bg-brut-yellow', 'bg-brut-cyan', 'bg-brut-pink', 'bg-brut-lime', 'bg-brut-orange', 'bg-brut-violet'];

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative px-4 sm:px-6 py-16 sm:py-20 bg-brut-yellow text-brut-ink border-y-[4px] border-brut-ink overflow-hidden">
      {/* Decorative dots background */}
      <div className="absolute inset-0 opacity-[0.12] brut-dots pointer-events-none animate-brut-drift-rev" />
      <AnimatedBlobs variant="skills" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="code-tag mb-4">
            import &#123; stack &#125; from &apos;./tech&apos;
          </span>
          <h2 className="brut-heading text-3xl sm:text-4xl md:text-5xl">
            {t('เครื่องมือ', 'TOOLS &')}{' '}
            <span className="bg-brut-pink text-brut-ink inline-block px-3 py-1 brut-border brut-shadow-md -rotate-1">
              {t('ที่ใช้', 'TECH')}
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-medium opacity-90 max-w-xl mx-auto">
            {t(
              'เครื่องมือและเทคโนโลยีที่ใช้ในการพัฒนาโปรเจคจริง',
              'Tools and technologies used across real-world projects'
            )}
          </p>

          {/* package.json snippet */}
          <div className="mt-6 max-w-full sm:max-w-md mx-auto bg-brut-ink text-left brut-border brut-shadow-md font-mono-brut text-[10px] sm:text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-brut-yellow/40 text-brut-cream/70">
              <span>package.json</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-brut-pink" />
                <span className="w-2 h-2 rounded-full bg-brut-yellow" />
                <span className="w-2 h-2 rounded-full bg-[#B4FF39]" />
              </span>
            </div>
            <pre className="px-3 py-2 leading-relaxed text-brut-cream whitespace-pre overflow-x-auto">
<span className="text-zinc-500">&#123;</span>{'\n'}  <span className="text-brut-yellow">&quot;dependencies&quot;</span>: <span className="text-zinc-500">&#123;</span>{'\n'}    <span className="text-brut-cream">&quot;experience&quot;</span>: <span className="text-[#B4FF39]">&quot;^5.0&quot;</span>,{'\n'}    <span className="text-brut-cream">&quot;coffee&quot;</span>: <span className="text-[#B4FF39]">&quot;latest&quot;</span>{'\n'}  <span className="text-zinc-500">&#125;</span>{'\n'}<span className="text-zinc-500">&#125;</span>
            </pre>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ y: -6, rotate: 0, scale: 1.05 }}
              className={`group flex flex-col items-center gap-2 brut-border brut-shadow-sm p-3 sm:p-4 w-[5.25rem] sm:w-24 cursor-default ${palette[index % palette.length]}`}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white p-1.5 brut-border-2 flex items-center justify-center">
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase text-brut-ink text-center leading-tight">
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
