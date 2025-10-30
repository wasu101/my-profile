'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AcademicCapIcon, CalendarIcon, MapPinIcon, TrophyIcon, BuildingLibraryIcon, BookOpenIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const EducationSection = () => {
  const { t } = useLanguage();

  const education = [
    {
      degree: t('ปริญญาตรี วิทยาศาสตรบัณฑิต (วท.บ)', 'Bachelor of Science (B.Sc.)'),
      field: t('วิทยาการคอมพิวเตอร์', 'Computer Science'),
      school: t('มหาวิทยาลัยสุโขทัยธรรมาธิราช', 'Sukhothai Thammathirat Open University'),
      shortName: 'STOU',
      year: t('คาดว่าจะจบ 2571', 'Expected 2028'),
      yearNumber: '2571',
      status: 'ongoing',
      level: 'bachelor',
      icon: BuildingLibraryIcon
    },
    {
      degree: t('ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)', 'High Vocational Certificate'),
      field: t('คอมพิวเตอร์ธุรกิจ', 'Business Computer'),
      school: t('วิทยาลัยอุตสาหกรรมและสื่อสารเกษตรวิสัย', 'Kasetwisai Industry Communication College'),
      shortName: 'KICC',
      year: t('2562', '2019'),
      yearNumber: '2562',
      gpa: '3.47',
      status: 'completed',
      level: 'diploma',
      icon: BookOpenIcon
    },
    {
      degree: t('ประกาศนียบัตรวิชาชีพ (ปวช.)', 'Vocational Certificate'),
      field: t('คอมพิวเตอร์ธุรกิจ', 'Business Computer'),
      school: t('วิทยาลัยพณิชยการบางนา', 'Bangna Commercial College'),
      shortName: 'BNCC',
      year: t('2560', '2017'),
      yearNumber: '2560',
      gpa: '2.38',
      status: 'completed',
      level: 'certificate',
      icon: DocumentTextIcon
    }
  ];

  return (
    <section id="education" className="px-6 py-20 relative">
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
        
        {/* Modern Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              {/* Status Badge */}
              {edu.status === 'ongoing' && (
                <div className="absolute -top-3 -right-3 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
                    {t('กำลังศึกษา', 'Ongoing')}
                  </Badge>
                </div>
              )}

              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 text-purple-400">
                      <edu.icon className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          edu.level === 'bachelor' ? 'border-purple-500 text-purple-400' :
                          edu.level === 'diploma' ? 'border-blue-500 text-blue-400' :
                          'border-green-500 text-green-400'
                        }`}
                      >
                        {edu.shortName}
                      </Badge>
                    </div>
                  </div>

                  {/* Degree Info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-purple-400 font-semibold mb-3">
                      {edu.field}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span>{edu.school}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{edu.year}</span>
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-2">
                          <TrophyIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {edu.status === 'ongoing' ? t('กำลังศึกษา', 'In Progress') : t('สำเร็จการศึกษา', 'Graduated')}
                      </span>
                      <div className="text-2xl font-bold text-white/20">
                        {edu.yearNumber}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;