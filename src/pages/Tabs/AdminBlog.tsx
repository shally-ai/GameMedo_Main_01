import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Trash2, Edit3, Save, ArrowLeft, RefreshCw, Globe, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  is_published: boolean;
}

const categories = [
  "General",
  "Video Production",
  "Website Tips",
  "Social Media",
  "Athletic Director Tips",
  "School Sports Marketing"
];

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFormView, setIsFormView] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [author, setAuthor] = useState("GameMedo Team");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts((data as BlogPost[]) || []);
    } catch (err: any) {
      console.error("Error fetching admin posts:", err);
      toast({ title: "Failed to load posts", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Auto-slugify if not editing an existing slug
    if (!editingId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(generated);
    }
  };

  const startNewPost = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("General");
    setAuthor("GameMedo Team");
    setFeaturedImage("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setIsPublished(false);
    setIsFormView(true);
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setCategory(post.category);
    setAuthor(post.author || "GameMedo Team");
    setFeaturedImage(post.featured_image || "");
    setMetaTitle(post.meta_title || "");
    setMetaDescription(post.meta_description || "");
    setMetaKeywords(post.meta_keywords || "");
    setIsPublished(post.is_published);
    setIsFormView(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Post deleted successfully" });
      fetchPosts();
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast({ title: "Failed to delete post", description: err.message, variant: "destructive" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }

    try {
      setSaving(true);
      const postPayload = {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        category,
        author,
        featured_image: featuredImage || null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        meta_keywords: metaKeywords || null,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from("blog_posts")
          .update(postPayload)
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Post updated successfully" });
      } else {
        // Insert
        const { error } = await supabase
          .from("blog_posts")
          .insert([postPayload]);

        if (error) throw error;
        toast({ title: "Post created successfully" });
      }

      setIsFormView(false);
      fetchPosts();
    } catch (err: any) {
      console.error("Error saving post:", err);
      toast({ title: "Failed to save post", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading && !isFormView) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-muted-foreground text-sm uppercase tracking-widest font-heading">Loading posts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Blog Manager</h2>
          <p className="text-muted-foreground text-xs">Create, publish, and edit resources for athletic directors.</p>
        </div>
        
        {!isFormView ? (
          <button onClick={startNewPost} className="btn-primary flex items-center gap-2 text-xs py-2">
            <Plus size={16} /> Add New Post
          </button>
        ) : (
          <button onClick={() => setIsFormView(false)} className="btn-secondary flex items-center gap-2 text-xs py-2">
            <ArrowLeft size={16} /> Back to List
          </button>
        )}
      </div>

      {/* Listing View */}
      {!isFormView ? (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/15 font-heading text-xs tracking-wider uppercase text-muted-foreground">
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Author</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-secondary/5 transition-colors">
                      <td className="p-4">
                        <span className="font-semibold text-foreground block">{post.title}</span>
                        <span className="text-xs text-muted-foreground block font-mono">/{post.slug}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs px-2.5 py-1 rounded bg-secondary text-muted-foreground">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{post.author}</td>
                      <td className="p-4">
                        {post.is_published ? (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-0.5 rounded-full">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEdit(post)}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-all" 
                            title="Edit"
                          >
                            <Edit3 size={15} />
                          </button>
                          <a 
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-green-400 hover:bg-green-500/5 rounded transition-all" 
                            title="View Public Post"
                          >
                            <Eye size={15} />
                          </a>
                          <button 
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded transition-all" 
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <RefreshCw className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <h4 className="font-heading font-bold text-foreground mb-1 uppercase">No articles found</h4>
              <p className="text-muted-foreground text-xs">Create your very first blog article to get started.</p>
            </div>
          )}
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6 max-w-4xl shadow-lg">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Post Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., 5 Social Media Tips for Friday Night Football"
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g., social-media-friday-night-football"
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm font-mono transition"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="GameMedo Team"
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
              />
            </div>

            {/* Featured Image Link */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Featured Image URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Excerpt (Summary)</label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short, engaging summary for the listings cards grid (max 150-200 characters)..."
              className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
            />
          </div>

          {/* Body Content */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Content (HTML allowed)</label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article body here. You can use standard HTML paragraph tags like <p>, headings like <h2>, and bold markers..."
              className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Meta SEO Section */}
          <div className="border-t border-border pt-6 mt-6 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">SEO Metadata</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Meta Title */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Target search keyword optimized title..."
                  className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
                />
              </div>

              {/* Meta Keywords */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Meta Keywords</label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="e.g., sports graphics, athletic directors, social media"
                  className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-heading uppercase text-muted-foreground font-semibold">Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Description snippet that will display on Google search results page..."
                className="bg-background border border-border hover:border-primary/30 focus:border-primary px-4 py-2.5 rounded-lg text-sm transition"
              />
            </div>
          </div>

          {/* Publish Checkbox */}
          <div className="flex items-center gap-3 border-t border-border pt-6">
            <input
              type="checkbox"
              id="is_published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-background cursor-pointer"
            />
            <label htmlFor="is_published" className="text-xs font-heading uppercase text-foreground font-bold cursor-pointer select-none">
              Publish immediately (visible to public crawlers and site visitors)
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setIsFormView(false)}
              className="btn-secondary text-xs px-6 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 text-xs px-6 py-2.5"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Post
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminBlog;
