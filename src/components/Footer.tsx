import React from "react";
import siteContent from "../data/siteContent.json";

export default function Footer() {
  const { settings, labels } = siteContent;

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800/80 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
      <p className="mt-1">
        {labels.footerContactLabel} <a href={`mailto:${settings.email}`} className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline">{settings.email}</a>
      </p>
    </footer>
  );
}
