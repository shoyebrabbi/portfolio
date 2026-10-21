import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800/80 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© {new Date().getFullYear()} Md Shoyeb Rabbi. All rights reserved.</p>
      <p className="mt-1">
        Reach out via: <a href="mailto:hello@shoyebrabbi.com" className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline">hello@shoyebrabbi.com</a>
      </p>
    </footer>
  );
}
