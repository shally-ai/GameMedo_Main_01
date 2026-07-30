import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/samples',
  '/services',
  '/services/sports-highlight-videos',
  '/services/athletic-website-design',
  '/services/athletic-website-management',
  '/services/social-media-management',
  '/services/virtual-assistant-athletic-directors',
  '/who-we-serve',
  '/hire-us',
  '/order'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    p => `  <url>
    <loc>https://gamemedo.com${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('sitemap.xml written to:', outputPath);
