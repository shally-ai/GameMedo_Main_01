import React from "react";
import { Trash2, Image as ImageIcon, Video, Link as LinkIcon } from "lucide-react";

interface HeroMedia {
  id: string;
  title: string;
  type: "video" | "graphic";
  media_url: string;
  storage_path?: string;
  created_at: number;
}

interface HeroMediaItemProps {
  media: HeroMedia;
  onDelete: (id: string, path?: string) => void;
}

const HeroMediaItem: React.FC<HeroMediaItemProps> = ({ media, onDelete }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
      <div className="aspect-[4/3] bg-black relative flex items-center justify-center overflow-hidden">
        {media.type === "video" ? (
           <video 
             src={media.media_url} 
             className="w-full h-full object-cover" 
             muted 
             loop 
             onMouseEnter={(e) => e.currentTarget.play()} 
             onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} 
           />
        ) : (
          <img 
            src={media.media_url} 
            alt={media.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded text-white shadow-sm flex items-center gap-1">
          {media.type === "video" ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-bold text-foreground truncate">{media.title}</h4>
        <div className="flex items-center justify-between mt-4">
          <a 
            href={media.media_url} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
          >
            <LinkIcon className="w-3 h-3" /> External Link
          </a>
          
          <button
            onClick={() => onDelete(media.id, media.storage_path)}
            className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors"
            title="Delete Item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroMediaItem;
