import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Award, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { certificates, type Certificate } from "../data/portfolioData";

export default function Certificates() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedCert) setSelectedCert(null);
        else if (isVaultOpen) setIsVaultOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVaultOpen, selectedCert]);

  const categories = ["All", "AI & Cloud", "Data & Analytics", "Systems & Security", "Professional Skills"];

  const filteredCerts = activeTab === "All" 
    ? certificates 
    : certificates.filter(c => c.category === activeTab || (activeTab === "Professional Skills" && c.category === "Business & Strategy"));

  return (
    <section id="certificates" className="py-16 md:py-24 px-6 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[2rem] p-8 md:p-12 theme-card border backdrop-blur-2xl shadow-xl overflow-hidden group"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-card border theme-accent-text text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Credential Vault</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              12 Verified Industry <span className="theme-accent-text">Credentials</span>
            </h2>

            <p className="mt-3.5 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              Officially issued and verified by <strong>Google</strong>, <strong>Deloitte</strong>, <strong>Microsoft</strong>, <strong>CoursePe</strong>, and the <strong>HP Foundation</strong> across Data Analytics, AI, and IT Systems.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {["Google Official", "Deloitte Job Sim", "Microsoft Certified", "ISO 9001:2015", "HP LIFE Foundation"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700/60 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Intense Neon Glow Radar Button */}
          <div className="shrink-0 relative">
            <button
              onClick={() => setIsVaultOpen(true)}
              className="theme-btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-sm sm:text-base tracking-wide transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer group/btn"
            >
              <Award className="w-5 h-5 stroke-[2.5]" />
              <span>View All 12 Certificates</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Drawer */}
      <AnimatePresence>
        {isVaultOpen && (
          <div
            onClick={() => setIsVaultOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-[2rem] bg-white dark:bg-[#070d19] border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-950/40">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-current/10 theme-accent-text border border-current/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Credentials Vault
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Browse and verify all 12 accredited technical certifications
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-4 border-b border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900/30 flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={
                      "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer " +
                      (activeTab === cat
                        ? "theme-btn font-bold"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700")
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-170px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCerts.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-current transition-all duration-300 p-5 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-current/10 theme-accent-text border border-current/20">
                          {cert.badge}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono">{cert.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:opacity-80 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs font-semibold theme-accent-text">
                      <span>View Proof & Verification</span>
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 theme-accent-text" />
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-gray-500">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-950 flex items-center justify-center min-h-[260px]">
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[55vh] w-auto object-contain rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : null}
                <div className="text-center text-gray-400 dark:text-gray-600 p-6">
                  <Award className="w-10 h-10 mx-auto mb-2 theme-accent-text" />
                  <p className="text-xs font-semibold">{selectedCert.title}</p>
                  <p className="text-[11px] mt-1 text-gray-500">Document preview will render once image is placed.</p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-3 bg-white dark:bg-gray-900">
                <div className="text-xs font-mono text-gray-500">
                  {selectedCert.verification || "Verified Credential"}
                </div>
                {selectedCert.link && selectedCert.link !== "#" ? (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold tracking-wide transition-all"
                  >
                    <span>Verify on Official Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-gray-400 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                    Direct Credential Verified
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
