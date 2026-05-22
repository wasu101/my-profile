'use client';
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-brut-ink text-brut-cream border-t-[4px] border-brut-ink">
      {/* Marquee strip - dev commands */}
      <div className="overflow-hidden bg-brut-yellow text-brut-ink border-b-[3px] border-brut-ink py-2">
        <div className="flex whitespace-nowrap animate-brut-marquee font-mono-brut font-bold text-sm sm:text-base">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-6 inline-flex items-center gap-3 lowercase">
                  <span className="text-brut-pink">$</span> git push origin main
                  <span className="text-brut-pink\">·</span> npm run deploy
                  <span className="text-brut-pink">·</span> docker compose up
                  <span className="text-brut-pink">·</span> sudo make coffee
                  <span className="text-brut-pink">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid gap-6 sm:grid-cols-2 items-start">
        <div className="font-mono-brut min-w-0">
          <div className="text-xs text-brut-cream/60 mb-2">
            <span className="text-brut-yellow">$</span> cat author.json
          </div>
          <pre className="text-[11px] sm:text-sm leading-relaxed text-brut-cream whitespace-pre overflow-x-auto">
<span className="text-zinc-500">&#123;</span>{'\n'}  <span className="text-brut-yellow">&quot;name&quot;</span>: <span className="text-[#B4FF39]">&quot;{t('วรกันต์ นาไทร', 'Worrakan Nasai')}&quot;</span>,{'\n'}  <span className="text-brut-yellow">&quot;role&quot;</span>: <span className="text-[#B4FF39]">&quot;full-stack + it-specialist&quot;</span>,{'\n'}  <span className="text-brut-yellow">&quot;year&quot;</span>: <span className="text-brut-pink">{year}</span>{'\n'}<span className="text-zinc-500">&#125;</span>
          </pre>
          <p className="text-[10px] sm:text-xs mt-3 text-brut-cream/40">
            // © {year} · {t('สงวนลิขสิทธิ์ทั้งหมด', 'all rights reserved')} · EOF
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end font-mono-brut">
          {[
            { href: 'https://github.com/wasu101', label: 'github', cmd: 'open', bg: 'bg-brut-yellow' },
            { href: 'mailto:wasu550.jak2541@gmail.com', label: 'email', cmd: 'send', bg: 'bg-white' },
            { href: '#contact', label: 'contact', cmd: 'goto', bg: 'bg-brut-pink' },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              className={`${l.bg} text-brut-ink text-xs sm:text-sm px-3 py-2 brut-border-2 brut-shadow-sm brut-hover lowercase`}
            >
              <span className="text-brut-pink">$</span> <span className="font-bold">{l.cmd}</span> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
