import React, { RefObject, useState, useCallback } from "react";
import { Loader2, Plus, Camera, SkipBack, SkipForward, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface SampleFormProps {
  title: string;
  setTitle: (val: string) => void;
  type: "video" | "graphic" | "website";
  setType: (val: "video" | "graphic" | "website") => void;
  websiteUrl: string;
  setWebsiteUrl: (val: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
  uploadProgress: number;
  videoPreviewUrl: string | null;
  videoRef: RefObject<HTMLVideoElement>;
  captureThumbnail: () => void;
  thumbnailPreview: string | null;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

const SampleForm: React.FC<SampleFormProps> = ({
  title, setTitle, type, setType, websiteUrl, setWebsiteUrl, handleFileChange, handleSubmit,
  uploading, uploadProgress, videoPreviewUrl, videoRef, captureThumbnail, thumbnailPreview,
  isEditing, onCancelEdit
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekInput, setSeekInput] = useState("");

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${ms}`;
  };

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + delta));
  }, [videoRef]);

  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeekInput(e.target.value);
  };

  const applySeekInput = () => {
    const v = videoRef.current;
    if (!v) return;
    // Accept formats: ss, mm:ss, mm:ss.d
    const parts = seekInput.trim().split(":");
    let secs = 0;
    if (parts.length === 1) {
      secs = parseFloat(parts[0]) || 0;
    } else {
      secs = (parseInt(parts[0]) || 0) * 60 + (parseFloat(parts[1]) || 0);
    }
    secs = Math.max(0, Math.min(v.duration, secs));
    v.pause();
    v.currentTime = secs;
    setSeekInput("");
  };

  return (
    <section className="bg-card border border-border rounded-lg p-6 relative">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
        <h3 className="font-heading text-lg font-bold uppercase">{isEditing ? "Edit Sample" : "Add New Sample"}</h3>
        {isEditing && (
          <button type="button" onClick={onCancelEdit} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            Cancel Edit
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Highlight Edit"
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "video" | "graphic" | "website")}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="graphic">Graphic Design</option>
              <option value="video">Video Edit</option>
              <option value="website">Website</option>
            </select>
          </div>
        </div>
        
        {type === "website" && (
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Website URL</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none font-mono text-sm"
            />
          </div>
        )}
        
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            {type === "website" ? "Upload Thumbnail Image" : "Upload File (Limit ~50MB)"}
            {isEditing && " (Leave empty to keep current file)"}
          </label>
          <input
            id="sample-file"
            type="file"
            accept={type === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-muted-foreground focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
          />
        </div>

        {type === "video" && videoPreviewUrl && (
          <div className="space-y-4 p-4 bg-secondary/50 rounded-lg border border-border">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-foreground">Pick Thumbnail Frame</span>
              <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">Seek to the exact moment, then capture</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Video + controls */}
              <div className="flex-1 space-y-3">
                <div className="relative rounded-lg overflow-hidden border border-border bg-black shadow-md">
                  <video
                    ref={videoRef}
                    src={videoPreviewUrl}
                    crossOrigin="anonymous"
                    className="w-full rounded-lg"
                    controls
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => {
                      setDuration(e.currentTarget.duration);
                      setCurrentTime(0);
                    }}
                  />
                  {/* Live timestamp badge */}
                  <div className="absolute bottom-12 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full pointer-events-none">
                    <Clock className="w-3 h-3 text-primary" />
                    <span className="font-mono text-[11px] text-white tracking-wider">{formatTime(currentTime)}</span>
                    <span className="text-[10px] text-white/40">/</span>
                    <span className="font-mono text-[10px] text-white/60">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Seek controls row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Step buttons */}
                  <button type="button" onClick={() => seekBy(-5)}
                    className="flex items-center gap-1 bg-secondary border border-border px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/70 active:scale-95 transition"
                    title="Back 5 seconds">
                    <SkipBack className="w-3.5 h-3.5" /> 5s
                  </button>
                  <button type="button" onClick={() => seekBy(-1)}
                    className="flex items-center gap-1 bg-secondary border border-border px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/70 active:scale-95 transition"
                    title="Back 1 second">
                    <ChevronLeft className="w-3.5 h-3.5" /> 1s
                  </button>
                  <button type="button" onClick={() => seekBy(1)}
                    className="flex items-center gap-1 bg-secondary border border-border px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/70 active:scale-95 transition"
                    title="Forward 1 second">
                    1s <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => seekBy(5)}
                    className="flex items-center gap-1 bg-secondary border border-border px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/70 active:scale-95 transition"
                    title="Forward 5 seconds">
                    5s <SkipForward className="w-3.5 h-3.5" />
                  </button>

                  {/* Jump-to time input */}
                  <div className="flex items-center gap-1 ml-auto">
                    <input
                      type="text"
                      value={seekInput}
                      onChange={handleSeekInput}
                      onKeyDown={(e) => e.key === "Enter" && applySeekInput()}
                      placeholder="mm:ss"
                      className="w-20 bg-secondary border border-border rounded px-2 py-1.5 text-foreground focus:border-primary focus:outline-none font-mono text-xs text-center"
                    />
                    <button
                      type="button"
                      onClick={applySeekInput}
                      className="bg-secondary border border-border px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/70 active:scale-95 transition"
                    >
                      Go
                    </button>
                  </div>
                </div>

                {/* Capture button */}
                <button
                  type="button"
                  onClick={captureThumbnail}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition text-[11px] font-bold uppercase tracking-[0.2em]"
                >
                  <Camera className="w-4 h-4" /> Capture Frame as Thumbnail
                </button>
              </div>

              {/* Thumbnail preview panel */}
              <div className="w-full lg:w-56 shrink-0 space-y-2">
                <label className="text-xs ml-1 tracking-widest uppercase text-muted-foreground block">Thumbnail Preview {isEditing && " (Leave empty to keep current)"}</label>
                <div className="aspect-video bg-black rounded-lg border border-border overflow-hidden flex items-center justify-center relative shadow-inner">
                  {thumbnailPreview ? (
                    <>
                      <img src={thumbnailPreview} className="w-full h-full object-cover" alt="Captured preview" />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="bg-primary/90 text-primary-foreground text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                          ✓ Thumbnail Set
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest text-center px-4">No frame captured yet</span>
                    </div>
                  )}
                </div>
                {thumbnailPreview && (
                  <p className="text-[10px] text-center text-muted-foreground">Click capture again to replace</p>
                )}
              </div>
            </div>
          </div>
        )}

        {uploading && (
          <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading || !title}
            className="flex-1 bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-4 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {uploading ? "Processing..." : isEditing ? "Update Sample" : "Add New Sample"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={uploading}
              className="bg-secondary text-foreground font-heading text-sm tracking-widest uppercase px-6 py-4 rounded-xl hover:bg-secondary/80 active:scale-[0.98] transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

// We need to import Edit2 at the top
import { Edit2 } from "lucide-react";

export default SampleForm;
