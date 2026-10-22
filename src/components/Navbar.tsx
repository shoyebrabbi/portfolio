import React, { useState, useEffect } from "react";
import { Download, Mail, Palette, X, Check, Copy, ExternalLink, Send, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "../data/siteContent.json";

const themes = [
  { id: "cyber", name: "Neon Cyber", color: "#06b6d4", desc: "Cyan & Deep Slate" },
  { id: "sunset", name: "Sunset Crimson", color: "#f97316", desc: "Fire Orange & Red" },
  { id: "matrix", name: "Matrix Terminal", color: "#10b981", desc: "Emerald & Lime" },
  { id: "light", name: "Pure Daylight", color: "#0284c7", desc: "Clean Ice White" },
];

export default function Navbar() {
  const { settings, navigation, labels } = siteContent;
  const [currentTheme, setCurrentTheme] = useState(settings.defaultTheme || "cyber");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("site-theme") || settings.defaultTheme || "cyber";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    document.documentElement.classList.toggle("dark", saved !== "light");
  }, [settings.defaultTheme]);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("site-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    if (themeId === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsPaletteOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(settings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-lg sm:text-xl font-bold tracking-wider text-gray-900 dark:text-white">
            {labels.brandName.split(".").map((part, index) => (
              <React.Fragment key={`${part}-${index}`}>
                {index > 0 && "."}<span className={index > 0 ? "theme-accent-text" : undefined}>{part}</span>
              </React.Fragment>
            ))}
          </a>
          
          <div className="hidden md:flex space-x-7 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navigation.map((item) => (
              <a key={item.url} href={item.url} className="hover:opacity-80 transition-colors">{item.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Theme Palette */}
            <div className="relative">
              <button
                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                aria-label="Theme Palette"
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 hover:border-cyan-500 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              >
                <Palette className="w-4 h-4 theme-accent-text" />
              </button>

              <AnimatePresence>
                {isPaletteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-2 z-50 flex flex-col gap-1.5"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Select Color Mood
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => changeTheme(t.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          currentTheme === t.id
                            ? "bg-gray-100 dark:bg-gray-800 theme-accent-text"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full shadow-md"
                            style={{ backgroundColor: t.color }}
                          ></span>
                          <div className="text-left">
                            <div>{t.name}</div>
                            <div className="text-[10px] text-gray-400 font-normal">{t.desc}</div>
                          </div>
                        </div>
                        {currentTheme === t.id && <Check className="w-4 h-4 theme-accent-text" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CV */}
            <a
              href={settings.cvFile || `mailto:${settings.email}?subject=CV%20Request`}
              download={settings.cvFile ? "Md_Shoyeb_Rabbi_CV.pdf" : undefined}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:border-cyan-500 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all"
            >
              {settings.cvFile ? <Download className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{settings.cvFile ? labels.cvDownloadLabel : labels.cvRequestLabel}</span>
            </a>

            {/* Hire Me */}
            <button
              onClick={() => setIsHireOpen(true)}
              className="theme-btn flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
              <span>{labels.hireButton}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950"
            >
              <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
                {navigation.map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hire Drawer */}
      <AnimatePresence>
        {isHireOpen && (
          <div
            onClick={() => setIsHireOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-white dark:bg-[#070d19] border-l border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{labels.connectHeading}</h3>
                    <p className="text-xs text-gray-500 mt-1">{labels.connectAvailability}</p>
                  </div>
                  <button
                    onClick={() => setIsHireOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-3.5">
                  <a
                    href={settings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 transition-all flex items-center justify-between block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                        💬
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          WhatsApp Message
                        </div>
                        <div className="text-xs text-gray-500">{settings.phone}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                  </a>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase">{labels.emailLabel}</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                        {settings.email}
                      </div>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 theme-accent-text hover:opacity-80 transition-all cursor-pointer"
                      title="Copy Email"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    {labels.networksLabel}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-current transition-all flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 theme-accent-text" />
                    </a>
                    <a
                      href={settings.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-current transition-all flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5 theme-accent-text" />
                    </a>
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-current transition-all flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200"
                    >
                      <span>Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5 theme-accent-text" />
                    </a>
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-current transition-all flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 theme-accent-text" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={`mailto:${settings.email}`}
                  className="theme-btn w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{labels.sendEmailButton}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
