import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables manually from .env file
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.warn('.env file not found, using process.env');
    return {};
  }
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      let val = parts.slice(1).join('=').trim();
      // remove surrounding quotes if any
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      env[key] = val;
    });
    return env;
  } catch (err) {
    console.error('Error loading .env file:', err);
    return {};
  }
}

const env = { ...loadEnv(), ...process.env };
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
  { url: '/about', changefreq: 'monthly', priority: 0.7, lastmod: today },
  { url: '/contact', changefreq: 'monthly', priority: 0.8, lastmod: today },
  { url: '/samples', changefreq: 'weekly', priority: 0.8, lastmod: today },
  { url: '/services', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/services/sports-highlight-videos', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/services/athletic-website-design', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/services/athletic-website-management', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/services/social-media-management', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/services/virtual-assistant-athletic-directors', changefreq: 'weekly', priority: 0.9, lastmod: today },
  { url: '/who-we-serve', changefreq: 'monthly', priority: 0.8, lastmod: today },
  { url: '/blog', changefreq: 'daily', priority: 0.8, lastmod: today },
  { url: '/affiliate', changefreq: 'monthly', priority: 0.7, lastmod: today },
  { url: '/privacy', changefreq: 'monthly', priority: 0.5, lastmod: today },
  { url: '/terms', changefreq: 'monthly', priority: 0.5, lastmod: today },
  { url: '/hire-us', changefreq: 'weekly', priority: 0.9, lastmod: today }
];

async function generateSitemap() {
  let dynamicPages = [];
  
  if (supabaseUrl && supabaseKey) {
    try {
      console.log('Connecting to Supabase to fetch published blog posts...');
      const response = await fetch(`${supabaseUrl}/rest/v1/blog_posts?select=slug,published_at&is_published=eq.true`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      
      if (response.ok) {
        const posts = await response.json();
        if (Array.isArray(posts)) {
          dynamicPages = posts.map(post => ({
            url: `/blog/${post.slug}`,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: post.published_at ? post.published_at.split('T')[0] : today
          }));
          console.log(`Successfully fetched ${dynamicPages.length} published blog posts.`);
        } else {
          console.warn('Fetched blog posts response is not an array:', posts);
        }
      } else {
        const errText = await response.text();
        console.warn(`Failed to fetch blog posts: Status ${response.status} - ${errText}`);
      }
    } catch (error) {
      console.error('Error fetching blog posts from Supabase:', error);
    }
  } else {
    console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set in .env. Generating static sitemap only.');
  }

  const allPages = [...staticPages, ...dynamicPages];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
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
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`sitemap.xml successfully written to: ${outputPath} (Total pages: ${allPages.length})`);
}

generateSitemap();
