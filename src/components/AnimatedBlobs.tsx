'use client';

type Blob = {
  className: string;          // tailwind classes for color + size
  style: React.CSSProperties; // position
  shape?: 'square' | 'circle' | 'stripes';
  anim?: 1 | 2 | 3;
};

type Variant = 'about' | 'projects' | 'contact' | 'skills';

const presets: Record<Variant, Blob[]> = {
  about: [
    { className: 'w-16 h-16 bg-brut-pink',   style: { top: '8%',  left: '4%' },  anim: 1 },
    { className: 'w-20 h-20 bg-brut-cyan',   style: { top: '20%', right: '6%' }, shape: 'circle', anim: 2 },
    { className: 'w-14 h-14 bg-brut-yellow', style: { bottom: '12%', left: '8%' }, anim: 3 },
    { className: 'w-12 h-24 bg-brut-orange', style: { bottom: '20%', right: '10%' }, shape: 'stripes', anim: 1 },
  ],
  skills: [
    { className: 'w-20 h-20 bg-brut-pink',  style: { top: '10%', left: '5%' }, shape: 'circle', anim: 2 },
    { className: 'w-16 h-16 bg-brut-cyan',  style: { top: '60%', left: '8%' }, anim: 3 },
    { className: 'w-24 h-12 bg-brut-ink',   style: { bottom: '10%', right: '6%' }, shape: 'stripes', anim: 1 },
    { className: 'w-14 h-14 bg-brut-violet', style: { top: '20%', right: '10%' }, anim: 2 },
  ],
  projects: [
    { className: 'w-20 h-20 bg-brut-yellow', style: { top: '15%', left: '3%' }, anim: 1 },
    { className: 'w-16 h-16 bg-brut-pink',   style: { bottom: '15%', right: '5%' }, shape: 'circle', anim: 3 },
    { className: 'w-14 h-14 bg-brut-lime',   style: { top: '50%', right: '3%' }, anim: 2 },
    { className: 'w-12 h-20 bg-brut-orange', style: { bottom: '25%', left: '6%' }, shape: 'stripes', anim: 1 },
  ],
  contact: [
    { className: 'w-20 h-20 bg-brut-yellow', style: { top: '12%', left: '6%' }, anim: 1 },
    { className: 'w-16 h-16 bg-brut-cyan',   style: { top: '20%', right: '8%' }, shape: 'circle', anim: 2 },
    { className: 'w-14 h-14 bg-brut-lime',   style: { bottom: '15%', left: '10%' }, anim: 3 },
    { className: 'w-12 h-12 bg-brut-violet', style: { bottom: '25%', right: '12%' }, shape: 'circle', anim: 1 },
  ],
};

export default function AnimatedBlobs({ variant }: { variant: Variant }) {
  const blobs = presets[variant];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
      {blobs.map((b, i) => (
        <div
          key={i}
          aria-hidden
          style={b.style}
          className={`absolute brut-border brut-shadow-sm ${b.className}
            ${b.shape === 'circle' ? 'rounded-full' : ''}
            ${b.shape === 'stripes' ? 'brut-stripes-thin' : ''}
            animate-brut-float-${b.anim ?? 1}`}
        />
      ))}
    </div>
  );
}
