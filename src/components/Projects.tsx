import React from "react";
import { motion } from "framer-motion";
import { Github, Terminal, ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-16 px-6 max-w-7xl mx-auto w-full relative">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest theme-accent-text mb-2 inline-block">
          Engineering Portfolio
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Featured <span className="theme-accent-text">Projects</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Technical implementations in data intelligence, systems infrastructure & enterprise networking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0.9, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group rounded-3xl theme-card border shadow-md backdrop-blur-xl transition-all duration-300 p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transform-gpu"
          >
            {/* Top Glow Bar adapting to current Theme */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--accent-gradient)" }}
            ></div>

            <div>
              <div className="flex justify-between items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-current/10 theme-accent-text border border-current/20">
                  {proj.badge}
                </span>
                <span className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800/60 text-gray-500">
                  <Terminal className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:opacity-85 transition-opacity">
                {proj.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-transparent font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    className="theme-btn p-2.5 rounded-xl transition-all shadow-sm hover:scale-105"
                    title="Live Demo"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
