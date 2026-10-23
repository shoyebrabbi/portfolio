import React from "react";
import { motion } from "framer-motion";
import {
  Download, Mail, Award, ArrowDownToLine, MessageCircle, Database, Network,
  BarChart2, FileSpreadsheet, Binary, 
  Server, Shield, Radio, Palette, Share2, Layers, CheckCircle2, UserRound
} from "lucide-react";
import siteContent from "../data/siteContent.json";

const getIconForCategory = (catName: string) => {
  const lower = catName.toLowerCase();
  if (lower.includes("data") || lower.includes("bi")) return BarChart2;
  if (lower.includes("network") || lower.includes("system")) return Server;
  return Shield;
};

const getIconForSkill = (skillName: string) => {
  const lower = skillName.toLowerCase();
  if (lower.includes("sql") || lower.includes("postgres")) return Database;
  if (lower.includes("power bi") || lower.includes("chart")) return BarChart2;
  if (lower.includes("excel") || lower.includes("sheet")) return FileSpreadsheet;
  if (lower.includes("python")) return Binary;
  if (lower.includes("linux") || lower.includes("server")) return Server;
  if (lower.includes("mikrotik") || lower.includes("cisco")) return Radio;
  if (lower.includes("canva") || lower.includes("design")) return Palette;
  if (lower.includes("community") || lower.includes("social")) return Share2;
  return CheckCircle2;
};

export default function Hero() {
  const { settings, skills } = siteContent;
  const profileImage = settings.profileImage || "/profile.webp";
  const profileImageRef = React.useRef<HTMLImageElement>(null);
  const [isProfileImageLoaded, setIsProfileImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const image = profileImageRef.current;
    if (image?.complete && image.naturalWidth > 0) setIsProfileImageLoaded(true);
  }, [profileImage]);

  return (
    <section id="about" className="pt-28 md:pt-36 pb-16 px-6 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Right Column: 3D Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-60 animate-pulse" style={{ background: "var(--accent-glow)" }}></div>

          <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[4/5] rounded-[2rem] p-3 theme-card backdrop-blur-2xl border shadow-2xl group">
            <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-gray-100 dark:bg-gray-950 relative flex items-center justify-center border border-gray-200/60 dark:border-gray-800/80">
              <img
                ref={profileImageRef}
                src={profileImage}
                alt={settings.name}
                className={`relative z-10 w-full h-full object-cover object-top transition duration-700 group-hover:scale-105 ${isProfileImageLoaded ? "" : "hidden"}`}
                onLoad={() => setIsProfileImageLoaded(true)}
                onError={() => setIsProfileImageLoaded(false)}
              />
              {!isProfileImageLoaded && (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 bg-gray-100 p-4 text-center text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  <UserRound className="h-12 w-12 theme-accent-text" strokeWidth={1.25} />
                  <span className="text-sm font-semibold">{settings.name}</span>
                  <span className="text-xs">Portrait photo</span>
                </div>
              )}
            </div>

            {/* Floating Badge 1 */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-6 top-10 z-20 flex items-center gap-2.5 p-3 rounded-2xl theme-card backdrop-blur-xl border shadow-xl"
            >
              <div className="p-2 rounded-xl theme-accent-text bg-current/10">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Data Intelligence</div>
                <div className="text-[9px] text-gray-500 dark:text-gray-400 font-mono">SQL • Power BI</div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 sm:-right-6 bottom-12 z-20 flex items-center gap-2.5 p-3 rounded-2xl theme-card backdrop-blur-xl border shadow-xl"
            >
              <div className="p-2 rounded-xl theme-accent-text bg-current/10">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Infrastructure</div>
                <div className="text-[9px] text-gray-500 dark:text-gray-400 font-mono">Linux • MikroTik</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Left Column: Bio & Actions */}
        <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full theme-card border theme-accent-text text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {settings.availabilityLabel}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]"
          >
            Hi, I'm <br />
            <span className="theme-accent-text">
              {settings.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl font-semibold opacity-90"
          >
            {settings.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base max-w-xl font-normal"
          >
            {settings.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3.5 justify-center lg:justify-start items-stretch w-full sm:w-auto"
          >
            <a
              href={settings.cvFile || `mailto:${settings.email}?subject=CV%20Request`}
              download={settings.cvFile ? true : undefined}
              className="theme-btn group relative isolate flex min-h-16 w-full items-center justify-between gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/30">
                  {settings.cvFile
                    ? <Download className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-y-0.5" />
                    : <Mail className="h-4 w-4 stroke-[2.5]" />}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-extrabold tracking-wide">
                    {settings.cvFile ? siteContent.labels.cvDownloadLabel : siteContent.labels.cvRequestLabel}
                  </span>
                  <span className="text-[10px] font-medium text-white/80">
                    {settings.cvFile ? "Explore my experience & skills" : "Get in touch for my CV"}
                  </span>
                </span>
              </span>
              {settings.cvFile && <ArrowDownToLine className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />}
            </a>

            <a
              href="#certificates"
              className="theme-card flex min-h-16 w-full items-center justify-center gap-2.5 rounded-2xl border px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:-translate-y-1 hover:border-current hover:shadow-lg dark:text-gray-200 sm:w-auto"
            >
              <Award className="w-4 h-4 theme-accent-text stroke-[2]" />
              <span>{siteContent.labels.credentialsButton}</span>
            </a>

            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition-all hover:-translate-y-1 hover:bg-emerald-500/20 hover:shadow-lg dark:text-emerald-400 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </motion.div>

          {/* Social Profiles Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Socials:</span>
            <div className="flex items-center gap-2">
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl theme-card border text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-current transition-all"
              >
                GitHub
              </a>
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl theme-card border text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-current transition-all"
              >
                LinkedIn
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl theme-card border text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-current transition-all"
              >
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Skills Grid (100% Controllable from Admin Panel) */}
      <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {skills.filter((category) => category.visible).map((cat, idx) => {
          const HeaderIcon = getIconForCategory(cat.category);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl theme-card border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100 dark:border-gray-800/80">
                  <div className="p-2 rounded-xl bg-current/10 theme-accent-text">
                    <HeaderIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {cat.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {cat.items.map((skillName, sIdx) => {
                    const SkillIcon = getIconForSkill(skillName);
                    return (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-100/70 dark:bg-gray-800/50 text-gray-800 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/40 hover:border-current transition-colors"
                      >
                        <SkillIcon className="w-3.5 h-3.5 theme-accent-text shrink-0" />
                        <span className="text-xs font-medium leading-none">
                          {skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
