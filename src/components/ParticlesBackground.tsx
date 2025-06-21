'use client';
import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    const particleCount = 25; // ลดจำนวนลง
    const maxDistance = 150; // เพิ่มระยะห่าง
    const colors = [
      { r: 147, g: 51, b: 234 },   // Purple
      { r: 79, g: 70, b: 229 },    // Indigo  
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 236, g: 72, b: 153 },   // Pink
    ];

    // สร้าง particles
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.3 + 0.1; // ลด opacity
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // ลดความเร็ว
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5, // ลดขนาด
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;

    const animate = () => {
      // Clear with subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'; // ลด fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Gentle movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Smooth edge wrapping
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Subtle pulse animation
        particle.pulse += 0.02;
        particle.alpha = particle.baseAlpha + Math.sin(particle.pulse) * 0.1;

        // Choose random color
        const color = colors[index % colors.length];

        // Draw elegant particle with soft glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 6
        );
        
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha * 0.1})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle connections
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.1; // ลด opacity ของเส้น
            const avgColor = {
              r: Math.floor((color.r + colors[j % colors.length].r) / 2),
              g: Math.floor((color.g + colors[j % colors.length].g) / 2),
              b: Math.floor((color.b + colors[j % colors.length].b) / 2)
            };

            // Gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            );
            lineGradient.addColorStop(0, `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${opacity})`);
            lineGradient.addColorStop(0.5, `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${opacity * 0.5})`);
            lineGradient.addColorStop(1, `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${opacity})`);

            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.5; // เส้นบางลง
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // Add floating orbs occasionally
      if (Math.random() < 0.001) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        orbGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`);
        orbGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      // Redistribute particles on resize
      particles.forEach(particle => {
        if (particle.x > canvas.width) particle.x = Math.random() * canvas.width;
        if (particle.y > canvas.height) particle.y = Math.random() * canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen' // เพิ่มเอฟเฟกต์หรูหรา
      }}
    />
  );
};

export default ParticlesBackground;