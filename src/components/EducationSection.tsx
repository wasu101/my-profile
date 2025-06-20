'use client';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

const EducationSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const education = [
    {
      degree: t('ปริญญาตรี วิทยาศาสตรบัณฑิต (วท.บ)', 'Bachelor of Science (B.Sc.)'),
      field: t('วิทยาการคอมพิวเตอร์', 'Computer Science'),
      school: t('มหาวิทยาลัยสุโขทัยธรรมาธิราช', 'Sukhothai Thammathirat Open University'),
      year: t('คาดว่าจะจบ 2571', 'Expected 2028'),
      yearNumber: '2571',
      status: 'ongoing'
    },
    {
      degree: t('ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)', 'High Vocational Certificate'),
      field: t('คอมพิวเตอร์ธุรกิจ', 'Business Computer'),
      school: t('วิทยาลัยการอาชีพเกษตรวิสัย', 'Kaset Wisai Vocational College'),
      year: t('2562', '2019'),
      yearNumber: '2562',
      gpa: '3.47',
      status: 'completed'
    },
    {
      degree: t('ประกาศนียบัตรวิชาชีพ (ปวช.)', 'Vocational Certificate'),
      field: t('คอมพิวเตอร์ธุรกิจ', 'Business Computer'),
      school: t('วิทยาลัยพณิชยการบางนา', 'Bangna Commercial College'),
      year: t('2560', '2017'),
      yearNumber: '2560',
      gpa: '2.38',
      status: 'completed'
    }
  ];

  return (
    <section id="education" className="px-6 py-20 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <AcademicCapIcon className="w-8 h-8 text-purple-400" />
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('การศึกษา', 'Education')}
          </h3>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/20 to-pink-500/20"></div>
          
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"
            style={{ 
              height: lineHeight,
              top: 0
            }}
          />
          
          <div className="space-y-16">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Year label */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 -top-8 z-20"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md ${
                    edu.status === 'ongoing' 
                      ? 'bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white ring-2 ring-purple-500/30' 
                      : 'bg-white/5 text-gray-300 border border-white/20'
                  }`}>
                    {edu.yearNumber}
                  </div>
                </motion.div>
                
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 top-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, type: "spring", stiffness: 200 }}
                >
                  {edu.status === 'ongoing' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
                  )}
                </motion.div>
                
                {/* Content card */}
                <div className="pt-8">
                  <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-purple-400 font-semibold mb-1">{edu.field}</p>
                      <p className="text-gray-400 mb-2">{edu.school}</p>
                      <div className="flex justify-center gap-4 text-sm">
                        <p className="text-gray-300">{edu.year}</p>
                        {edu.gpa && <p className="text-green-400">GPA: {edu.gpa}</p>}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 relative"
          >
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 -top-8"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold text-gray-300">
                2561
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 top-0 w-6 h-6 bg-white/20 rounded-full border-4 border-black z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            />
            
            <div className="pt-8">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {t('ประกาศนียบัตรเพิ่มเติม', 'Additional Certifications')}
                  </h4>
                  <p className="text-purple-400">{t('หลักสูตร Selling Skill', 'Selling Skill Course')}</p>
                  <p className="text-gray-400">J.I.B Computer Group</p>
                  <p className="text-gray-300 text-sm">{t('ตุลาคม 2561', 'October 2018')}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;