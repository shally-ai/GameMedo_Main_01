-- Run this in your Supabase SQL Editor
-- If you already created the table, run this line alone to add video support:
-- ALTER TABLE public.custom_gigs ADD COLUMN video_url TEXT;

-- 1. Create the custom_gigs table
CREATE TABLE IF NOT EXISTS public.custom_gigs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    delivery_days INTEGER DEFAULT 1,
    image_url TEXT,
    video_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.custom_gigs ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow public read access to active gigs
CREATE POLICY "Enable read access for all users" ON public.custom_gigs
    FOR SELECT USING (is_active = true);

-- Allow admins to do everything (you can modify this if you have specific admin roles)
CREATE POLICY "Enable all access for authenticated users" ON public.custom_gigs
    FOR ALL USING (auth.role() = 'authenticated');
