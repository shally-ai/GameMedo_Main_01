import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { BookOpen, Calendar, User, ArrowRight, Loader2, RefreshCw } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  author: string;
  published_at: string | null;
  featured_image: string | null;
}

const categories = [
  "All", 
  "Video Production", 
  "Website Tips", 
  "Social Media", 
  "Athletic Director Tips", 
  "School Sports Marketing"
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, category, author, published_at, featured_image")
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setPosts(data as BlogPost[]);
          setFilteredPosts(data as BlogPost[]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === category));
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Recent";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="GameMedo Blog - Sports Marketing Tips for Athletic Directors & Coaches"
        description="Practical sports marketing guides, athletic website tips, and social media strategies for high school Athletic Directors and varsity coaches from the GameMedo team."
        keywords="athletic director blog, high school sports marketing tips, sports social media guide, athletic department website tips, sports video tips, GameMedo blog"
        url="https://gamemedo.com/blog"
        canonical="https://gamemedo.com/blog"
      />
      <Navbar />
      <Breadcrumb items={[
        { label: "Blog" }
      ]} />

      <main className="pt-8 pb-20 container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">GameMedo Insights</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight mb-6"
          >
            Sports Marketing Resources for <span className="text-gradient">Athletic Directors</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed"
          >
            Practical guides, expert tips, and strategies to save time, elevate your school's brand, and build booster support.
          </motion.p>
        </section>

        {/* Category Filters */}
        <section className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex gap-2 min-w-max justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-heading text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/30 text-muted-foreground border-white/5 hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Post List */}
        <section className="min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-muted-foreground text-sm uppercase tracking-widest font-heading">Loading posts...</span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-secondary/20 border border-white/5 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col">
                    {/* Featured Image */}
                    <div className="aspect-video relative overflow-hidden bg-secondary/40 border-b border-white/5">
                      {post.featured_image ? (
                        <img 
                          src={post.featured_image} 
                          alt={post.title} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                          <BookOpen size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="font-heading text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(post.published_at)}</span>
                        <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                      </div>
                      <h2 className="font-heading text-lg font-bold uppercase text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                        {post.excerpt || "No summary available for this post. Click read more to view the full details."}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-white/5">
                    <a 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-secondary/15 border border-white/5 rounded-3xl max-w-md w-full">
              <RefreshCw className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-heading font-bold uppercase text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Check back soon! We are drafting marketing resource posts and web design guides for your athletic department.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
