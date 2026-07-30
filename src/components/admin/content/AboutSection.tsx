import React, { useState } from "react";
import { Sparkles, Users, Zap, ShieldCheck, Upload, Film, Loader2, XCircle } from "lucide-react";
import { api } from "@/integrations/api";
import { toast } from "@/hooks/use-toast";

interface AboutSectionProps {
  data: {
    title: string;
    subtitle: string;
    mission: string;
    videoUrl?: string;
    stats: { label: string; value: string }[];
  };
  onChange: (field: string, value: any) => void;
  onStatChange: (index: number, field: string, value: string) => void;
}

const iconMap = [Users, Sparkles, Zap, ShieldCheck];

const AboutSection: React.FC<AboutSectionProps> = ({ data, onChange, onStatChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        toast({ title: "Please select a video file", variant: "destructive" });
        return;
      }

      setUploading(true);
      try {
        const result = await api.uploadFile(file);
        if (result.error) throw new Error(result.error);
        onChange('videoUrl', result.url);
        toast({ title: "About Us video uploaded successfully!" });
      } catch (error: any) {
        console.error("Error uploading about video:", error);
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <section className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-lg font-bold uppercase">About Page Content</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Hero Title</label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Hero Subtitle</label>
            <textarea
              value={data.subtitle || ""}
              onChange={(e) => onChange('subtitle', e.target.value)}
              rows={2}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Mission Statement</label>
            <textarea
              value={data.mission || ""}
              onChange={(e) => onChange('mission', e.target.value)}
              rows={4}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">About Us Video</label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 bg-secondary/10 flex flex-col items-center justify-center space-y-4">
            {data.videoUrl ? (
              <div className="w-full space-y-4">
                <video 
                  src={data.videoUrl} 
                  className="w-full aspect-video rounded-lg border border-border bg-black" 
                  controls 
                />
                <div className="flex justify-center">
                  <button 
                    type="button"
                    onClick={() => onChange('videoUrl', '')}
                    className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 font-bold uppercase tracking-widest"
                  >
                    <XCircle className="w-4 h-4" /> Remove Video
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Film className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-widest mb-1">Upload About Video</p>
                  <p className="text-xs text-muted-foreground">MP4, WebM or Ogg (Max 50MB)</p>
                </div>
                <label className="bg-primary text-primary-foreground px-6 py-2 rounded font-heading text-xs uppercase tracking-widest cursor-pointer hover:brightness-110 transition disabled:opacity-50 flex items-center gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Uploading..." : "Select Video"}
                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={uploading} />
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-primary">Statistics (4 Items)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.stats?.map((stat, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div key={index} className="p-4 border border-border rounded bg-secondary/20 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-heading tracking-widest uppercase text-muted-foreground">Stat {index + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value || ""}
                      onChange={(e) => onStatChange(index, 'value', e.target.value)}
                      className="w-full bg-secondary border border-border rounded px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => onStatChange(index, 'label', e.target.value)}
                      className="w-full bg-secondary border border-border rounded px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
