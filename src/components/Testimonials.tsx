import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import siteContent from "../data/siteContent.json";

type Testimonial = {
  id: string;
  data: {
    name: string;
    role: string;
    quote: string;
  };
};

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <div className="mb-10 text-center">
        <span className="theme-accent-text text-xs font-bold uppercase tracking-widest">{siteContent.labels.testimonialEyebrow}</span>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
          {siteContent.labels.testimonialHeading}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {testimonials.map(({ id, data }, index) => (
          <motion.figure
            key={id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="theme-card rounded-2xl border p-6"
          >
            <Quote className="mb-4 h-5 w-5 theme-accent-text" aria-hidden="true" />
            <blockquote className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{data.quote}</blockquote>
            <figcaption className="mt-5 border-t border-gray-200 pt-4 dark:border-gray-800">
              <div className="font-semibold text-gray-900 dark:text-white">{data.name}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{data.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}