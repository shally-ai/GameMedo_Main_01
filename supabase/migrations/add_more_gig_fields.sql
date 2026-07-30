-- Run this in your Supabase SQL Editor to add the new columns
ALTER TABLE public.custom_gigs 
ADD COLUMN IF NOT EXISTS additional_images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pdf_url TEXT;
