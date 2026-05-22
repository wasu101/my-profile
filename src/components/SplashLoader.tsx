'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BOOT_LINES = [
  { prompt: '$', text: 'npm run dev', delay: 0 },
  { prompt: '>', text: 'next dev --turbopack', delay: 250 },
  { prompt: '✓', text: 'ready in 873ms', delay: 600 },
  { prompt: '>', text: 'loading worrakan.me ...', delay: 900 },
  { prompt: '✓', text: 'mounted <App />', delay: 1300 },
];

export default function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // staged line reveal
    const timers = BOOT_LINES.map((l, i) =>
      setTimeout(() => setShown(i + 1), l.delay)
    );
    // progress bar
    const start = performance.now();
    const DURATION = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // hide after boot
    const hide = setTimeout(() => setVisible(false), 1750);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-brut-cream flex items-center justify-center p-4"
          style={{
            backgroundImage:
              'linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-lg bg-white brut-border brut-shadow-lg overflow-hidden font-mono-brut"
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-brut-ink text-brut-cream text-[10px] sm:text-[11px] border-b-2 border-brut-ink">
              <span className="w-2.5 h-2.5 rounded-full bg-brut-pink" />
              <span className="w-2.5 h-2.5 rounded-full bg-brut-yellow" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 truncate">zsh — worrakan@portfolio — 80×24</span>
              <span className="ml-auto text-brut-yellow hidden sm:inline">booting</span>
            </div>

            {/* Logs */}
            <div className="p-4 sm:p-5 text-[11px] sm:text-xs leading-relaxed min-h-[180px]">
              {BOOT_LINES.slice(0, shown).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-1.5"
                >
                  <span className={l.prompt === '✓' ? 'text-green-600' : 'text-brut-pink'}>
                    {l.prompt}
                  </span>{' '}
                  <span className="text-brut-ink">{l.text}</span>
                  {i === shown - 1 && <span className="code-cursor" />}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 mb-1.5">
                <span>{'// compiling'}</span>
                <span className="text-brut-ink font-bold tabular-nums">
                  {Math.round(progress * 100).toString().padStart(3, '0')}%
                </span>
              </div>
              <div className="h-2.5 bg-brut-cream border-2 border-brut-ink overflow-hidden">
                <div
                  className="h-full bg-brut-yellow border-r-2 border-brut-ink"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
