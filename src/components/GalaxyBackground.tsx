'use client';
import { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Simple stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      brightness: number;
      twinkleSpeed: number;
    }> = [];

    // Create fewer stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    // Simple animation
    const animate = () => {
      // Clear canvas with very subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Draw simple twinkling stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle galaxy glow in center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height) / 2
      );
      
      gradient.addColorStop(0, 'rgba(100, 100, 200, 0.03)');
      gradient.addColorStop(0.5, 'rgba(80, 80, 150, 0.01)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a0f 0%, #050505 100%)'
      }}
    />
  );
}