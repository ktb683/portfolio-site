import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Katie'),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    ongoing: z.boolean().default(false),
    location: z.string().default(''),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    videoLink: z.string().url().optional(),
    externalLink: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
  projects,
};
