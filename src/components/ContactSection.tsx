'use client';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { EnvelopeIcon, MapPinIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import AnimatedBlobs from "@/components/AnimatedBlobs";

const ContactSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: EnvelopeIcon,    key: 'email',    label: t('อีเมล', 'EMAIL'),         value: 'wasu550.jak2541@gmail.com', href: 'mailto:wasu550.jak2541@gmail.com', bg: 'bg-brut-yellow', delay: 0.05 },
    { icon: CodeBracketIcon, key: 'github',   label: 'GITHUB',                    value: '@wasu101',                  href: 'https://github.com/wasu101',       bg: 'bg-white',       delay: 0.15 },
    { icon: MapPinIcon,      key: 'location', label: t('พื้นที่ทำงาน', 'WORK AREA'), value: 'WFH (Work From Home)',      href: null,                                bg: 'bg-brut-yellow', delay: 0.25 },
  ];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-16 sm:py-20 bg-brut-pink border-y-[4px] border-brut-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.10] brut-stripes-thin pointer-events-none animate-brut-drift-rev" />
      <AnimatedBlobs variant="contact" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="code-tag mb-4">
            curl --request POST /contact
          </span>
          <h3 className="brut-heading text-3xl sm:text-4xl md:text-5xl">
            {t('ทักทาย', "LET'S")}{' '}
            <span className="bg-brut-lime inline-block px-3 py-1 brut-border brut-shadow-md -rotate-1">
              {t('กันได้', 'TALK!')}
            </span>
          </h3>
          <p className="mt-4 font-medium text-sm sm:text-base max-w-xl mx-auto">
            {t('สนใจร่วมงานหรือมีโปรเจคที่ท้าทาย? ติดต่อฉันได้เลย!', 'Interested in working together or have a challenging project? Reach out!')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {items.map(({ icon: Icon, key, label, value, href, bg, delay }) => {
            const body = (
              <div className={`group h-full ${bg} brut-border brut-shadow-md brut-hover p-5 flex flex-col gap-3 font-mono-brut text-left`}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-brut-ink text-brut-yellow brut-border-2 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-brut-ink/60 lowercase">// {label}</span>
                </div>
                <div className="text-xs text-brut-ink/70">
                  <span className="text-brut-pink">const</span>{' '}
                  <span className="font-bold text-brut-ink">{key}</span> =
                </div>
                <p className="text-sm font-bold break-all text-brut-ink">
                  <span className="text-zinc-500">&quot;</span>{value}<span className="text-zinc-500">&quot;</span>;
                </p>
              </div>
            );
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.4 }}
              >
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block h-full">
                    {body}
                  </a>
                ) : body}
              </motion.div>
            );
          })}
        </div>

        {/* Fake HTTP response */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="max-w-full sm:max-w-2xl mx-auto mb-8 bg-brut-ink text-brut-cream brut-border brut-shadow-md font-mono-brut text-[10px] sm:text-xs"
        >
          <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-brut-yellow/40 text-brut-cream/70">
            <span>response.http</span>
            <span className="text-[#B4FF39]">● 200 OK</span>
          </div>
          <pre className="px-3 py-2 leading-relaxed whitespace-pre overflow-x-auto">
<span className="text-zinc-500">HTTP/1.1</span> <span className="text-[#B4FF39]">200 OK</span>{'\n'}<span className="text-zinc-500">Content-Type:</span> application/json{'\n'}<span className="text-zinc-500">X-Powered-By:</span> caffeine{'\n'}{'\n'}<span className="text-zinc-500">&#123;</span> <span className="text-brut-yellow">&quot;status&quot;</span>: <span className="text-[#B4FF39]">&quot;ready_to_collab&quot;</span> <span className="text-zinc-500">&#125;</span>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex justify-center gap-3 sm:gap-4 flex-wrap"
        >
          <a
            href="mailto:wasu550.jak2541@gmail.com"
            className="inline-flex items-center gap-2 bg-brut-ink text-brut-cream font-extrabold uppercase px-6 py-3 brut-border brut-shadow-md brut-hover text-sm"
          >
            <EnvelopeIcon className="w-4 h-4" />
            {t('ส่งอีเมล', 'SEND EMAIL')}
          </a>
          <a
            href="https://github.com/wasu101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brut-yellow text-brut-ink font-extrabold uppercase px-6 py-3 brut-border brut-shadow-md brut-hover text-sm"
          >
            <CodeBracketIcon className="w-4 h-4" />
            {t('ดู GitHub', 'VIEW GITHUB')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
