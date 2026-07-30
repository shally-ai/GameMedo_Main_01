-- Run this in your Supabase SQL Editor to add the new columns
ALTER TABLE public.custom_gigs 
ADD COLUMN IF NOT EXISTS who_it_for TEXT,
ADD COLUMN IF NOT EXISTS problem_solved TEXT,
ADD COLUMN IF NOT EXISTS final_output TEXT;
