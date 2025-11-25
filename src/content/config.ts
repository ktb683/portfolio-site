import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    ongoing: z.boolean().default(false),
    location: z.string().default(''),
    tags: z.array(z.string()).default([]),
    image: z.string(), // Main thumbnail image
    images: z.array(z.string()).default([]), // Additional images
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
