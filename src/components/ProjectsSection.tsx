'use client';
import ProjectCard from './ProjectCard';
import { motion, useMotionValue, animate } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CodeBracketSquareIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useRef, useEffect } from "react";

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
    },
    {
      title: "Siam Supercar Rental",
      description: t("แพลตฟอร์มเช่าซูเปอร์คาร์หรูระดับ VIP ในกรุงเทพฯ พร้อมระบบจองออนไลน์และกองยาน 50+ คัน", "Premium supercar rental platform in Bangkok with online booking system and 50+ luxury fleet"),
      tech: ["Lovable", "Supabase", "TypeScript", "Tailwind CSS"],
      demoLink: "https://siamsupercarrental.com"
    },
    {
      title: "VIN Projects",
      description: t("เว็บไซต์โปรเจคและพอร์ตโฟลิโอสำหรับนำเสนอผลงานและบริการอย่างเป็นทางการ", "Project portfolio and service showcase website with modern design and content management"),
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      demoLink: "https://vinprojects.org"
    },
    {
      title: "Homeward Stay",
      description: t("แพลตฟอร์มคัดสรรที่พักในเขาใหญ่ พร้อมระบบค้นหา แผนที่อินเตอร์แอคทีฟ และข้อมูลสถานที่ท่องเที่ยว", "Curated villa booking platform for Khao Yai with interactive map, search system and attraction guides"),
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "OpenStreetMap"],
      demoLink: "https://homewardstay.com"
    },
    {
      title: "BUHOWEX Exhibition 2026",
      description: t("แพลตฟอร์มงานแสดงสินค้าอุตสาหกรรม Hospitality ระดับนานาชาติ พร้อมระบบลงทะเบียนและจับคู่ธุรกิจ", "International hospitality industry exhibition platform with exhibitor registration and business matching system"),
      tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Tailwind CSS", "Docker"],
      demoLink: "https://buhowex.com"
    }
  ];

  const total = projects.length;
  const CLONES = 3; // number of clones on each side
  const cloned = [...projects.slice(-CLONES), ...projects, ...projects.slice(0, CLONES)];

  // virtualIdx: real index in cloned array. Starts at CLONES (first real item).
  const virtualIdxRef = useRef(CLONES);
  const [realIdx, setRealIdx] = useState(0); // 0-based real index for dots
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const isMoving = useRef(false);

  // Measure card width after mount
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const card = trackRef.current.children[0] as HTMLElement;
      if (!card) return;
      const gap = 24;
      cardWidthRef.current = card.getBoundingClientRect().width + gap;
      // Set initial position (skip CLONES clones)
      x.set(-CLONES * cardWidthRef.current);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [x]);

  const goTo = useCallback((vIdx: number, instant = false) => {
    const cw = cardWidthRef.current;
    if (!cw) return;
    const targetX = -vIdx * cw;
    if (instant) {
      x.set(targetX);
    } else {
      isMoving.current = true;
      animate(x, targetX, {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => {
          // After animation ends, if we're in clone territory → silent jump to real item
          let newV = vIdx;
          if (vIdx >= CLONES + total) newV = CLONES + ((vIdx - CLONES) % total);
          else if (vIdx < CLONES) newV = CLONES + total - 1 - (CLONES - 1 - vIdx);
          if (newV !== vIdx) {
            x.set(-newV * cw);
            virtualIdxRef.current = newV;
          }
          isMoving.current = false;
        },
      });
    }
    virtualIdxRef.current = vIdx;
    setRealIdx(((vIdx - CLONES) % total + total) % total);
  }, [total, x]);

  const next = useCallback(() => {
    if (isMoving.current) return;
    goTo(virtualIdxRef.current + 1);
  }, [goTo]);

  const prev = useCallback(() => {
    if (isMoving.current) return;
    goTo(virtualIdxRef.current - 1);
  }, [goTo]);

  const jumpTo = useCallback((real: number) => {
    goTo(CLONES + real);
  }, [goTo]);

  return (
    <section id="projects" className="px-6 py-20 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">
            {t('ผลงาน', 'Projects')}
          </p>
          <h3 className="text-3xl font-bold text-white inline-flex items-center gap-3">
            <CodeBracketSquareIcon className="w-8 h-8 text-cyan-400" />
            {t('ผลงานที่โดดเด่น', 'Featured Projects')}
          </h3>
          <p className="text-zinc-400 mt-2 text-sm">{t('โครงการและระบบที่ได้พัฒนาขึ้น', 'Projects and systems that have been developed')}</p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Track — all cards in one row */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 will-change-transform"
          >
            {cloned.map((project, i) => {
              const realI = ((i - CLONES) % total + total) % total;
              return (
                <div
                  key={`${i}-${project.title}`}
                  className="flex-shrink-0 w-[calc(33.333vw-4.5rem)] max-md:w-[calc(50vw-3rem)] max-sm:w-[calc(100vw-3rem)]"
                  style={{ maxWidth: 420 }}
                >
                  <ProjectCard {...project} index={realI} />
                </div>
              );
            })}
          </motion.div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-800 flex items-center justify-center text-white transition-all"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-900/90 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-800 flex items-center justify-center text-white transition-all"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === realIdx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all"
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

