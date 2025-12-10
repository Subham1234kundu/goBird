-- STEP 1: Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 2: Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- STEP 3: Create policy to allow users to manage their own profile
CREATE POLICY "Users can manage own profile"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- STEP 4: Create storage bucket for profile avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-avatars', 'profile-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- STEP 5: Allow anyone to view avatars
CREATE POLICY "Public avatar access" 
  ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'profile-avatars');

-- STEP 6: Allow users to upload their own avatars
CREATE POLICY "Users can upload avatars" 
  ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- STEP 7: Allow users to update their own avatars
CREATE POLICY "Users can update avatars" 
  ON storage.objects
  FOR UPDATE 
  USING (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- STEP 8: Allow users to delete their own avatars
CREATE POLICY "Users can delete avatars" 
  ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Done! The profiles table is now set up.
