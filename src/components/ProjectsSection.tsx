'use client';
import ProjectCard from './ProjectCard';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Face Recognition System",
      description: t("ระบบจดจำใบหน้าสำหรับการลงเวลาและรักษาความปลอดภัย", "Face recognition system for time attendance and security"),
      tech: ["Python", "OpenCV", "Machine Learning", "FastAPI"],
      demoLink: "/demo/face-recognition",
      githubLink: "https://github.com/wasu101/Face_recognition",
      image: "/images/projects/face-recognition.jpg"
    },
    {
      title: "MKS Jewelry Web Application",
      description: t("พัฒนาเว็บแอปพลิเคชันสำหรับบริษัท MKS Jewelry ด้วย FastAPI และ Django", "Developed web application for MKS Jewelry using FastAPI and Django"),
      tech: ["Python", "FastAPI", "Django", "HTML/CSS", "PostgreSQL"],
      demoLink: "/demo/mks-jewelry",
      githubLink: "https://github.com/wasu101/mks-jewelry",
      image: "/images/projects/mks-jewelry.jpg"
    },
    {
      title: "IT Infrastructure Management",
      description: t("ระบบจัดการและดูแล Server, CCTV, Fingerprint ภายในองค์กร", "System for managing Server, CCTV, Fingerprint within organization"),
      tech: ["Server Management", "Network", "Database", "Docker"],
      demoLink: "/demo/infrastructure-management",
      githubLink: "https://github.com/wasu101/infrastructure-management",
      image: "/images/projects/infrastructure.jpg"
    },
    {
      title: "Admin Dashboard System",
      description: t("ระบบจัดการผู้ดูแลระบบแบบครบวงจร พร้อมการจัดการผู้ใช้และสิทธิ์", "Complete admin management system with user management and permissions"),
      tech: ["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      demoLink: "/demo/admin-dashboard",
      githubLink: "https://github.com/wasu101/admin-dashboard",
      image: "/images/projects/admin-dashboard.jpg"
    },
    {
      title: "Authentication System",
      description: t("ระบบล็อกอินและการจัดการผู้ใช้แบบปลอดภัย พร้อม JWT และ OAuth", "Secure login and user management system with JWT and OAuth integration"),
      tech: ["Node.js", "Express", "JWT", "OAuth", "MongoDB", "Redis"],
      demoLink: "/demo/auth-system",
      githubLink: "https://github.com/wasu101/auth-system",
      image: "/images/projects/auth-system.jpg"
    },
    {
      title: "E-Commerce Platform",
      description: t("แพลตฟอร์มอีคอมเมิร์ซครบวงจร พร้อมระบบชำระเงินและจัดการสินค้า", "Complete e-commerce platform with payment system and inventory management"),
      tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
      demoLink: "/demo/ecommerce",
      githubLink: "https://github.com/wasu101/ecommerce-platform",
      image: "/images/projects/ecommerce.jpg"
    }
  ];

  return (
    <section id="projects" className="px-6 py-20 relative">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-flex items-center gap-3">
            <CodeBracketSquareIcon className="w-8 h-8 text-purple-400" />
            {t('ผลงานที่โดดเด่น', 'Featured Projects')}
          </h3>
          <p className="text-gray-400 mt-2">{t('โครงการและระบบที่ได้พัฒนาขึ้น', 'Projects and systems that have been developed')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-white mb-4">
              {t('สนใจความร่วมมือ?', 'Interested in collaboration?')}
            </h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t(
                'หากคุณมีโปรเจคที่น่าสนใจหรือต้องการให้ช่วยพัฒนาระบบ อย่าลังเลที่จะติดต่อมา',
                'If you have an interesting project or need help developing a system, feel free to contact me'
              )}
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('ติดต่อเลย', 'Contact Now')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;