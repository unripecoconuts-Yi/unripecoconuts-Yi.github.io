import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Your personal info (one entry, id "profile")
const profile = defineCollection({
  loader: file('src/data/site.yaml', {
    parser: (text) => [{ id: 'profile', ...parse(text) }],
  }),
  schema: z.object({
    name: z.string(),
    altName: z.string().optional(),
    role: z.string(),
    location: z.string(),
    intro: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    formEndpoint: z.string().optional(),
    resumePdf: z.string().optional(),
    heroPhoto: z.string(),
    heroRatio: z.enum(["1:1", "4:5"]).default("4:5"),
    systems: z.array(z.string()).default([]),
    scope: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    tafe: z.object({
      show: z.boolean(),
      course: z.string(),
      institute: z.string(),
      start: z.string(),
    }),
  }),
});

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM, e.g. "2024-03"');

// Every site you've worked on
const sites = defineCollection({
  loader: file('src/data/sites.yaml'),
  schema: z.object({
    name: z.string(),
    address: z.string().optional(),
    region: z.enum(['Brisbane', 'Sunshine Coast', 'Gold Coast']),
    company: z.string().optional(),
    start: yearMonth.optional(),
    end: yearMonth.optional(),
    role: z.string().default('Formwork Installer'),
    type: z.string().optional(),
    multiple: z.boolean().default(false), // one entry covering several sites
    tasks: z.array(z.string()).default([]),
    highlight: z.string().optional(),
  }),
});

// Photos (selfies + work)
const gallery = defineCollection({
  loader: file('src/data/gallery.yaml'),
  schema: z.object({
    src: z.string(),
    kind: z.enum(['selfie', 'work']),
    ratio: z.enum(['4:5', '3:2', '1:1', '16:9']).default('3:2'),
    caption: z.string(),
    site: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { profile, sites, gallery };
