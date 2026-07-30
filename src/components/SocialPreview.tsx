import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, ThumbsUp, MessageSquare, Repeat2 } from 'lucide-react';
import logo from "@/assets/logo.jpg";

interface SocialPreviewProps {
  type: "video" | "graphic";
  mediaUrl: string;
  platform: "instagram" | "facebook" | "twitter" | "original";
  title: string;
}

const SocialPreview = ({ type, mediaUrl, platform, title }: SocialPreviewProps) => {
  if (platform === "original") {
    return type === "video" ? (
      <video src={mediaUrl} className="max-w-full max-h-full shadow-2xl" controls autoPlay playsInline />
    ) : (
      <img src={mediaUrl} alt={title} className="max-w-full max-h-full shadow-2xl object-contain" />
    );
  }

  const ProfileHeader = ({ name, handle, time }: { name: string, handle?: string, time?: string }) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
          <img src={logo} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-sm leading-tight text-white">{name}</h4>
          {handle && <p className="text-xs text-muted-foreground">{handle}</p>}
          {time && <p className="text-[10px] text-muted-foreground">{time}</p>}
        </div>
      </div>
      <MoreHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
    </div>
  );

  const MediaContent = () => (
    <div className="relative aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden border-y border-border/50">
      {type === "video" ? (
        <video src={mediaUrl} className="w-full h-full object-contain" autoPlay muted loop playsInline />
      ) : (
        <img src={mediaUrl} alt="Preview" className="w-full h-full object-contain" />
      )}
    </div>
  );

  if (platform === "instagram") {
    return (
      <div className="w-full max-w-md mx-auto bg-black border border-border rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <ProfileHeader name="gamemedo" handle="Game Day Ready" />
        <MediaContent />
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Heart className="w-6 h-6 text-white cursor-pointer hover:text-red-500 transition-colors" />
              <MessageCircle className="w-6 h-6 text-white cursor-pointer" />
              <Send className="w-6 h-6 text-white cursor-pointer" />
            </div>
            <Bookmark className="w-6 h-6 text-white cursor-pointer" />
          </div>
          <p className="text-sm text-white font-bold mb-1">1,284 likes</p>
          <p className="text-sm text-white">
            <span className="font-bold mr-2">gamemedo</span>
            {title} 🔥 Another elite design for our varsity partners. #GameMedo #SportsDesign
          </p>
          <p className="text-[10px] text-muted-foreground uppercase mt-2 tracking-widest">2 hours ago</p>
        </div>
      </div>
    );
  }

  if (platform === "facebook") {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#242526] border border-border rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 text-[#e4e6eb]">
        <ProfileHeader name="GameMedo" time="Just now · 🌍" />
        <div className="px-4 pb-3 text-sm">
          {title} - Pushing the boundaries of sports media. Elite visuals for elite athletes. 🏆
        </div>
        <MediaContent />
        <div className="p-2 border-t border-border flex items-center justify-around">
          <button className="flex items-center gap-2 hover:bg-white/10 px-6 py-2 rounded transition-colors text-sm font-semibold">
            <ThumbsUp className="w-5 h-5" /> Like
          </button>
          <button className="flex items-center gap-2 hover:bg-white/10 px-6 py-2 rounded transition-colors text-sm font-semibold">
            <MessageSquare className="w-5 h-5" /> Comment
          </button>
          <button className="flex items-center gap-2 hover:bg-white/10 px-6 py-2 rounded transition-colors text-sm font-semibold">
            <Share2 className="w-5 h-5" /> Share
          </button>
        </div>
      </div>
    );
  }

  if (platform === "twitter") {
    return (
      <div className="w-full max-w-xl mx-auto bg-black border border-border rounded-2xl p-4 shadow-2xl animate-in zoom-in-95 duration-300 border-border/60">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
            <img src={logo} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white text-base">GameMedo</span>
                <span className="text-muted-foreground text-sm">@GameMedo · 2h</span>
              </div>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-white text-[15px] mb-3 leading-normal">
              Fresh drop! {title}. The standard for high school athletics just got higher. 🚀
            </p>
            <div className="rounded-2xl overflow-hidden border border-border/50">
               <MediaContent />
            </div>
            <div className="flex items-center justify-between mt-4 max-w-md text-muted-foreground">
              <MessageCircle className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
              <Repeat2 className="w-5 h-5 cursor-pointer hover:text-green-500 transition-colors" />
              <Heart className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
              <Share2 className="w-5 h-5 cursor-pointer hover:text-sky-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SocialPreview;
