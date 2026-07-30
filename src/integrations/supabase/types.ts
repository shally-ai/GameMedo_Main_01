export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
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
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          category?: string;
          author?: string;
          published_at?: string | null;
          featured_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          is_published?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          category?: string;
          author?: string;
          published_at?: string | null;
          featured_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          is_published?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
  };
}
