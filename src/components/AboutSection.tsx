'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  UserIcon, 
  CalendarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CodeBracketIcon, 
  ServerIcon, 
  GlobeAltIcon,
  ComputerDesktopIcon,
  RocketLaunchIcon,
  CloudIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CommandLineIcon,
  CubeIcon,
  BriefcaseIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

const AboutSection = () => {
  const { t } = useLanguage();

  const personalInfo = [
    { 
      icon: UserIcon, 
      label: t('ชื่อ:', 'Name:'), 
      value: t('วรกันต์ นาไทร', 'Worrakan Nasai') 
    },
    { 
      icon: CalendarIcon, 
      label: t('วันเกิด:', 'Birthday:'), 
      value: t('26 ตุลาคม 2541', 'October 26, 1998') 
    },
    { 
      icon: MapPinIcon, 
      label: t('ที่อยู่:', 'Address:'), 
      value: t('89/68 ม.8 คาซ่าซิตี้บางนา', '89/68 M.8 Casa City Bangna'),
      subValue: t('ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540', 'Bangkaeo, Bangplee, Samut Prakan 10540')
    },
    { 
      icon: PhoneIcon, 
      label: t('เบอร์โทร:', 'Phone:'), 
      value: '099-612-5454' 
    },
    { 
      icon: EnvelopeIcon, 
      label: t('อีเมล:', 'Email:'), 
      value: 'wasu550.jak2541@gmail.com' 
    }
  ];

  const skills = [
    { 
      icon: ServerIcon, 
      text: 'IT Infrastructure, Database, LAN connection, IOT',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      icon: ComputerDesktopIcon, 
      text: t('ติดตั้ง Windows, Microsoft Office, Software Troubleshooting', 'Windows, Microsoft Office Installation & Software Troubleshooting'),
      color: 'from-green-400 to-emerald-400'
    },
    { 
      icon: GlobeAltIcon, 
      text: t('ออกแบบและพัฒนาเว็บไซต์ WordPress, E-commerce, SEO', 'WordPress Website Design, E-commerce Development & SEO'),
      color: 'from-purple-400 to-pink-400'
    },
    { 
      icon: CloudIcon, 
      text: 'Cloud Services: AWS, Google Cloud, Digital Ocean',
      color: 'from-orange-400 to-red-400'
    },
    { 
      icon: CodeBracketIcon, 
      text: 'Face Recognition, AI/ML Integration & Web Applications',
      color: 'from-indigo-400 to-purple-400'
    },
    { 
      icon: CircleStackIcon, 
      text: 'Database Management: MySQL, PostgreSQL, MongoDB, Redis',
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      icon: ShieldCheckIcon, 
      text: t('ความปลอดภัยเครือข่าย, Firewall Configuration, VPN Setup', 'Network Security, Firewall Configuration & VPN Setup'),
      color: 'from-red-400 to-pink-400'
    },
    { 
      icon: CubeIcon, 
      text: 'Container & Orchestration: Docker, Kubernetes, CI/CD Pipeline',
      color: 'from-teal-400 to-blue-400'
    },
    { 
      icon: CommandLineIcon, 
      text: 'Linux Administration, Shell Scripting, Automation',
      color: 'from-green-400 to-teal-400'
    },
    { 
      icon: CpuChipIcon, 
      text: t('พิมพ์ดีด: ไทย 26 คำ/นาที, อังกฤษ 20 คำ/นาที', 'Typing: Thai 26 wpm, English 20 wpm'),
      color: 'from-gray-400 to-gray-600'
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
            <UserIcon className="w-8 h-8 text-purple-400" />
            {t('เกี่ยวกับฉัน', 'About Me')}
          </h3>
          <p className="text-gray-400 mt-2">{t('ข้อมูลส่วนตัวและทักษะความสามารถ', 'Personal Information & Skills')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all h-full group hover:border-purple-500/50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
                  {t('ข้อมูลส่วนตัว', 'Personal Information')}
                </h4>
                <div className="space-y-4">
                  {personalInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 group/item hover:translate-x-2 transition-all"
                      >
                        <motion.div 
                          className="mt-1 p-2 bg-purple-500/10 rounded-lg group-hover/item:bg-purple-500/20 transition-all"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-5 h-5 text-purple-400" />
                        </motion.div>
                        <div className="flex-1">
                          <span className="text-gray-400 text-sm">{info.label}</span>
                          <p className="text-gray-200 font-medium">{info.value}</p>
                          {info.subValue && (
                            <p className="text-gray-300 text-sm">{info.subValue}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all h-full group hover:border-purple-500/50">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
                  {t('ความสามารถพิเศษ', 'Special Skills')}
                </h4>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 group/skill hover:translate-x-2 transition-all p-2 rounded-lg hover:bg-white/5"
                        >
                          <motion.div 
                            className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>
                          <p className="text-gray-300 group-hover/skill:text-gray-100 transition-colors text-sm flex-1">
                            {skill.text}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Career Goals Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-white/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all group">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <RocketLaunchIcon className="w-6 h-6 text-purple-400" />
                </motion.div>
                <h4 className="text-2xl font-semibold text-white">
                  {t('เป้าหมายอาชีพ', 'Career Goals')}
                </h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t(
                  'มองหาตำแหน่ง IT Specialist, IT Infrastructure, Web Developer หรือ Full Stack Developer ที่สามารถใช้ทักษะด้าน IT Infrastructure, Network Administration, Cloud Services, Python, FastAPI, Django และเทคโนโลยีเว็บสมัยใหม่ พร้อมพัฒนาตัวเองและองค์กรไปพร้อมกัน',
                  'Seeking IT Specialist, IT Infrastructure, Web Developer, or Full Stack Developer position where I can utilize my skills in IT Infrastructure, Network Administration, Cloud Services, Python, FastAPI, Django, and modern web technologies. Ready to grow with the organization.'
                )}
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                  <div>
                    <span className="text-gray-400 text-sm block">{t('เงินเดือนที่คาดหวัง', 'Expected Salary')}</span>
                    <span className="text-green-400 font-bold">
                      {t('30,000-50,000 บาท', '30,000-50,000 THB')}
                    </span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <PhoneIcon className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="text-gray-400 text-sm block">{t('ติดต่อ', 'Contact')}</span>
                    <span className="text-purple-400 font-semibold">099-612-5454</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BriefcaseIcon className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-gray-400 text-sm block">{t('พร้อมเริ่มงาน', 'Available')}</span>
                    <span className="text-blue-400 font-semibold">{t('ทันที', 'Immediately')}</span>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;