import { useState, useEffect } from "react";
import { api } from "@/integrations/api";
import { Loader2, Plus, Trash2, Image as ImageIcon, Video, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HeroMedia {
  id: string;
  title: string;
  type: "video" | "graphic";
  media_url: string;
  storage_path?: string;
  created_at: number;
}

import HeroMediaForm from "@/components/admin/hero/HeroMediaForm";
import HeroMediaItem from "@/components/admin/hero/HeroMediaItem";

const AdminHeroMedia = () => {
  const [mediaList, setMediaList] = useState<HeroMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"video" | "graphic">("graphic");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data = await api.getHeroMedia();
      setMediaList(data as HeroMedia[]);
    } catch (error) {
      console.error("Error fetching hero media:", error);
      toast({ title: "Failed to load hero media", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      toast({ title: "Please provide a title and file", variant: "destructive" });
      return;
    }

    if (mediaList.length >= 6) {
      toast({ title: "Maximum 6 items allowed in Hero Section", description: "Please delete an existing item first.", variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload to Storage
      const uploadResult = await api.uploadFile(file);
      if (uploadResult.error) throw new Error(uploadResult.error);

      // 2. Save to Firestore
      const docData = {
        title,
        type,
        mediaUrl: uploadResult.url,
        storagePath: uploadResult.path,
      };

      await api.addHeroMedia(docData);

      toast({ title: "Hero Media added successfully!" });
      
      // Reset form
      setTitle("");
      setFile(null);
      const fileInput = document.getElementById("hero-media-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      fetchMedia();
      setUploading(false);
    } catch (error: any) {
      console.error("Error adding hero media:", error);
      toast({ title: "Failed to add hero media", description: error.message, variant: "destructive" });
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const media = mediaList.find(m => m.id === mediaId);
      await api.deleteHeroMedia(mediaId, media?.storage_path);
      toast({ title: "Media deleted" });
      fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
      toast({ title: "Failed to delete media", variant: "destructive" });
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-md pt-2 pb-4 z-10 border-b border-border">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Manage Hero Grid</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Upload up to 6 custom images or videos that will be displayed in the dynamic grid within the site's main hero section. We recommend using a 4:3 aspect ratio.
        </p>
      </div>

      <HeroMediaForm 
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        uploading={uploading}
        uploadProgress={uploadProgress}
        itemCount={mediaList.length}
      />

      {/* Media List */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaList.map((media) => (
            <HeroMediaItem 
              key={media.id}
              media={media}
              onDelete={handleDelete}
            />
          ))}
          
          {/* Fill empty spots in the UI preview */}
          {[...Array(Math.max(0, 6 - mediaList.length))].map((_, i) => (
             <div key={`empty-${i}`} className="bg-secondary/30 border border-dashed border-border rounded-lg aspect-[4/3] flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                   <span className="font-heading text-lg opacity-50">{mediaList.length + i + 1}</span>
                </div>
                <span className="text-xs uppercase tracking-widest font-bold opacity-50">Empty Slot</span>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminHeroMedia;
