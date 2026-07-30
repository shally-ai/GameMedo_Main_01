import React from "react";
import { Loader2, Plus } from "lucide-react";

interface HeroMediaFormProps {
  title: string;
  setTitle: (val: string) => void;
  type: "video" | "graphic";
  setType: (val: "video" | "graphic") => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
  uploadProgress: number;
  itemCount: number;
}

const HeroMediaForm: React.FC<HeroMediaFormProps> = ({
  title, setTitle, type, setType, handleFileChange, handleSubmit, uploading, uploadProgress, itemCount
}) => {
  return (
    <section className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
        <h3 className="font-heading text-lg font-bold uppercase">Add New Hero Item</h3>
        <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded">
           {itemCount} / 6 USED
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Title / Description</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Baseball Highlight Edit"
              disabled={itemCount >= 6 || uploading}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "video" | "graphic")}
              disabled={itemCount >= 6 || uploading}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none disabled:opacity-50"
            >
              <option value="graphic">Graphic Design / Image</option>
              <option value="video">Video Edit</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Upload File (Limit ~50MB)</label>
          <input
            id="hero-media-file"
            type="file"
            accept={type === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
            disabled={itemCount >= 6 || uploading}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-muted-foreground focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80 disabled:opacity-50"
          />
        </div>

        {uploading && (
          <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !title || itemCount >= 6}
          className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2 rounded shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {uploading ? "Uploading..." : itemCount >= 6 ? "Grid Full" : "Add Hero Item"}
        </button>
      </form>
    </section>
  );
};

export default HeroMediaForm;
