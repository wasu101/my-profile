'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChatBubbleBottomCenterTextIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-purple-400" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('ติดต่อฉัน', 'Contact Me')}
          </h3>
        </motion.div>
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-8">
            <p className="text-lg mb-8 text-gray-300">
              {t('สนใจร่วมงานหรือมีโปรเจคที่ท้าทาย? ติดต่อฉันได้เลย!', 'Interested in working together or have a challenging project? Contact me!')}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <PhoneIcon className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">{t('โทรศัพท์', 'Phone')}</p>
                <p className="text-white">099-612-5454</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <EnvelopeIcon className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">{t('อีเมล', 'Email')}</p>
                <p className="text-white">wasu550.jak2541@gmail.com</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <MapPinIcon className="w-6 h-6 text-purple-400" />
                <p className="text-gray-400">{t('พื้นที่ทำงาน', 'Work Area')}</p>
                <p className="text-white">{t('บางนา, บางพลี, สำโรง', 'Bangna, Bangplee, Samrong')}</p>
              </motion.div>
            </div>
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 group" 
                asChild
              >
                <a href="mailto:wasu550.jak2541@gmail.com" className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {t('ส่งอีเมล', 'Send Email')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 group" 
                asChild
              >
                <a href="tel:0996125454" className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {t('โทรหาฉัน', 'Call Me')}
                </a>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;