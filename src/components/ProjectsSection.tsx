'use client';
import ProjectCard from './ProjectCard';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: "MKS Support System",
      description: t("ระบบ Support และบริการลูกค้าสำหรับ MKS พร้อมการจัดการคำร้องและติดตาม", "MKS Support and customer service system with request management and tracking"),
      tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "shadcn/ui", "Docker", "Tailwind CSS"],
      demoLink: "https://mks.support"
    },
    {
      title: "Brandex Shop E-Commerce",
      description: t("แพลตฟอร์มอีคอมเมิร์ซสำหรับ Brandex พร้อมระบบการขายและจัดการสินค้า", "E-commerce platform for Brandex with sales system and inventory management"),
      tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "shadcn/ui", "Docker", "Tailwind CSS"],
      demoLink: "https://shop.brandex.co.th"
    },
    {
      title: "Pages Thai Website",
      description: t("เว็บไซต์สำหรับบริการ Pages Thai พร้อมระบบจัดการเนื้อหาและผู้ใช้", "Website for Pages Thai service with content management and user system"),
      tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Material-UI", "Docker", "Tailwind CSS"],
      demoLink: "https://pagesthai.com"
    },
    {
      title: "Brandex CRM System",
      description: t("ระบบ CRM สำหรับจัดการลูกค้าและการขายของ Brandex อย่างครบวงจร", "Complete CRM system for Brandex customer and sales management"),
      tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "shadcn/ui", "Docker", "Tailwind CSS"],
      demoLink: "https://crm.brandex.co.th"
    },
    {
      title: "MTNet Service Website",
      description: t("เว็บไซต์บริการ MTNet Service พร้อมข้อมูลบริการและระบบจัดการ", "MTNet Service website with service information and management system"),
      tech: ["Next.js", "AWS Amplify", "TypeScript", "Tailwind CSS"],
      demoLink: "https://www.mtnetservice.com"
    },
    {
      title: "PP Electricity Corporate Website",
      description: t("เว็บไซต์องค์กรสำหรับ PP Electricity พร้อมข้อมูลบริษัทและบริการ", "Corporate website for PP Electricity with company information and services"),
      tech: ["Next.js", "AWS Amplify", "Amazon S3", "AWS Cognito", "Tailwind CSS"],
      demoLink: "https://pp-electricity.com"
    },
    {
      title: "PP Electricity Mail System",
      description: t("ระบบจัดการอีเมลสำหรับ PP Electricity พร้อม Webmail และการจัดการบัญชี", "Email management system for PP Electricity with Webmail and account management"),
      tech: ["Mailu", "Amazon EC2", "Docker"],
      demoLink: "https://mail.pp-electricity.com"
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