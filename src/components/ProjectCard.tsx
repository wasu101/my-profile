'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  demoLink: string;
  githubLink: string;
  image?: string;
  index: number;
}

const ProjectCard = ({ title, description, tech, demoLink, githubLink, image, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Tech logos mapping - ใช้ CDN เหมือน SkillsSection
  const getTechLogo = (techName: string) => {
    const logoMap: { [key: string]: string } = {
      'Python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
      'FastAPI': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
      'Django': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
      'React': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
      'Next.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
      'TypeScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      'JavaScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
      'Node.js': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
      'PostgreSQL': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
      'MongoDB': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
      'OpenCV': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
      'Docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
      'Tailwind CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
      'HTML/CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
      'Machine Learning': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
      'Express': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
      'JWT': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jwt/jwt-original.svg',
      'Redis': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg',
      'Prisma': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg',
      'SQLite': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg',
      'MySQL': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
      'Git': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
      'Flask': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg',
      'WordPress': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg'
    };
    return logoMap[techName] || 'https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg';
  };

  // เช็คว่าควร invert color หรือไม่
  const shouldInvertColor = (techName: string) => {
    const invertList = ['Django', 'Next.js', 'Express', 'Flask', 'WordPress', 'Prisma'];
    return invertList.includes(techName);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      style={{ opacity, scale }}
      className="h-full"
    >
      <Card className="h-full backdrop-blur-lg bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <CodeBracketIcon className="w-16 h-16 text-white/50" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Tech stack preview (floating icons) */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {tech.slice(0, 3).map((t, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
                className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
              >
                <div className="w-5 h-5 relative">
                  <Image
                    src={getTechLogo(t)}
                    alt={t}
                    width={20}
                    height={20}
                    className={`w-full h-full object-contain ${shouldInvertColor(t) ? 'filter invert' : ''}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </motion.div>
            ))}
            {tech.length > 3 && (
              <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <span className="text-xs font-bold text-white">+{tech.length - 3}</span>
              </div>
            )}
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <CardDescription className="text-gray-400 text-sm">{description}</CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* Tech stack with logos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {tech.map((t: string) => (
                <motion.div
                  key={t}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden"
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-white/10 text-gray-200 border-white/20 flex items-center gap-2"
                  >
                    <div className="w-4 h-4 relative">
                      <Image
                        src={getTechLogo(t)}
                        alt={t}
                        width={16}
                        height={16}
                        className={`w-full h-full object-contain ${shouldInvertColor(t) ? 'filter invert' : ''}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium">{t}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-3 pt-0">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all" 
            asChild
          >
            <a href={demoLink} className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              Demo
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300 transition-all" 
            asChild
          >
            <a href={githubLink} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
              <CodeBracketIcon className="w-4 h-4" />
              Code
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;