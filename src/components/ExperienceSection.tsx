'use client';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const experiences = [
    {
    company: "BRANDEX DIRECTORY CO.,LTD.",
    position: "Web Developer",
    period: t('พฤษภาคม 2568 - ปัจจุบัน', 'May 2025 - Present'),
    details: [
        t('ออกแบบและพัฒนาเว็บไซต์ตามที่ได้รับมอบหมาย', 'Design and develop websites as assigned'),
        t('พัฒนา Frontend ด้วย Next.js และ Backend ด้วย FastAPI', 'Develop Frontend with Next.js and Backend with FastAPI'),
        t('จัดการ Container ด้วย Docker สำหรับ Development และ Production', 'Manage containers with Docker for Development and Production'),
        t('Deploy และดูแล Project บน Server', 'Deploy and maintain projects on servers')
    ]
    },
    {
      company: "MKS jewelry international Co., Ltd.",
      position: "IT Officer",
      period: t('เมษายน 2567 - พฤษภาคม 2568', 'April 2024 - May 2025'),
      details: [
        t('พัฒนา Web Application ด้วย FastAPI, Django และ HTML', 'Develop Web Applications with FastAPI, Django and HTML'),
        t('จัดทำรายงานประจำเดือน/ปี ของ Server', 'Create monthly/yearly Server reports'),
        t('ดูแล MT Server และ Support User', 'Maintain MT Server and Support Users'),
        t('ติดต่อ Vendors และดูแลระบบ CCTV, Fingerprint', 'Contact Vendors and maintain CCTV, Fingerprint systems')
      ]
    },
    {
      company: t('จันวาณิชย์ จำกัด', 'Chanwanich Co., Ltd.'),
      position: "IT Support",
      details: [
        t('ดูแลระบบคอมพิวเตอร์และ Server', 'Maintain computer systems and Server'),
        t('แก้ไขปัญหาด้านคอมพิวเตอร์และ Support User', 'Troubleshoot computer issues and Support Users'),
        t('Support เครื่อง Auto Channel ที่สนามบินสุวรรณภูมิ', 'Support Auto Channel machines at Suvarnabhumi Airport')
      ]
    },
    {
      company: "ITCITY Co., Ltd.",
      position: t('ช่างเทคนิค', 'Technician'),
      period: t('กรกฎาคม 2563 - มิถุนายน 2565', 'July 2020 - June 2022'),
      details: [
        t('ดูแลบริการหลังการขาย', 'After-sales service'),
        t('ประกอบและตรวจเช็คคอมพิวเตอร์', 'Assemble and check computers'),
        t('ให้คำแนะนำลูกค้าด้าน Hardware และ Software', 'Advise customers on Hardware and Software')
      ]
    }
  ];

  // Create transforms individually at the top level
  // Experience 0
  const y0 = useTransform(scrollYProgress, [0, 0.125, 0.25], ["50vh", "0vh", "-50vh"]);
  const scale0 = useTransform(scrollYProgress, [0, 0.125, 0.25], [0.8, 1, 0.8]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.025, 0.225, 0.25], [0, 1, 1, 0]);

  // Experience 1
  const y1 = useTransform(scrollYProgress, [0.25, 0.375, 0.5], ["50vh", "0vh", "-50vh"]);
  const scale1 = useTransform(scrollYProgress, [0.25, 0.375, 0.5], [0.8, 1, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0.25, 0.275, 0.475, 0.5], [0, 1, 1, 0]);

  // Experience 2
  const y2 = useTransform(scrollYProgress, [0.5, 0.625, 0.75], ["50vh", "0vh", "-50vh"]);
  const scale2 = useTransform(scrollYProgress, [0.5, 0.625, 0.75], [0.8, 1, 0.8]);
  const opacity2 = useTransform(scrollYProgress, [0.5, 0.525, 0.725, 0.75], [0, 1, 1, 0]);

  // Experience 3
  const y3 = useTransform(scrollYProgress, [0.75, 0.875, 1], ["50vh", "0vh", "-50vh"]);
  const scale3 = useTransform(scrollYProgress, [0.75, 0.875, 1], [0.8, 1, 0.8]);
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.775, 0.975, 1], [0, 1, 1, 0]);

  // Group transforms for easier access
  const transforms = [
    { y: y0, scale: scale0, opacity: opacity0 },
    { y: y1, scale: scale1, opacity: opacity1 },
    { y: y2, scale: scale2, opacity: opacity2 },
    { y: y3, scale: scale3, opacity: opacity3 }
  ];

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="relative"
      style={{ height: `${(experiences.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <BriefcaseIcon className="w-8 h-8 mt-32 text-purple-400" />
          <h3 className="text-3xl mt-32  font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('ประสบการณ์การทำงาน', 'Work Experience')}
          </h3>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto px-6">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-[70vh] bg-gradient-to-b from-purple-500/20 via-purple-500/50 to-purple-500/20"></div>
          
          {/* Progress indicator */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-pink-500"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "70vh"]),
              top: 0
            }}
          />

          {/* Experience cards stack */}
          <div className="relative h-[70vh]">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  y: transforms[index].y,
                  scale: transforms[index].scale,
                  opacity: transforms[index].opacity,
                  zIndex: experiences.length - index
                }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black z-20"
                  style={{ scale: transforms[index].scale }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Card with alternating sides */}
                <div className={`w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <motion.div 
                    className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="hidden md:block">
                            <motion.div 
                              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                              style={{ scale: transforms[index].scale }}
                            >
                              <span className="text-white font-bold text-lg">{index + 1}</span>
                            </motion.div>
                          </div>
                          <div className="flex-1">
                            <div className="mb-4">
                              <h4 className="text-xl md:text-2xl font-bold text-white">{exp.position}</h4>
                              <p className="text-purple-400 font-semibold">{exp.company}</p>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                <p className="text-gray-400">{exp.period}</p>
                              </div>
                            </div>
                            <ul className="space-y-1 text-gray-300 text-sm">
                              {exp.details.map((detail, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  <span className="text-purple-400 mt-0.5">▸</span>
                                  <span>{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;