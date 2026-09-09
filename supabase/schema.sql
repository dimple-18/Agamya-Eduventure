-- Run this in the Supabase SQL editor after creating a project.
-- https://supabase.com/dashboard → SQL → New query

create extension if not exists "pgcrypto";

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default 'Student',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  meta text,
  image text,
  projects text,
  mentoring text,
  category text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  label text not null,
  description text not null,
  photos text[] not null default '{}',
  date text not null,
  location text,
  students text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_sort_idx on testimonials (sort_order, created_at);
create index if not exists enquiries_created_idx on enquiries (created_at desc);
create index if not exists enquiries_status_idx on enquiries (status);

alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table enquiries enable row level security;
alter table programs enable row level security;
alter table gallery_events enable row level security;

create policy "public_read_testimonials"
  on testimonials for select
  using (published = true);

create policy "admin_manage_testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "public_read_site_settings"
  on site_settings for select
  using (true);

create policy "admin_manage_site_settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "public_insert_enquiries"
  on enquiries for insert
  with check (true);

create policy "admin_manage_enquiries"
  on enquiries for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "public_read_programs"
  on programs for select
  using (published = true);

create policy "admin_manage_programs"
  on programs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "public_read_gallery_events"
  on gallery_events for select
  using (published = true);

create policy "admin_manage_gallery_events"
  on gallery_events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table if not exists student_outcomes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  description text not null,
  student_name text not null,
  badge_label text not null,
  badge_tone text not null default 'teal' check (badge_tone in ('teal', 'orange', 'purple', 'green')),
  tools text[] not null default '{}',
  image_url text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists student_outcomes_sort_idx on student_outcomes (sort_order, created_at);

alter table student_outcomes enable row level security;

create policy "public_read_student_outcomes"
  on student_outcomes for select
  using (published = true);

create policy "admin_manage_student_outcomes"
  on student_outcomes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
