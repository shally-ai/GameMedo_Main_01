import { supabase } from "./supabase/client";

export interface Sample {
  id: string;
  title: string;
  type: "video" | "graphic" | "website";
  media_url: string;
  thumbnail_url?: string;
  website_url?: string;
  storage_path?: string;
  created_at: any;
}

export interface NewSample {
  title: string;
  type: "video" | "graphic" | "website";
  media_url: string;
  thumbnail_url?: string;
  website_url?: string;
  storage_path?: string;
}

export interface BookingData {
  name: string;
  email: string;
  whatsapp: string;
  preferred_date: string;
  preferred_time: string;
}

export interface Booking extends BookingData {
  id: string;
  created_at: any;
}

export const api = {
  // Bookings
  getBookings: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from("bookings")
      .select("preferred_date, preferred_time")
      .order("created_at", { ascending: false });
    // Return empty array on error (e.g. RLS blocks anon reads) — slots will all appear available
    if (error) {
      console.warn("Could not fetch booked slots (RLS may restrict anon reads):", error.message);
      return [];
    }
    return data as Booking[];
  },
  getAdminBookings: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Booking[];
  },
  addBooking: async (bookingData: BookingData) => {
    const { error } = await supabase
      .from("bookings")
      .insert([{ ...bookingData, created_at: new Date().toISOString() }]);
    if (error) throw error;
    return { success: true };
  },

  // Samples
  getSamples: async (): Promise<Sample[]> => {
    const { data, error } = await supabase
      .from("samples")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Sample[];
  },
  addSample: async (sampleData: NewSample) => {
    const { data, error } = await supabase
      .from("samples")
      .insert([{ ...sampleData, created_at: new Date().toISOString() }])
      .select()
      .single();
    if (error) throw error;
    return { success: true, id: data.id };
  },
  updateSample: async (id: string, updates: Partial<NewSample>) => {
    const { data, error } = await supabase
      .from("samples")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  },
  deleteSample: async (id: string, storagePath?: string) => {
    try {
      // 1. Delete from Storage if path exists
      if (storagePath) {
        const { error: storageErr } = await supabase.storage
          .from("media")
          .remove([storagePath]);
        if (storageErr) console.error("Error deleting file from storage:", storageErr);
      }

      // 2. Delete from Database
      const { error } = await supabase.from("samples").delete().eq("id", id);
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error("Error in deleteSample:", error);
      throw error;
    }
  },

  // Upload
  uploadFile: async (file: File) => {
    try {
      // Check authentication before upload
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        console.error("Upload attempt failed: No active session found.");
        return { error: "Authentication required for upload" };
      }

      const storagePath = `${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("media")
        .upload(storagePath, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        console.error("Supabase Storage Upload Error Details:", {
          message: error.message,
          name: error.name,
          cause: error.cause,
          path: storagePath
        });
        throw error;
      }

      // Get the download URL
      const { data: publicUrlData } = supabase.storage
        .from("media")
        .getPublicUrl(data.path);

      return { url: publicUrlData.publicUrl, path: data.path };
    } catch (error: any) {
      console.error("Caught Supabase Storage Upload Exception:", error);
      return { error: error.message || "Upload failed" };
    }
  },

  // Hero Media
  getHeroMedia: async () => {
    const { data, error } = await supabase
      .from("hero_media")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching hero media:", error);
      throw error;
    }
    return data;
  },
  addHeroMedia: async (data: any) => {
    const { data: insertedData, error } = await supabase
      .from("hero_media")
      .insert([{ 
        title: data.title,
        type: data.type,
        media_url: data.mediaUrl || data.media_url,
        storage_path: data.storagePath || data.storage_path,
        created_at: Date.now() 
      }])
      .select()
      .single();
    if (error) {
      console.error("Error adding hero media:", error);
      throw error;
    }
    return { success: true, id: insertedData.id };
  },
  deleteHeroMedia: async (id: string, storagePath?: string) => {
    try {
      // 1. Delete from Storage
      if (storagePath) {
        const { error: storageErr } = await supabase.storage
          .from("media")
          .remove([storagePath]);
        if (storageErr) console.error("Error deleting hero file:", storageErr);
      }

      // 2. Delete from Database
      const { error } = await supabase.from("hero_media").delete().eq("id", id);
      if (error) {
        console.error("Error deleting hero media record:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in deleteHeroMedia:", error);
      throw error;
    }
  },
};
