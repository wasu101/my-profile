'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { EnvelopeIcon, MapPinIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

const CONTACT_BG = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80&fit=crop';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={CONTACT_BG}
          alt="Contact background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zinc-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-24 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">
            {t('ติดต่อ', 'Contact')}
          </p>
          <h3 className="text-4xl font-bold text-white mb-4">
            {t('ติดต่อฉัน', 'Get In Touch')}
          </h3>
          <p className="text-zinc-400 max-w-xl mx-auto">
            {t('สนใจร่วมงานหรือมีโปรเจคที่ท้าทาย? ติดต่อฉันได้เลย!', 'Interested in working together or have a challenging project? Contact me!')}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: EnvelopeIcon,
              label: t('อีเมล', 'Email'),
              value: 'wasu550.jak2541@gmail.com',
              href: 'mailto:wasu550.jak2541@gmail.com',
              delay: 0.1,
            },
            {
              icon: CodeBracketIcon,
              label: 'GitHub',
              value: '@wasu101',
              href: 'https://github.com/wasu101',
              delay: 0.2,
            },
            {
              icon: MapPinIcon,
              label: t('พื้นที่ทำงาน', 'Work Area'),
              value: 'WFH (Work From Home)',
              href: null,
              delay: 0.3,
            },
          ].map(({ icon: Icon, label, value, href, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.5 }}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">{label}</p>
              {href ? (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="text-white text-sm text-center hover:text-cyan-400 transition-colors break-all">
                  {value}
                </a>
              ) : (
                <p className="text-white text-sm text-center">{value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <a
            href="mailto:wasu550.jak2541@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-7 py-3 rounded-xl font-semibold transition-all"
          >
            <EnvelopeIcon className="w-4 h-4" />
            {t('ส่งอีเมล', 'Send Email')}
          </a>
          <a
            href="https://github.com/wasu101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-white px-7 py-3 rounded-xl font-semibold transition-all"
          >
            <CodeBracketIcon className="w-4 h-4" />
            {t('ดู GitHub', 'View GitHub')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

