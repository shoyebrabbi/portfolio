import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Building2 } from "lucide-react";
import siteContent from "../data/siteContent.json";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string[];
};

type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  highlights: string[];
};

export default function ExperienceEducation({
  experience,
  education,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
}) {
  return (
    <section id="experience" className="py-12 md:py-16 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Experience Timeline */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-2xl bg-current/10 theme-accent-text border border-current/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{siteContent.labels.experienceHeading}</h2>
          </div>

          <div className="relative pl-6 border-l-2 space-y-8" style={{ borderColor: "var(--accent-glow)" }}>
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative group transform-gpu"
              >
                {/* Glowing Dot on Line linked to Active Theme */}
                <div 
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#030712] border-2 group-hover:scale-125 transition-transform duration-300"
                  style={{ 
                    borderColor: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent-glow)" 
                  }}
                ></div>

                <div className="p-6 md:p-7 rounded-3xl theme-card border backdrop-blur-xl shadow-md transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{item.role}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300 font-mono">
                      <Calendar className="w-3.5 h-3.5 theme-accent-text" />
                      {item.period}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold theme-accent-text mb-4">
                    <Building2 className="w-4 h-4" />
                    {item.company}
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200 font-normal">
                    {item.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 leading-relaxed">
                        <span className="theme-accent-text font-bold mt-1 shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-2xl bg-current/10 theme-accent-text border border-current/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{siteContent.labels.educationHeading}</h2>
          </div>

          <div className="relative pl-6 border-l-2" style={{ borderColor: "var(--accent-glow)" }}>
            <div className="space-y-8">
              {education.map((item, idx) => (
                <motion.div
                  key={`${item.institution}-${idx}`}
                  initial={{ opacity: 0.9, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="relative group transform-gpu"
                >
                  <div
                    className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#030712] border-2 group-hover:scale-125 transition-transform duration-300"
                    style={{
                      borderColor: "var(--accent)",
                      boxShadow: "0 0 12px var(--accent-glow)"
                    }}
                  ></div>

                  <div className="p-6 md:p-7 rounded-3xl theme-card border backdrop-blur-xl shadow-md transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{item.degree}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300 font-mono">
                        <Calendar className="w-3.5 h-3.5 theme-accent-text" />
                        {item.period}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold theme-accent-text mb-4">
                      <Building2 className="w-4 h-4" />
                      {item.institution}
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200 font-normal">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-3 leading-relaxed">
                          <span className="theme-accent-text font-bold mt-1 shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
