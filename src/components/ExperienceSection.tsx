'use client';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceSection = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      company: "BRANDEX DIRECTORY CO.,LTD.",
      position: "Web Developer",
      period: t('พฤษภาคม 2568 - ปัจจุบัน', 'May 2025 - Present'),
      current: true,
      details: [
        t('ออกแบบและพัฒนาเว็บไซต์ตามที่ได้รับมอบหมาย', 'Design and develop websites as assigned'),
        t('พัฒนา Frontend ด้วย Next.js และ Backend ด้วย FastAPI', 'Develop Frontend with Next.js and Backend with FastAPI'),
        t('จัดการ Container ด้วย Docker สำหรับ Development และ Production', 'Manage containers with Docker for Development and Production'),
        t('Deploy และดูแล Project บน Server', 'Deploy and maintain projects on servers'),
      ],
    },
    {
      company: "MKS jewelry international Co., Ltd.",
      position: "IT Officer",
      period: t('เมษายน 2567 - พฤษภาคม 2568', 'April 2024 - May 2025'),
      details: [
        t('พัฒนา Web Application ด้วย FastAPI, Django และ HTML', 'Develop Web Applications with FastAPI, Django and HTML'),
        t('จัดทำรายงานประจำเดือน/ปี ของ Server', 'Create monthly/yearly Server reports'),
        t('ดูแล MT Server และ Support User', 'Maintain MT Server and Support Users'),
        t('ติดต่อ Vendors และดูแลระบบ CCTV, Fingerprint', 'Contact Vendors and maintain CCTV, Fingerprint systems'),
      ],
    },
    {
      company: t('จันวาณิชย์ จำกัด', 'Chanwanich Co., Ltd.'),
      position: "IT Support",
      period: "",
      details: [
        t('ดูแลระบบคอมพิวเตอร์และ Server', 'Maintain computer systems and Server'),
        t('แก้ไขปัญหาด้านคอมพิวเตอร์และ Support User', 'Troubleshoot computer issues and Support Users'),
        t('Support เครื่อง Auto Channel ที่สนามบินสุวรรณภูมิ', 'Support Auto Channel machines at Suvarnabhumi Airport'),
      ],
    },
    {
      company: "ITCITY Co., Ltd.",
      position: t('ช่างเทคนิค', 'Technician'),
      period: t('กรกฎาคม 2563 - มิถุนายน 2565', 'July 2020 - June 2022'),
      details: [
        t('ดูแลบริการหลังการขาย', 'After-sales service'),
        t('ประกอบและตรวจเช็คคอมพิวเตอร์', 'Assemble and check computers'),
        t('ให้คำแนะนำลูกค้าด้าน Hardware และ Software', 'Advise customers on Hardware and Software'),
      ],
    },
  ];

  return (
    <section id="experience" className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">
            {t('ประสบการณ์', 'Experience')}
          </p>
          <h2 className="text-3xl font-bold text-white">
            {t('ประสบการณ์การทำงาน', 'Work Experience')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                  exp.current
                    ? 'border-cyan-500 bg-cyan-500/20'
                    : 'border-white/20 bg-zinc-950'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-cyan-400' : 'bg-white/30'}`} />
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{exp.position}</h3>
                      <p className="text-cyan-400 text-sm">{exp.company}</p>
                    </div>
                    {exp.period && (
                      <span className="text-zinc-500 text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full shrink-0">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                        <span className="text-cyan-500 mt-0.5 shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
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
