import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { Calendar, User, ArrowLeft, Loader2, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  author: string;
  published_at: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // 1. Fetch current post
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();

        if (postError) throw postError;

        if (postData) {
          const fetchedPost = postData as BlogPost;
          setPost(fetchedPost);

          // 2. Fetch related posts
          const { data: relatedData, error: relatedError } = await supabase
            .from("blog_posts")
            .select("id, title, slug, excerpt, category, author, published_at, featured_image")
            .eq("category", fetchedPost.category)
            .eq("is_published", true)
            .neq("id", fetchedPost.id)
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedPosts(relatedData as BlogPost[]);
          }
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndRelated();
  }, [slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-muted-foreground text-sm uppercase tracking-widest font-heading">Loading post...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md bg-secondary/20 border border-white/5 p-8 rounded-3xl">
            <h2 className="font-heading text-2xl font-bold uppercase text-foreground mb-4">Post Not Found</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              We couldn't find the article you are looking for. It might have been moved or unpublished.
            </p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "GameMedo",
      "url": "https://gamemedo.com"
    },
    "datePublished": post.published_at,
    "description": post.excerpt
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.meta_title || `${post.title} | GameMedo Blog`}
        description={post.meta_description || post.excerpt || ""}
        keywords={post.meta_keywords || `${post.category}, sports marketing, school athletics`}
        url={`https://gamemedo.com/blog/${post.slug}`}
        canonical={`https://gamemedo.com/blog/${post.slug}`}
        jsonLd={articleSchema}
      />
      <Navbar />
      <Breadcrumb items={[
        { label: "Blog", href: "/blog" },
        { label: post.title }
      ]} />

      <article className="pt-8 pb-20 container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-heading uppercase text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to listing
        </Link>

        {/* Categories, Title & Authors */}
        <header className="mb-10">
          <span className="font-heading text-xs uppercase tracking-wider px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase leading-tight mb-6 text-foreground">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-white/5 pb-6">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-video relative overflow-hidden rounded-2xl bg-secondary/40 border border-white/5 mb-10">
            <img 
              src={post.featured_image} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Main Content */}
        <section 
          className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm md:text-base mb-16 space-y-6 blog-content"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-white/5 pt-12 mb-16">
            <h3 className="font-heading text-xl font-bold uppercase text-foreground mb-8">
              Related <span className="text-gradient">Articles</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link 
                  key={rPost.id}
                  to={`/blog/${rPost.slug}`}
                  className="bg-secondary/20 border border-white/5 hover:border-primary/20 transition-all duration-300 p-6 rounded-xl flex flex-col justify-between group h-full"
                >
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-wider text-primary mb-2 inline-block">
                      {rPost.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm uppercase text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {rPost.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {rPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 flex items-center gap-1.5 text-[10px] font-heading uppercase text-primary tracking-wider">
                    Read <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTASection />
      <Footer />
    </div>
  );
};

export default BlogPost;
