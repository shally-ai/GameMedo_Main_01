import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/integrations/api";
import { Loader2, Plus, Trash2, CheckCircle, XCircle, Camera, Upload, Play, Film } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery_days: number;
  image_url: string;
  video_url: string | null;
  features: string[];
  is_active: boolean;
  who_it_for?: string;
  problem_solved?: string;
  final_output?: string;
  additional_images?: string[];
  pdf_url?: string;
}

const AdminGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGigId, setEditingGigId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    delivery_days: "1",
    features: "",
    who_it_for: "",
    problem_solved: "",
    final_output: "",
    image_url: "",
    video_url: "",
    additional_images: [] as string[],
    pdf_url: ""
  });

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const { data, error } = await supabase
        .from("custom_gigs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          console.warn("Table custom_gigs does not exist yet.");
          setGigs([]);
        } else {
          throw error;
        }
      } else {
        setGigs(data as Gig[]);
      }
    } catch (error) {
      console.error("Error fetching gigs:", error);
      toast({ title: "Failed to load gigs", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setThumbnailBlob(null);
      setThumbnailPreviewUrl("");
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAdditionalImageFiles(prev => [...prev, ...files]);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const removeAdditionalImageFile = (index: number) => {
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingAdditionalImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter(img => img !== url)
    }));
  };

  const captureThumbnail = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (blob) {
        setThumbnailBlob(blob);
        setThumbnailPreviewUrl(URL.createObjectURL(blob));
        toast({ title: "Thumbnail Captured!" });
      }
    }, 'image/jpeg', 0.8);
  };

  const handleEdit = (gig: Gig) => {
    setEditingGigId(gig.id);
    setIsEditing(true);
    setIsAdding(true);
    setFormData({
      title: gig.title,
      description: gig.description,
      price: gig.price.toString(),
      delivery_days: gig.delivery_days.toString(),
      features: gig.features.join(", "),
      who_it_for: gig.who_it_for || "",
      problem_solved: gig.problem_solved || "",
      final_output: gig.final_output || "",
      image_url: gig.image_url,
      video_url: gig.video_url || "",
      additional_images: gig.additional_images || [],
      pdf_url: gig.pdf_url || ""
    });
    setPreviewUrl(gig.image_url);
    if (gig.video_url) {
      setPreviewUrl(gig.video_url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveGig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFile && !isEditing) {
      toast({ title: "Please select an image or video.", variant: "destructive" });
      return;
    }

    const isVideo = mediaFile ? mediaFile.type.startsWith('video/') : (formData.video_url !== "");
    if (mediaFile && isVideo && !thumbnailBlob) {
      toast({ title: "Please capture a thumbnail for the video.", variant: "destructive" });
      return;
    }

    setUploading(true);

    try {
      let imageUrl = formData.image_url;
      let videoUrl = formData.video_url || null;

      // 1. Upload Main Media if changed
      if (mediaFile) {
        const mediaUploadResult = await api.uploadFile(mediaFile);
        if (mediaUploadResult.error) throw new Error(mediaUploadResult.error);

        if (mediaFile.type.startsWith('video/')) {
          videoUrl = mediaUploadResult.url;
          // 2. Upload Thumbnail
          const thumbFile = new File([thumbnailBlob!], `thumb_${Date.now()}.jpg`, { type: 'image/jpeg' });
          const thumbUploadResult = await api.uploadFile(thumbFile);
          if (thumbUploadResult.error) throw new Error(thumbUploadResult.error);
          imageUrl = thumbUploadResult.url;
        } else {
          imageUrl = mediaUploadResult.url;
          videoUrl = null; // If changed from video to image
        }
      }

      // 3. Upload Additional Images
      const additionalImages = [...formData.additional_images];
      for (const file of additionalImageFiles) {
        const uploadResult = await api.uploadFile(file);
        if (uploadResult.error) throw new Error(uploadResult.error);
        additionalImages.push(uploadResult.url);
      }

      // 4. Upload PDF
      let pdfUrl = formData.pdf_url;
      if (pdfFile) {
        const pdfUploadResult = await api.uploadFile(pdfFile);
        if (pdfUploadResult.error) throw new Error(pdfUploadResult.error);
        pdfUrl = pdfUploadResult.url;
      }

      const featuresArray = formData.features.split(",").map(f => f.trim()).filter(f => f.length > 0);

      const gigData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        delivery_days: parseInt(formData.delivery_days),
        image_url: imageUrl,
        video_url: videoUrl,
        features: featuresArray,
        is_active: true,
        who_it_for: formData.who_it_for,
        problem_solved: formData.problem_solved,
        final_output: formData.final_output,
        additional_images: additionalImages,
        pdf_url: pdfUrl
      };

      if (isEditing && editingGigId) {
        const { error } = await supabase
          .from("custom_gigs")
          .update(gigData)
          .eq("id", editingGigId);
        if (error) throw error;
        toast({ title: "Gig updated successfully!" });
      } else {
        const { error } = await supabase.from("custom_gigs").insert([gigData]);
        if (error) throw error;
        toast({ title: "Gig added successfully!" });
      }

      setIsAdding(false);
      setIsEditing(false);
      setEditingGigId(null);
      setFormData({ 
        title: "", 
        description: "", 
        price: "", 
        delivery_days: "1", 
        features: "",
        who_it_for: "",
        problem_solved: "",
        final_output: "",
        image_url: "",
        video_url: "",
        additional_images: [],
        pdf_url: ""
      });
      setMediaFile(null);
      setAdditionalImageFiles([]);
      setPdfFile(null);
      setPreviewUrl("");
      setThumbnailBlob(null);
      setThumbnailPreviewUrl("");
      fetchGigs();
    } catch (error: any) {
      console.error("Error saving gig:", error);
      toast({ title: "Failed to save gig", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("custom_gigs")
        .update({ is_active: !currentStatus })
        .eq("id", id);
        
      if (error) throw error;
      fetchGigs();
    } catch (error) {
      console.error("Error updating gig:", error);
      toast({ title: "Failed to update gig status", variant: "destructive" });
    }
  };

  const deleteGig = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gig?")) return;
    try {
      const { error } = await supabase.from("custom_gigs").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Gig deleted" });
      fetchGigs();
    } catch (error) {
      console.error("Error deleting gig:", error);
      toast({ title: "Failed to delete gig", variant: "destructive" });
    }
  };

  if (loading && gigs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Manage Gigs</h2>
        <button
          onClick={() => {
            if (isAdding || isEditing) {
              setIsAdding(false);
              setIsEditing(false);
              setEditingGigId(null);
            } else {
              setIsAdding(true);
            }
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-heading text-sm uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition-all"
        >
          {(isAdding || isEditing) ? <XCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {(isAdding || isEditing) ? "Cancel" : "Add Gig"}
        </button>
      </div>

      {(isAdding || isEditing) && (
        <form onSubmit={handleSaveGig} className="bg-card border border-border p-6 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary" placeholder="e.g. Single Game Graphic" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Price ($)</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary" placeholder="25.00" />
            </div>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">Delivery Time (Days)</label>
              <input required type="number" min="1" value={formData.delivery_days} onChange={e => setFormData({...formData, delivery_days: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-muted-foreground mb-1">What the Service Includes (HTML Supported)</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary min-h-[120px]" placeholder="Detailed breakdown of what is included..." />
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Who it's for</label>
                <textarea value={formData.who_it_for} onChange={e => setFormData({...formData, who_it_for: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary min-h-[100px]" placeholder="e.g. High school coaches, parents..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Problem it solves</label>
                <textarea value={formData.problem_solved} onChange={e => setFormData({...formData, problem_solved: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary min-h-[100px]" placeholder="e.g. Save time on editing, pro look..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Final output</label>
                <textarea value={formData.final_output} onChange={e => setFormData({...formData, final_output: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary min-h-[100px]" placeholder="e.g. 1080p MP4 file, ready for Social Media..." />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-muted-foreground mb-1">Key Highlights (Comma separated)</label>
              <input required value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary" placeholder="High Resolution, 2 Revisions, Custom Colors" />
            </div>

            {/* Media Upload Section */}
            <div className="md:col-span-2 border border-border bg-secondary/20 p-4 rounded-xl space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Main Media (Image or Video)</h3>
              
              <div className="flex items-center gap-4">
                <label className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-heading text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:brightness-110 transition-all">
                  <Upload className="w-4 h-4" />
                  Select Main Media
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                </label>
                {mediaFile && <span className="text-sm text-muted-foreground">{mediaFile.name}</span>}
                {isEditing && !mediaFile && formData.image_url && <span className="text-sm text-muted-foreground italic">Using existing media</span>}
              </div>

              {previewUrl && (mediaFile?.type.startsWith('video/') || (isEditing && formData.video_url)) && (
                <div className="bg-black/50 p-4 rounded-lg space-y-4 border border-border">
                  <p className="text-xs text-muted-foreground">Play the video and pause on the frame you want, then click "Capture Thumbnail".</p>
                  <video 
                    ref={videoRef} 
                    src={previewUrl} 
                    controls 
                    crossOrigin="anonymous"
                    className="w-full max-w-md aspect-video bg-black rounded border border-border" 
                  />
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={captureThumbnail} className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition">
                      <Camera className="w-4 h-4" /> Capture Thumbnail
                    </button>
                    {thumbnailPreviewUrl && (
                      <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                        <CheckCircle className="w-4 h-4" /> Thumbnail Captured!
                      </div>
                    )}
                  </div>
                  {thumbnailPreviewUrl && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Thumbnail Preview:</p>
                      <img src={thumbnailPreviewUrl} alt="Thumbnail preview" className="w-32 aspect-video object-cover rounded border border-border" />
                    </div>
                  )}
                </div>
              )}

              {previewUrl && (mediaFile?.type.startsWith('image/') || (isEditing && formData.image_url && !formData.video_url)) && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Main Image Preview:</p>
                  <img src={previewUrl} alt="Preview" className="w-32 aspect-[4/3] object-cover rounded border border-border" />
                </div>
              )}
            </div>

            {/* Additional Images Section */}
            <div className="md:col-span-2 border border-border bg-secondary/20 p-4 rounded-xl space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Additional Portfolio Images</h3>
              
              <div className="flex items-center gap-4">
                <label className="bg-secondary text-foreground border border-border px-4 py-2 rounded-md font-heading text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-secondary/80 transition-all">
                  <Plus className="w-4 h-4" />
                  Add More Images
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalImagesChange} />
                </label>
              </div>

              {/* Existing Additional Images */}
              {formData.additional_images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Existing Images:</p>
                  <div className="flex flex-wrap gap-3">
                    {formData.additional_images.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img src={url} alt={`Additional ${idx}`} className="w-24 h-24 object-cover rounded border border-border" />
                        <button 
                          type="button" 
                          onClick={() => removeExistingAdditionalImage(url)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Additional Image Files */}
              {additionalImageFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase">New Images to Upload:</p>
                  <div className="flex flex-wrap gap-3">
                    {additionalImageFiles.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <img src={URL.createObjectURL(file)} alt={`New ${idx}`} className="w-24 h-24 object-cover rounded border border-border" />
                        <button 
                          type="button" 
                          onClick={() => removeAdditionalImageFile(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PDF Upload Section */}
            <div className="md:col-span-2 border border-border bg-secondary/20 p-4 rounded-xl space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Information PDF (Optional)</h3>
              
              <div className="flex items-center gap-4">
                <label className="bg-secondary text-foreground border border-border px-4 py-2 rounded-md font-heading text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-secondary/80 transition-all">
                  <Upload className="w-4 h-4" />
                  Select PDF
                  <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfChange} />
                </label>
                {pdfFile && <span className="text-sm text-muted-foreground">{pdfFile.name}</span>}
                {formData.pdf_url && !pdfFile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-500 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Current PDF exists
                    </span>
                    <button type="button" onClick={() => setFormData({...formData, pdf_url: ""})} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button type="submit" disabled={uploading} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold uppercase tracking-wider hover:brightness-110 flex justify-center items-center gap-2">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? "Update Gig" : "Save Gig"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.length === 0 && !loading && (
          <div className="col-span-full bg-card border border-border p-8 rounded-xl text-center text-muted-foreground">
            No gigs found. Create one above!
          </div>
        )}
        {gigs.map(gig => (
          <div key={gig.id} className={`bg-card border rounded-xl overflow-hidden flex flex-col ${gig.is_active ? 'border-border' : 'border-red-500/30 opacity-70'}`}>
            <div className="relative w-full h-40 group">
              {gig.image_url ? (
                <img src={gig.image_url} alt={gig.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">No Media</div>
              )}
              {gig.video_url && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Film className="w-8 h-8 text-white/80" />
                </div>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight">{gig.title}</h3>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-bold">${gig.price}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{gig.description}</p>
              
              <div className="mt-auto space-y-3">
                <div className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded">
                  Delivery: {gig.delivery_days} day(s)
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <button onClick={() => toggleActive(gig.id, gig.is_active)} className={`text-xs px-3 py-1.5 rounded font-bold flex items-center gap-1 ${gig.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {gig.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {gig.is_active ? 'Active' : 'Inactive'}
                    </button>
                    <button onClick={() => handleEdit(gig)} className="text-xs px-3 py-1.5 rounded font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      Edit
                    </button>
                  </div>
                  <button onClick={() => deleteGig(gig.id)} className="text-red-500 p-1.5 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGigs;
