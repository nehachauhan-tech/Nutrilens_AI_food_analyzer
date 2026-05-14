# Supabase Database Setup for NutriLens

## Quick Setup Guide

### Step 1: Open Supabase SQL Editor

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Migration

Copy and paste the contents of `migrations/001_initial_schema.sql` into the SQL Editor and click **Run**.

---

## Individual SQL Queries

If you prefer to run queries one at a time, use these:

### Query 1: Create Users Table

```sql
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Query 2: Create User Profiles Table

```sql
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
```

### Query 3: Create Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
```

### Query 4: Create Auto-Update Trigger

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

### Query 5: Enable RLS and Create Policies

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert for users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update for users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow public read for user_profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert for user_profiles" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update for user_profiles" ON public.user_profiles FOR UPDATE USING (true);
```

### Query 6: Grant Permissions

```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
```

---

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | TEXT | User's email (unique) |
| name | TEXT | User's display name |
| avatar_url | TEXT | Profile picture URL |
| provider | TEXT | Auth provider (google/email) |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### User Profiles Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | TEXT | User's email (unique) |
| name | TEXT | Full name |
| age | INTEGER | User's age (1-150) |
| gender | TEXT | male/female/other/prefer_not_to_say |
| height | DECIMAL | Height in cm (50-300) |
| weight | DECIMAL | Weight in kg (20-500) |
| health_conditions | TEXT[] | Array of health conditions |
| diet_preference | TEXT | vegetarian/non_vegetarian/vegan/eggetarian |
| fitness_goals | TEXT[] | Array of fitness goals |
| created_at | TIMESTAMP | Profile creation time |
| updated_at | TIMESTAMP | Last update time |

### Health Conditions Values

- `diabetes`
- `high_bp`
- `low_bp`
- `high_sugar`
- `cholesterol`
- `heart_disease`
- `kidney_disease`
- `thyroid`
- `gluten_allergy`
- `lactose_intolerance`
- `nut_allergy`
- `seafood_allergy`
- `soy_allergy`
- `egg_allergy`

### Fitness Goals Values

- `weight_loss`
- `weight_gain`
- `muscle_building`
- `gym_user`
- `maintain_weight`
- `athletic_performance`

---

## Verification

After running the migration, verify tables exist:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Check table structure:

```sql
\d public.users
\d public.user_profiles
```
