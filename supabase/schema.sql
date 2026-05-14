-- NutriLens Database Schema
-- Run this in your Supabase SQL Editor

-- Users table (for storing user info from OAuth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles table (for storing health preferences)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  name TEXT,
  age INTEGER,
  gender TEXT,
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  health_conditions TEXT[] DEFAULT '{}',
  diet_preference TEXT,
  fitness_goals TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Allow insert for authenticated users" ON users
  FOR INSERT WITH CHECK (true);

-- RLS Policies for user_profiles table
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = email);

-- For NextAuth/external auth, we need more permissive policies
-- Comment out the above and use these instead if using NextAuth:

-- DROP POLICY IF EXISTS "Users can view their own data" ON users;
-- DROP POLICY IF EXISTS "Users can update their own data" ON users;
-- DROP POLICY IF EXISTS "Allow insert for authenticated users" ON users;
-- DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
-- DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
-- DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;

-- More permissive policies for NextAuth integration
-- CREATE POLICY "Allow all operations for service role" ON users FOR ALL USING (true);
-- CREATE POLICY "Allow all operations for service role" ON user_profiles FOR ALL USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
