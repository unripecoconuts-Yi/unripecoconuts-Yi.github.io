import { getCollection, type CollectionEntry } from 'astro:content';
import { parse } from 'yaml';
import sitesYaml from '../data/sites.yaml?raw';

import galleryYaml from '../data/gallery.yaml?raw';

// The content loader sorts entries by id; these keep the order written in the YAML files.
const idsOf = (yaml: string) => (parse(yaml) as { id: string }[]).map((e) => e.id);
const fileOrder = idsOf(sitesYaml);
const galleryOrder = idsOf(galleryYaml);

/** Gallery photos in the order they appear in gallery.yaml. */
export async function getGallery() {
  const photos = await getCollection('gallery');
  return photos.sort((a, b) => galleryOrder.indexOf(a.id) - galleryOrder.indexOf(b.id));
}

export type Site = CollectionEntry<'sites'>;

export const REGIONS = ['Brisbane', 'Sunshine Coast', 'Gold Coast'] as const;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmt(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "Mar 2024 — Present", or "" if the site has no dates yet. */
export function period(site: Site) {
  const { start, end } = site.data;
  if (!start) return '';
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`;
}

/** All sites in the order they appear in sites.yaml. */
export async function getSites() {
  const sites = await getCollection('sites');
  return sites.sort((a, b) => fileOrder.indexOf(a.id) - fileOrder.indexOf(b.id));
}

/** Sites grouped by region, in REGIONS order (empty regions dropped). */
export function byRegion(sites: Site[]) {
  return REGIONS.map((region) => ({
    region,
    sites: sites.filter((s) => s.data.region === region),
  })).filter((g) => g.sites.length);
}

/** Display count, e.g. "14+" when an entry stands for several sites. */
export function siteCount(sites: Site[]) {
  return `${sites.length}${sites.some((s) => s.data.multiple) ? '+' : ''}`;
}
