'use client';
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import ScrollMouseIndicator from "./ScrollMouseIndicator";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Speed Grid Canvas ───────────────────────────────────────────────────────
function SpeedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let lastTimestamp = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLS        = 16;
    const ROWS        = 10;
    const SPEED       = 0.03;   // units per second (delta-time based)
    const VP_Y        = 0.42;
    const P_SPEED     = 0.42;   // fixed speed for all particles (units/sec)

    // ── Grid helpers ─────────────────────────────────────────────────────────
    function gridPos(col: number, rowOffset: number, W: number, H: number) {
      const hy = H * VP_Y;
      const raw = (rowOffset + t) % 1;
      const depth = raw * raw; // quadratic — smoother than cubic
      const xRatio = col / COLS;
      const xTop = W * xRatio;
      const xBot = W * (0.5 + (xRatio - 0.5) * 3.8);
      return {
        x: xTop + (xBot - xTop) * depth,
        y: hy + (H - hy) * depth,
        depth,
      };
    }

    // ── Particle system ───────────────────────────────────────────────────────
    interface WayPoint { col: number; row: number; }
    interface Particle {
      path:        WayPoint[];
      segIdx:      number;
      segProgress: number;
      trail:       Array<{col: number; rowFrac: number}>;
    }
    const PARTICLE_COUNT = 10;
    const TRAIL_LEN      = 50;

    function makePath(fromCol: number, fromRow: number): WayPoint[] {
      const pts: WayPoint[] = [{ col: fromCol, row: fromRow }];
      let col = fromCol;
      let row = fromRow;
      for (let i = 0; i < 14; i++) {
        if (Math.random() < 0.6 || row >= ROWS - 1) {
          const steps = Math.floor(Math.random() * 3) + 1;
          const dir = col <= 0 ? 1 : col >= COLS ? -1 : (Math.random() < 0.5 ? 1 : -1);
          col = Math.max(0, Math.min(COLS, col + steps * dir));
        } else {
          row = Math.min(ROWS - 1, row + 1);
        }
        pts.push({ col, row });
        if (row >= ROWS - 1) break;
      }
      return pts;
    }

    function spawnParticle(stagger = false): Particle {
      const startCol = Math.floor(Math.random() * (COLS + 1));
      const startRow = Math.floor(Math.random() * ROWS);
      return {
        path:        makePath(startCol, startRow),
        segIdx:      0,
        segProgress: stagger ? Math.random() : 0,
        trail:       [],
      };
    }

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5 : PARTICLE_COUNT;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) particles.push(spawnParticle(true));

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = (timestamp: number) => {
      if (!visible) { animId = requestAnimationFrame(draw); return; }
      // delta time in seconds, capped at 50ms to avoid huge jumps after tab switch
      const delta = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0;
      lastTimestamp = timestamp;

      const W = canvas.width;
      const H = canvas.height;
      const hy = H * VP_Y;
      ctx.clearRect(0, 0, W, H);

      // ── Grid lines ────────────────────────────────────────────────────
      for (let r = 0; r < ROWS; r++) {
        const raw = ((r / ROWS) + t) % 1;
        const p = raw * raw;
        const y = hy + (H - hy) * p;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(6,182,212,${(p * 0.5).toFixed(2)})`;
        ctx.lineWidth = 0.5 + p * 1.2;
        ctx.stroke();
      }
      for (let c = 0; c <= COLS; c++) {
        const xR = c / COLS;
        const xTop = W * xR;
        const xBot = W * (0.5 + (xR - 0.5) * 3.8);
        const dist = Math.abs(xR - 0.5) * 2;
        ctx.beginPath();
        ctx.moveTo(xTop, hy);
        ctx.lineTo(xBot, H);
        ctx.strokeStyle = `rgba(6,182,212,${(0.1 + dist * 0.14).toFixed(2)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      // horizon glow
      const hg = ctx.createLinearGradient(0, hy, W, hy);
      hg.addColorStop(0,   'rgba(6,182,212,0)');
      hg.addColorStop(0.3, 'rgba(6,182,212,0.22)');
      hg.addColorStop(0.5, 'rgba(45,212,191,0.4)');
      hg.addColorStop(0.7, 'rgba(6,182,212,0.22)');
      hg.addColorStop(1,   'rgba(6,182,212,0)');
      ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(W, hy);
      ctx.strokeStyle = hg; ctx.lineWidth = 1.5; ctx.stroke();

      // ── Particles ─────────────────────────────────────────────────────
      const step = P_SPEED * delta;
      for (const p of particles) {
        p.segProgress += step;
        if (p.segProgress >= 1) {
          p.segProgress -= 1;
          p.segIdx++;
          if (p.segIdx >= p.path.length - 1) {
            const last = p.path[p.path.length - 1];
            p.path = makePath(last.col, 0);
            p.segIdx = 0;
            p.trail.length = 0;
          }
        }

        if (p.path.length < 2) continue;
        const wp0 = p.path[p.segIdx];
        const wp1 = p.path[p.segIdx + 1];
        const col       = wp0.col + (wp1.col - wp0.col) * p.segProgress;
        const rowFrac   = wp0.row + (wp1.row - wp0.row) * p.segProgress;
        const rowOffset = rowFrac / ROWS;
        const pos       = gridPos(col, rowOffset, W, H);

        if (pos.depth > 0.93) {
          const last = p.path[p.path.length - 1];
          p.path = makePath(last.col, 0);
          p.segIdx = 0; p.segProgress = 0; p.trail.length = 0;
          continue;
        }

        p.trail.push({ col, rowFrac: rowOffset });
        if (p.trail.length > TRAIL_LEN) p.trail.shift();

        if (p.trail.length > 1) {
          const pts = p.trail.map(tr => gridPos(tr.col, tr.rowFrac, W, H));
          // draw trail as single path per segment (no shadowBlur per segment)
          for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1];
            const b = pts[i];
            const ratio = i / pts.length;
            const alpha = ratio * ratio * b.depth * 0.9;
            const width = 0.5 + ratio * b.depth * 3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(120,220,255,${alpha.toFixed(2)})`;
            ctx.lineWidth = width;
            ctx.stroke();
          }
          // head dot — single shadow only here
          const head = pts[pts.length - 1];
          const headAlpha = head.depth * head.depth * 0.7;
          if (headAlpha > 0.02) {
            ctx.save();
            ctx.shadowColor = 'rgba(6,182,212,0.8)';
            ctx.shadowBlur  = 6;
            ctx.beginPath();
            ctx.arc(head.x, head.y, 0.5 + head.depth * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,240,255,${headAlpha.toFixed(2)})`;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      t = (t + SPEED * delta) % 1;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame((ts) => { lastTimestamp = ts; draw(ts); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32 relative min-h-screen flex items-center overflow-hidden">
      {/* Animated speed grid background */}
      <SpeedGrid />
      {/* Vignette overlay so edges fade dark */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(9,9,11,0.7) 100%)' }} />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t("สวัสดี ผมชื่อ", "Hi, I'm")}
              </span>
              <br className="block sm:hidden" />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {t(" วรกันต์ นาไทร (แจ๊ค)", " Worrakan Nasai (Jack)")}
              </span>
            </h2>
            
            <div className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 h-8 sm:h-10">
              <TypeWriter 
                words={
                  t('IT Specialist,Web Developer,Full Stack Developer,Python Developer', 
                    'IT Specialist,Web Developer,Full Stack Developer,Python Developer').split(',')
                }
              />
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0 transform hover:scale-105 transition-all duration-200 px-6 py-3 text-base font-semibold" 
                asChild
              >
                <Link href="#contact">{t('ติดต่อฉัน', 'Get In Touch')}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200 px-6 py-3 text-base font-semibold" 
                asChild
              >
                <Link href="#projects">{t('ดูผลงาน', 'View Projects')}</Link>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">5+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('ปีประสบการณ์', 'Years Experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">20+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('โปรเจค', 'Projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">15+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('เทคโนโลยี', 'Technologies')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">10+</div>
                <div className="text-xs sm:text-sm text-gray-400">{t('ลูกค้า', 'Clients')}</div>
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-sm text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t('พร้อมรับงาน Freelance', 'Available for Freelance')}</span>
            </motion.div>
          </motion.div>
          
          {/* Profile Image Section */}
          <motion.div
            className="flex flex-col items-center gap-4 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Circle */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 relative">
            {/* Background with gradient and blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-xl rounded-full border border-white/10" />
            
            {/* Static glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 120deg, transparent, rgba(6, 182, 212, 0.35), transparent)',
                borderRadius: '50%'
              }}
            />
            
            {/* Profile Image Container */}
            <div className="absolute inset-3 sm:inset-4 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Profile Image */}
              <Image
                src="/images/profile.jpg"
                alt={t("วรกันต์ นาไทร", "Worrakan Nasai")}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                onError={() => {
                  console.log('Profile image not found');
                }}
              />
            </div>
            </div>

            {/* Quick Skills Badges */}
            <motion.div
              className="flex gap-2 flex-wrap justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              {['React', 'Python', 'AWS', 'Next.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-2 py-1 text-xs bg-zinc-800/80 border border-white/20 rounded-full text-white whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator - Hide on small screens */}
      <div className="hidden sm:block">
        <ScrollMouseIndicator />
      </div>
    </section>
  );
};

export default HeroSection;