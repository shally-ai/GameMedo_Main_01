import { useState, useEffect, useRef } from "react";
import { api, Sample } from "@/integrations/api";
import { Loader2, Plus, Trash2, Image as ImageIcon, Video, Link as LinkIcon, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import SampleForm from "@/components/admin/samples/SampleForm";
import SampleItem from "@/components/admin/samples/SampleItem";

const AdminSamples = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"video" | "graphic" | "website">("graphic");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const data = await api.getSamples();
      setSamples(data);
    } catch (error) {
      console.error("Error fetching samples:", error);
      toast({ title: "Failed to load samples", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (type === "video") {
        const url = URL.createObjectURL(selectedFile);
        setVideoPreviewUrl(url);
        setThumbnailBlob(null);
        setThumbnailPreview(null);
      } else {
        setVideoPreviewUrl(null);
      }
    }
  };

  const captureThumbnail = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setThumbnailBlob(blob);
          setThumbnailPreview(canvas.toDataURL("image/jpeg"));
          toast({ title: "Thumbnail captured!" });
        }
      }, "image/jpeg", 0.8);
    }
  };

  const handleEdit = (sample: Sample) => {
    setEditingId(sample.id);
    setTitle(sample.title);
    setType(sample.type);
    setWebsiteUrl(sample.website_url || "");
    setFile(null);
    setVideoPreviewUrl(sample.type === "video" ? sample.media_url : null);
    setThumbnailBlob(null);
    setThumbnailPreview(sample.thumbnail_url || (sample.type !== "video" && sample.type !== "website" ? sample.media_url : null));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setType("graphic");
    setWebsiteUrl("");
    setFile(null);
    setVideoPreviewUrl(null);
    setThumbnailBlob(null);
    setThumbnailPreview(null);
    const fileInput = document.getElementById("sample-file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || (!file && !editingId && type !== "website")) {
      toast({ title: "Please provide a title and file", variant: "destructive" });
      return;
    }

    if (type === "website" && !websiteUrl) {
      toast({ title: "Please provide a website URL", variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let downloadURL = editingId ? samples.find(s => s.id === editingId)?.media_url || "" : "";
      let thumbURL = editingId ? samples.find(s => s.id === editingId)?.thumbnail_url || "" : "";
      let storagePath = editingId ? samples.find(s => s.id === editingId)?.storage_path || "" : "";

      if (file) {
        const uploadResult = await api.uploadFile(file);
        if (uploadResult.error) throw new Error(uploadResult.error);
        downloadURL = uploadResult.url;
        storagePath = uploadResult.path;
      }

      if (thumbnailBlob) {
        const thumbFile = new File([thumbnailBlob], "thumb.jpg", { type: "image/jpeg" });
        const thumbUploadResult = await api.uploadFile(thumbFile);
        if (!thumbUploadResult.error) {
          thumbURL = thumbUploadResult.url;
        }
      }

      const sampleData = {
        title,
        type,
        media_url: downloadURL,
        thumbnail_url: thumbURL,
        website_url: type === "website" ? websiteUrl : "",
        storage_path: storagePath,
      };

      if (editingId) {
        await api.updateSample(editingId, sampleData);
        toast({ title: "Sample updated successfully!" });
        setEditingId(null);
      } else {
        await api.addSample(sampleData);
        toast({ title: "Sample added successfully!" });
      }
      
      setTitle("");
      setWebsiteUrl("");
      setFile(null);
      setVideoPreviewUrl(null);
      setThumbnailBlob(null);
      setThumbnailPreview(null);
      const fileInput = document.getElementById("sample-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      fetchSamples();
      setUploading(false);
    } catch (error: unknown) {
      console.error("Error saving sample:", error);
      const message = error instanceof Error ? error.message : "Failed to save sample";
      toast({ title: "Failed to save sample", description: message, variant: "destructive" });
      setUploading(false);
    }
  };

  const handleDelete = async (sampleId: string) => {
    if (!confirm("Are you sure you want to delete this sample?")) return;

    try {
      const sample = samples.find(s => s.id === sampleId);
      await api.deleteSample(sampleId, sample?.storage_path);
      toast({ title: "Sample deleted" });
      fetchSamples();
    } catch (error) {
      console.error("Error deleting sample:", error);
      toast({ title: "Failed to delete sample", variant: "destructive" });
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
      <div className="flex justify-between items-center bg-background/80 backdrop-blur-md pt-2 pb-4 z-10 border-b border-border">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Manage Samples</h2>
      </div>

      <SampleForm 
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        websiteUrl={websiteUrl}
        setWebsiteUrl={setWebsiteUrl}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        uploading={uploading}
        uploadProgress={uploadProgress}
        videoPreviewUrl={videoPreviewUrl}
        videoRef={videoRef}
        captureThumbnail={captureThumbnail}
        thumbnailPreview={thumbnailPreview}
        isEditing={!!editingId}
        onCancelEdit={handleCancelEdit}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Samples List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="font-heading text-lg font-bold uppercase">Uploaded Samples</h3>
          <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded">
             {samples.length} TOTAL
          </span>
        </div>
        
        {samples.length === 0 ? (
          <p className="text-muted-foreground text-sm italic py-8 border border-dashed border-border rounded-lg text-center font-medium">No samples uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample) => (
              <SampleItem 
                key={sample.id}
                sample={sample}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminSamples;
