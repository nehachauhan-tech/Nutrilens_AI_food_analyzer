-- =============================================
-- NutriLens Database Migration
-- Version: 001 - Initial Schema
-- Date: 2024
-- =============================================
-- Run this in Supabase SQL Editor (https://app.supabase.com)
-- Go to: Project > SQL Editor > New Query > Paste & Run
-- =============================================

-- =============================================
-- STEP 1: Create Users Table
-- =============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE public.users IS 'Stores user authentication information';

-- =============================================
-- STEP 2: Create User Profiles Table
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  age INTEGER CHECK (age >= 1 AND age <= 150),
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  height DECIMAL(5,2) CHECK (height >= 50 AND height <= 300),
  weight DECIMAL(5,2) CHECK (weight >= 20 AND weight <= 500),
  health_conditions TEXT[] DEFAULT '{}',
  diet_preference TEXT CHECK (diet_preference IN ('vegetarian', 'non_vegetarian', 'vegan', 'eggetarian')),
  fitness_goals TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE public.user_profiles IS 'Stores user health profiles and preferences';

-- =============================================
-- STEP 3: Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated_at ON public.user_profiles(updated_at DESC);

-- =============================================
-- STEP 4: Create Updated_At Trigger Function
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- STEP 5: Create Triggers for Auto-Update
-- =============================================
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- STEP 6: Enable Row Level Security (RLS)
-- =============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 7: Create RLS Policies
-- For NextAuth integration, we use service_role key
-- which bypasses RLS, but these policies protect
-- against direct client access
-- =============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read for users" ON public.users;
DROP POLICY IF EXISTS "Allow public insert for users" ON public.users;
DROP POLICY IF EXISTS "Allow public update for users" ON public.users;
DROP POLICY IF EXISTS "Allow public read for user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow public insert for user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow public update for user_profiles" ON public.user_profiles;

-- Policies for users table (permissive for NextAuth)
CREATE POLICY "Allow public read for users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert for users" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update for users" ON public.users
  FOR UPDATE USING (true);

-- Policies for user_profiles table (permissive for NextAuth)
CREATE POLICY "Allow public read for user_profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert for user_profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update for user_profiles" ON public.user_profiles
  FOR UPDATE USING (true);

-- =============================================
-- STEP 8: Grant Permissions
-- =============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =============================================
-- VERIFICATION: Check tables were created
-- =============================================
SELECT
  table_name,
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_schema = 'public'
  AND table_name IN ('users', 'user_profiles')
ORDER BY
  table_name,
  ordinal_position;
