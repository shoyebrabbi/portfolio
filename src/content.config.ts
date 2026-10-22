import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    summary: z.string(),
    image: z.string().optional().nullable(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    badge: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    image: z.string().optional().nullable(),
    liveUrl: z.string().optional().nullable(),
    githubUrl: z.string().optional().nullable(),
    order: z.number().default(100),
    featured: z.boolean().default(true),
  }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certificates' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    badge: z.string(),
    category: z.enum([
      'AI & Cloud',
      'Data & Analytics',
      'Systems & Security',
      'Professional Skills',
      'Business & Strategy',
    ]),
    date: z.string(),
    verification: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    order: z.number().default(100),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    showInPagesIndex: z.boolean().default(true),
    sections: z.array(z.object({
      type: z.enum(['text', 'image', 'projects', 'certificates', 'cta']),
      heading: z.string().optional().nullable(),
      body: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      imageAlt: z.string().optional().nullable(),
      buttonLabel: z.string().optional().nullable(),
      buttonUrl: z.string().optional().nullable(),
    })).default([]),
  }),
});

export const collections = { blogs, projects, certificates, testimonials, pages };