import React from "react";
import { Trash2, Image as ImageIcon, Video, Link as LinkIcon, Edit2 } from "lucide-react";
import { Sample } from "@/integrations/api";

interface SampleItemProps {
  sample: Sample;
  onEdit: (sample: Sample) => void;
  onDelete: (id: string) => void;
}


const SampleItem: React.FC<SampleItemProps> = ({ sample, onEdit, onDelete }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
      <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
        {sample.type === "video" ? (
          sample.thumbnail_url ? (
            <img 
              src={sample.thumbnail_url} 
              alt={sample.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <video 
              src={sample.media_url} 
              className="w-full h-full object-cover" 
              muted 
              loop 
              onMouseEnter={(e) => e.currentTarget.play()} 
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} 
            />
          )
        ) : (
          <img 
            src={sample.media_url} 
            alt={sample.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded text-white shadow-sm flex items-center gap-1">
          {sample.type === "video" ? <Video className="w-4 h-4" /> : sample.type === "website" ? <LinkIcon className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-bold text-foreground truncate">{sample.title}</h4>
        <div className="flex items-center justify-between mt-4">
          <a 
            href={sample.type === "website" ? sample.website_url : sample.media_url} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
          >
            <LinkIcon className="w-3 h-3" /> {sample.type === "website" ? "Visit Website" : "View Source"}
          </a>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(sample)}
              className="text-blue-500 hover:text-blue-400 p-2 rounded hover:bg-blue-500/10 transition-colors"
              title="Edit Sample"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(sample.id)}
              className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors"
              title="Delete Sample"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleItem;
