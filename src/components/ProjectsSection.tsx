'use client';
import ProjectCard from './ProjectCard';
import { motion, useMotionValue, animate } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useCallback, useRef, useEffect } from "react";
import AnimatedBlobs from "@/components/AnimatedBlobs";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    { title: "MKS Support System", description: t("ระบบ Support และบริการลูกค้าสำหรับ MKS พร้อมการจัดการคำร้องและติดตาม", "MKS Support and customer service system with request management and tracking"), tech: ["Next.js","FastAPI","PostgreSQL","TypeScript","Tailwind CSS"], demoLink: "https://mks.support" },
    { title: "Brandex Shop E-Commerce", description: t("แพลตฟอร์มอีคอมเมิร์ซสำหรับ Brandex พร้อมระบบการขายและจัดการสินค้า", "E-commerce platform for Brandex with sales system and inventory management"), tech: ["Next.js","FastAPI","PostgreSQL","TypeScript","Tailwind CSS","Docker"], demoLink: "https://shop.brandex.co.th" },
    { title: "Pages Thai Website", description: t("เว็บไซต์สำหรับบริการ Pages Thai พร้อมระบบจัดการเนื้อหาและผู้ใช้", "Website for Pages Thai service with content management and user system"), tech: ["Next.js","FastAPI","PostgreSQL","TypeScript","Material-UI"], demoLink: "https://pagesthai.com" },
    { title: "Brandex CRM System", description: t("ระบบ CRM สำหรับจัดการลูกค้าและการขายของ Brandex อย่างครบวงจร", "Complete CRM system for Brandex customer and sales management"), tech: ["Next.js","FastAPI","PostgreSQL","TypeScript","Docker"], demoLink: "https://crm.brandex.co.th" },
    { title: "MTNet Service Website", description: t("เว็บไซต์บริการ MTNet Service พร้อมข้อมูลบริการและระบบจัดการ", "MTNet Service website with service information and management system"), tech: ["Next.js","AWS Amplify","TypeScript","Tailwind CSS"], demoLink: "https://www.mtnetservice.com" },
    { title: "PP Electricity Corporate Website", description: t("เว็บไซต์องค์กรสำหรับ PP Electricity พร้อมข้อมูลบริษัทและบริการ", "Corporate website for PP Electricity with company information and services"), tech: ["Next.js","AWS Amplify","Amazon S3","AWS Cognito","Tailwind CSS"], demoLink: "https://pp-electricity.com" },
    { title: "PP Electricity Mail System", description: t("ระบบจัดการอีเมลสำหรับ PP Electricity พร้อม Webmail และการจัดการบัญชี", "Email management system for PP Electricity with Webmail and account management"), tech: ["Mailu","Amazon EC2","Docker"], demoLink: "https://mail.pp-electricity.com" },
    { title: "Siam Supercar Rental", description: t("แพลตฟอร์มเช่าซูเปอร์คาร์หรูระดับ VIP ในกรุงเทพฯ พร้อมระบบจองออนไลน์และกองยาน 50+ คัน", "Premium supercar rental platform in Bangkok with online booking system and 50+ luxury fleet"), tech: ["TypeScript","Tailwind CSS"], demoLink: "https://siamsupercarrental.com" },
    { title: "VIN Projects", description: t("เว็บไซต์โปรเจคและพอร์ตโฟลิโอสำหรับนำเสนอผลงานและบริการอย่างเป็นทางการ", "Project portfolio and service showcase website with modern design and content management"), tech: ["Next.js","TypeScript","Tailwind CSS"], demoLink: "https://vinprojects.org" },
    { title: "Homeward Stay", description: t("แพลตฟอร์มคัดสรรที่พักในเขาใหญ่ พร้อมระบบค้นหา แผนที่อินเตอร์แอคทีฟ และข้อมูลสถานที่ท่องเที่ยว", "Curated villa booking platform for Khao Yai with interactive map, search system and attraction guides"), tech: ["Next.js","TypeScript","Tailwind CSS"], demoLink: "https://homewardstay.com" },
    { title: "BUHOWEX Exhibition 2026", description: t("แพลตฟอร์มงานแสดงสินค้าอุตสาหกรรม Hospitality ระดับนานาชาติ พร้อมระบบลงทะเบียนและจับคู่ธุรกิจ", "International hospitality industry exhibition platform with exhibitor registration and business matching system"), tech: ["Next.js","FastAPI","PostgreSQL","TypeScript","Tailwind CSS","Docker"], demoLink: "https://buhowex.com" }
  ];

  const total = projects.length;
  const CLONES = 3;
  const cloned = [...projects.slice(-CLONES), ...projects, ...projects.slice(0, CLONES)];

  const virtualIdxRef = useRef(CLONES);
  const [realIdx, setRealIdx] = useState(0);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const isMoving = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const card = trackRef.current.children[0] as HTMLElement;
      if (!card) return;
      const gap = 24;
      cardWidthRef.current = card.getBoundingClientRect().width + gap;
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
        duration: 0.32,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
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

  const next = useCallback(() => { if (!isMoving.current) goTo(virtualIdxRef.current + 1); }, [goTo]);
  const prev = useCallback(() => { if (!isMoving.current) goTo(virtualIdxRef.current - 1); }, [goTo]);
  const jumpTo = useCallback((real: number) => { goTo(CLONES + real); }, [goTo]);

  return (
    <section id="projects" className="relative px-4 sm:px-6 py-16 sm:py-20 bg-brut-cyan border-y-[4px] border-brut-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.10] brut-dots pointer-events-none animate-brut-drift" />
      <AnimatedBlobs variant="projects" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-14">
          <span className="code-tag mb-4">
            git log --oneline projects/
          </span>
          <h3 className="brut-heading text-3xl sm:text-4xl md:text-5xl">
            {t('ผลงาน', 'FEATURED')}{' '}
            <span className="inline-block bg-brut-lime text-brut-ink px-3 py-1 brut-border brut-shadow-md -rotate-1">
              {t('โดดเด่น', 'WORK')}
            </span>
          </h3>
          <p className="mt-3 text-sm sm:text-base font-medium">
            {t('โครงการและระบบที่ได้พัฒนาขึ้น', 'Projects and systems I have built')}
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brut-yellow text-brut-ink brut-border brut-shadow-sm brut-hover flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-5 h-5" strokeWidth={3} />
          </button>

          <div className="relative overflow-hidden flex-1 min-w-0 py-3">
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
                    className="flex-shrink-0 w-[calc(33.333vw-6rem)] max-md:w-[calc(50vw-5rem)] max-sm:w-[calc(100vw-6rem)]"
                    style={{ maxWidth: 420 }}
                  >
                    <ProjectCard {...project} index={realI} />
                  </div>
                );
              })}
            </motion.div>
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brut-yellow text-brut-ink brut-border brut-shadow-sm brut-hover flex items-center justify-center"
          >
            <ChevronRightIcon className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        {/* Counter + Dots */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <div className="font-mono-brut text-xs text-brut-ink/70 bg-white brut-border-2 brut-shadow-sm px-3 py-1">
            <span className="text-brut-pink">commit</span>{' '}
            <span className="text-zinc-500">[</span>
            <span className="text-brut-ink font-bold">{String(realIdx + 1).padStart(2, '0')}</span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-500">{String(total).padStart(2, '0')}</span>
            <span className="text-zinc-500">]</span>
          </div>
          <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-3 brut-border-2 transition-all duration-200 ${
                  i === realIdx ? 'w-10 bg-brut-yellow' : 'w-3 bg-brut-ink/30 hover:bg-brut-pink'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mt-14"
        >
          <div className="bg-brut-yellow brut-border brut-shadow-lg p-6 sm:p-8 max-w-3xl mx-auto -rotate-1">
            <h4 className="brut-heading text-2xl sm:text-3xl mb-3">
              {t('สนใจร่วมงานกัน?', 'WANT TO COLLABORATE?')}
            </h4>
            <p className="font-medium mb-6 max-w-xl mx-auto text-sm sm:text-base">
              {t(
                'หากคุณมีโปรเจคที่น่าสนใจหรือต้องการให้ช่วยพัฒนาระบบ อย่าลังเลที่จะติดต่อมา',
                'If you have an interesting project or need help developing a system, feel free to reach out'
              )}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-brut-ink text-brut-cream font-extrabold uppercase px-6 py-3 brut-border brut-shadow-md brut-hover"
            >
              {t('ติดต่อเลย →', 'CONTACT NOW →')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
