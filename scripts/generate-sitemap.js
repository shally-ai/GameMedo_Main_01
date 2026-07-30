import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { 
    url: '/', 
    changefreq: 'weekly', 
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/about', 
    changefreq: 'monthly', 
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/contact', 
    changefreq: 'monthly', 
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/samples', 
    changefreq: 'weekly', 
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services/sports-highlight-videos', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services/athletic-website-design', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services/athletic-website-management', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services/social-media-management', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/services/virtual-assistant-athletic-directors', 
    changefreq: 'weekly', 
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/who-we-serve', 
    changefreq: 'monthly', 
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  { 
    url: '/blog', 
    changefreq: 'daily', 
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    p => `  <url>
    <loc>https://gamemedo.com${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('sitemap.xml written to:', outputPath);
