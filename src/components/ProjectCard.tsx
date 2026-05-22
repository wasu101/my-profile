'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  demoLink: string;
  image?: string;
  index: number;
}

const techColors = ['bg-brut-yellow', 'bg-brut-cyan', 'bg-brut-pink', 'bg-brut-lime', 'bg-brut-orange', 'bg-brut-violet'];
const cardBg     = ['bg-brut-yellow', 'bg-brut-cyan', 'bg-brut-pink', 'bg-brut-lime', 'bg-brut-orange', 'bg-brut-violet'];

const getTechLogo = (techName: string): string | null => {
  const logoMap: Record<string, string> = {
    'Python': 'python/python-original.svg',
    'FastAPI': 'fastapi/fastapi-original.svg',
    'Django': 'django/django-plain.svg',
    'React': 'react/react-original.svg',
    'Next.js': 'nextjs/nextjs-original.svg',
    'TypeScript': 'typescript/typescript-original.svg',
    'JavaScript': 'javascript/javascript-original.svg',
    'Node.js': 'nodejs/nodejs-original.svg',
    'PostgreSQL': 'postgresql/postgresql-original.svg',
    'MySQL': 'mysql/mysql-original.svg',
    'MongoDB': 'mongodb/mongodb-original.svg',
    'OpenCV': 'opencv/opencv-original.svg',
    'Docker': 'docker/docker-original.svg',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
    'Prisma': 'prisma/prisma-original.svg',
    'WordPress': 'wordpress/wordpress-original.svg',
    'Linux': 'linux/linux-original.svg',
    'SQLite': 'sqlite/sqlite-original.svg',
    'Git': 'git/git-original.svg',
    'Flask': 'flask/flask-original.svg',
    'Material-UI': 'materialui/materialui-original.svg',
    'AWS Amplify': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Amazon S3': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'AWS Cognito': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Amazon EC2': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Mailu': 'docker/docker-original.svg',
  };
  const slug = logoMap[techName];
  return slug ? `https://raw.githubusercontent.com/devicons/devicon/master/icons/${slug}` : null;
};

const ProjectCard = ({ title, description, tech, demoLink, image, index }: ProjectCardProps) => {
  const bg = cardBg[index % cardBg.length];
  return (
    <motion.div
      whileHover={{ y: -5, rotate: index % 2 === 0 ? -1 : 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="h-full"
    >
      <div className={`h-full flex flex-col brut-border brut-shadow-md ${bg}`}>
        {/* Image / placeholder */}
        <div className="relative h-44 sm:h-48 overflow-hidden border-b-[3px] border-brut-ink bg-white">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" />
          ) : (
            <div className="h-full w-full brut-stripes-thin flex items-center justify-center bg-white">
              <div className="bg-brut-ink text-brut-cream p-3 brut-border-2">
                <CodeBracketIcon className="w-10 h-10" />
              </div>
            </div>
          )}
          {/* Tech icons floating */}
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            {tech.slice(0, 3).map((techName) => {
              const logo = getTechLogo(techName);
              if (!logo) return null;
              return (
                <div key={techName} className="w-8 h-8 bg-white brut-border-2 flex items-center justify-center">
                  <Image src={logo} alt={techName} width={20} height={20} className="object-contain" />
                </div>
              );
            })}
            {tech.length > 3 && (
              <div className="w-8 h-8 bg-brut-ink text-brut-cream brut-border-2 flex items-center justify-center text-[10px] font-black">
                +{tech.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="bg-white flex-1 p-4 sm:p-5 flex flex-col">
          {/* commit hash header */}
          <div className="flex items-center justify-between font-mono-brut text-[10px] text-zinc-500 mb-2 pb-1.5 border-b border-dashed border-zinc-300">
            <span><span className="text-brut-pink">commit</span> {Math.abs((title.length * 9277 + index * 31337) % 0xfffffff).toString(16).padStart(7, '0').slice(0, 7)}</span>
            <span>#{String(index + 1).padStart(3, '0')}</span>
          </div>
          <h3 className="font-black uppercase text-lg leading-tight mb-2">{title}</h3>
          <p className="text-sm text-zinc-700 font-medium mb-4 flex-1">{description}</p>

          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
            {tech.slice(0, 5).map((t, i) => (
              <span key={t} className={`font-mono-brut text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 brut-border-2 lowercase ${techColors[i % techColors.length]}`}>
                {t}
              </span>
            ))}
          </div>

          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brut-ink text-brut-yellow font-mono-brut font-bold text-sm px-4 py-2 brut-border-2 brut-shadow-sm brut-hover"
          >
            <EyeIcon className="w-4 h-4" />
            <span className="text-brut-pink">$</span> open --live
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
