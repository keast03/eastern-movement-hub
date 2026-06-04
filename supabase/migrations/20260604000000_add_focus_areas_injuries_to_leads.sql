-- Add focus_areas and injuries columns to leads table
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS focus_areas TEXT,
  ADD COLUMN IF NOT EXISTS injuries TEXT;
