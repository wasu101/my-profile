'use client';
import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      alpha: number; baseAlpha: number;
      pulse: number;
      colorIdx: number;
    }

    // Fewer particles, especially on mobile
    const particleCount = isMobile ? 10 : 20;
    const maxDistance   = 120;
    const COLORS = [
      [6,   182, 212],
      [79,  70,  229],
      [59,  130, 246],
      [20,  184, 166],
    ] as const;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const baseAlpha = Math.random() * 0.25 + 0.08;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.5,
        alpha: baseAlpha,
        baseAlpha,
        pulse: Math.random() * Math.PI * 2,
        colorIdx: i % COLORS.length,
      };
    });

    let animId: number;
    let lastTs = 0;
    let visible = true;

    const observer = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Pre-compute distance squared to avoid sqrt in most cases
    const maxDistSq = maxDistance * maxDistance;

    const animate = (ts: number) => {
      if (!visible) { animId = requestAnimationFrame(animate); return; }

      const delta = lastTs ? Math.min((ts - lastTs) / 16.67, 3) : 1; // normalize to 60fps
      lastTs = ts;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move particles
      for (const p of particles) {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        p.pulse += 0.018 * delta;
        p.alpha = p.baseAlpha + Math.sin(p.pulse) * 0.07;
      }

      // Draw connection lines first (no gradient — plain rgba for perf)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const opacity = (1 - Math.sqrt(distSq) / maxDistance) * 0.08;
            const [r, g, bl] = COLORS[a.colorIdx];
            ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity.toFixed(2)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles as simple circles (no radial gradient)
      for (const p of particles) {
        const [r, g, b] = COLORS[p.colorIdx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(p.alpha * 0.6).toFixed(2)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      setCanvasSize();
      for (const p of particles) {
        if (p.x > canvas.width)  p.x = Math.random() * canvas.width;
        if (p.y > canvas.height) p.y = Math.random() * canvas.height;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  );
};

export default ParticlesBackground;

