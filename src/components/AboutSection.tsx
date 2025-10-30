'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  CodeBracketIcon, 
  ServerIcon, 
  GlobeAltIcon,
  ComputerDesktopIcon,
  CloudIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CommandLineIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const AboutSection = () => {
  const { t } = useLanguage();

  const skills = [
    { 
      icon: ServerIcon, 
      text: t('Infrastructure & Network: Server Management, LAN/WAN, IoT Implementation', 'Infrastructure & Network: Server Management, LAN/WAN, IoT Implementation'),
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      icon: CodeBracketIcon, 
      text: t('Full-Stack Development: React, Next.js, Node.js, Python, FastAPI, Django', 'Full-Stack Development: React, Next.js, Node.js, Python, FastAPI, Django'),
      color: 'from-indigo-400 to-purple-400'
    },
    { 
      icon: CloudIcon, 
      text: t('Cloud & DevOps: AWS, Google Cloud, Docker, Kubernetes, CI/CD Pipeline', 'Cloud & DevOps: AWS, Google Cloud, Docker, Kubernetes, CI/CD Pipeline'),
      color: 'from-orange-400 to-red-400'
    },
    { 
      icon: CircleStackIcon, 
      text: t('Database Expertise: MySQL, PostgreSQL, MongoDB, Redis, Database Optimization', 'Database Expertise: MySQL, PostgreSQL, MongoDB, Redis, Database Optimization'),
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      icon: CpuChipIcon, 
      text: t('AI/ML Integration: Face Recognition, Computer Vision, Machine Learning Models', 'AI/ML Integration: Face Recognition, Computer Vision, Machine Learning Models'),
      color: 'from-pink-400 to-rose-400'
    },
    { 
      icon: ShieldCheckIcon, 
      text: t('Cybersecurity: Network Security, Firewall Configuration, VPN Setup, CCTV Systems', 'Cybersecurity: Network Security, Firewall Configuration, VPN Setup, CCTV Systems'),
      color: 'from-red-400 to-pink-400'
    },
    { 
      icon: GlobeAltIcon, 
      text: t('Web Technologies: WordPress, E-commerce, SEO Optimization, Responsive Design', 'Web Technologies: WordPress, E-commerce, SEO Optimization, Responsive Design'),
      color: 'from-purple-400 to-pink-400'
    },
    { 
      icon: CommandLineIcon, 
      text: t('System Administration: Linux, Shell Scripting, Automation, Performance Tuning', 'System Administration: Linux, Shell Scripting, Automation, Performance Tuning'),
      color: 'from-green-400 to-teal-400'
    },
    { 
      icon: ComputerDesktopIcon, 
      text: t('Technical Support: Windows Server, Microsoft Office, Hardware Troubleshooting', 'Technical Support: Windows Server, Microsoft Office, Hardware Troubleshooting'),
      color: 'from-teal-400 to-blue-400'
    }
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
            <SparklesIcon className="w-8 h-8 text-purple-400" />
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
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {t(
                  'สวัสดีครับ! ผมวรกันต์ นาไทร นักพัฒนาซอฟต์แวร์และ IT Infrastructure Specialist ที่มีประสบการณ์ในการพัฒนาระบบขนาดใหญ่ ตั้งแต่ Web Application, AI/ML Integration ไปจนถึงการจัดการระบบ Cloud และ Database ผมมีความชื่นชอบในการเรียนรู้เทคโนโลยีใหม่และแก้ไขปัญหาที่ซับซ้อน พร้อมที่จะสร้างสรรค์โซลูชันที่ตอบโจทย์ทุกความต้องการ',
                  'Hello! I\'m Worrakan Nasai, a Software Developer and IT Infrastructure Specialist with experience in developing large-scale systems, from Web Applications and AI/ML Integration to Cloud Systems and Database management. I have a passion for learning new technologies and solving complex problems, ready to create innovative solutions that meet every need.'
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Skills Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h4 className="text-3xl font-semibold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
              {t('ความเชี่ยวชาญ', 'Core Expertise')}
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
            </h4>
            <p className="text-gray-400">{t('ทักษะและความเชี่ยวชาญหลักของผม', 'My Core Skills and Expertise')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10, 
                    rotateY: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer perspective-1000"
                >
                  <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20 overflow-hidden relative">
                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Card corner decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-500/20 to-transparent" />
                    
                    <CardContent className="p-6 h-full flex flex-col relative z-10">
                      {/* Icon section */}
                      <div className="flex justify-center mb-4">
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-r ${skill.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        </motion.div>
                      </div>
                      
                      {/* Content section */}
                      <div className="flex-1 text-center">
                        <p className="text-gray-300 group-hover:text-gray-100 transition-colors text-sm leading-relaxed">
                          {skill.text}
                        </p>
                      </div>
                      
                      {/* Bottom accent line */}
                      <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${skill.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;