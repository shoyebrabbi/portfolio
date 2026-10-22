import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Award, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import type { Certificate } from "../data/portfolioData";

type CertificateData = Omit<Certificate, "image" | "link" | "verification"> & {
  id: string;
  image?: string | null;
  pdf?: string | null;
  featured?: boolean;
  link?: string | null;
  verification?: string | null;
};

type CertificateLabels = {
  certificatesEyebrow: string;
  certificatesHeading: string;
  certificatesDescription: string;
  featuredCredentialsHeading: string;
  certificatesSeeAllLabel: string;
};

export default function Certificates({
  certificates,
  featuredCertificates,
  labels,
}: {
  certificates: CertificateData[];
  featuredCertificates?: CertificateData[];
  labels: CertificateLabels;
}) {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [isCertificateImageLoaded, setIsCertificateImageLoaded] = useState(false);

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

  useEffect(() => {
    setIsCertificateImageLoaded(false);
  }, [selectedCert?.image]);

  const categories = ["All", ...new Set(certificates.map((certificate) => certificate.category))];

  const filteredCerts = activeTab === "All" 
    ? certificates 
    : certificates.filter(c => c.category === activeTab || (activeTab === "Professional Skills" && c.category === "Business & Strategy"));
  const previewCertificates = featuredCertificates ?? certificates.filter((certificate) => certificate.featured).slice(0, 3);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-16 md:py-24 px-6 max-w-7xl mx-auto w-full">
      {previewCertificates.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">{labels.featuredCredentialsHeading}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {previewCertificates.map((certificate) => (
              <button
                key={certificate.id}
                type="button"
                onClick={() => setSelectedCert(certificate)}
                className="theme-card rounded-xl border p-4 text-left transition-colors hover:border-current"
              >
                <span className="theme-accent-text text-[10px] font-bold uppercase">{certificate.badge}</span>
                <span className="mt-2 block text-sm font-bold text-gray-900 dark:text-white">{certificate.title}</span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{certificate.issuer}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[2rem] p-6 sm:p-8 md:p-12 bg-white/95 dark:bg-gray-900/60 border border-cyan-500/30 dark:border-cyan-500/30 backdrop-blur-2xl shadow-xl overflow-hidden group"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{labels.certificatesEyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {certificates.length} {labels.certificatesHeading}
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed font-normal">
              {labels.certificatesDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {[...new Set(previewCertificates.map((certificate) => certificate.badge))].slice(0, 5).map((badge, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-gray-800/70 text-slate-700 dark:text-gray-300 font-medium border border-slate-200/80 dark:border-gray-700/60 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="shrink-0 relative w-full sm:w-auto flex justify-center">
            <button
              onClick={() => setIsVaultOpen(true)}
              className="theme-btn relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base tracking-wide transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer group/btn w-full sm:w-auto"
            >
              <Award className="w-5 h-5 stroke-[2.5]" />
              <span>{labels.certificatesSeeAllLabel} ({certificates.length})</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Vault Drawer */}
      <AnimatePresence>
        {isVaultOpen && (
          <div
            onClick={() => setIsVaultOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] rounded-[1.5rem] sm:rounded-[2rem] bg-white dark:bg-[#070d19] border border-slate-200 dark:border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between bg-slate-50/50 dark:bg-gray-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-current/10 theme-accent-text border border-current/20">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                      Credentials Vault
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400">
                      Browse and verify all 12 accredited certifications
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-gray-800/80 bg-white dark:bg-gray-900/30 flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={
                      "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer " +
                      (activeTab === cat
                        ? "theme-btn font-bold"
                        : "bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700")
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-150px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredCerts.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 hover:border-current transition-all duration-300 p-4 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-current/10 theme-accent-text border border-current/20">
                          {cert.badge}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{cert.date}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:opacity-85 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800/60 flex items-center justify-between text-[11px] font-semibold theme-accent-text">
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

      {/* Lightbox / Detail Modal (Fully Responsive for Mobile) */}
      <AnimatePresence>
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-[1.5rem] sm:rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-5 h-5 theme-accent-text shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                      {selectedCert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Certificate Image Preview */}
              <div className="p-3 sm:p-4 bg-slate-50 dark:bg-gray-950 flex items-center justify-center min-h-[220px]">
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className={`max-h-[45vh] w-auto object-contain rounded-xl shadow-lg border border-slate-200 dark:border-gray-800 ${isCertificateImageLoaded ? "" : "hidden"}`}
                    onLoad={() => setIsCertificateImageLoaded(true)}
                  />
                ) : null}
                {!isCertificateImageLoaded && (
                  <div className="text-center text-slate-400 dark:text-gray-600 p-4">
                    <Award className="w-9 h-9 mx-auto mb-1.5 theme-accent-text" />
                    <p className="text-xs font-semibold">{selectedCert.title}</p>
                    <p className="text-[10px] mt-0.5 text-slate-500">Add a certificate image or PDF from the CMS.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer (Stacked layout for mobile: ID on top, button below) */}
              <div className="p-4 border-t border-slate-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white dark:bg-gray-900">
                <div className="text-xs font-mono text-slate-500 text-center sm:text-left bg-slate-100 dark:bg-gray-800/60 px-3 py-2 rounded-xl">
                  {selectedCert.verification || "Verified Credential"}
                </div>

                {selectedCert.pdf && (
                  <a
                    href={selectedCert.pdf}
                    download
                    className="flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:border-gray-700 dark:text-gray-200"
                  >
                    Download certificate PDF
                  </a>
                )}
                
                {selectedCert.link && selectedCert.link !== "#" ? (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl font-bold tracking-wide transition-all text-xs sm:text-sm text-center"
                  >
                    <span>Verify on Official Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 px-3 py-2.5 text-center rounded-xl bg-slate-100 dark:bg-gray-800">
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
