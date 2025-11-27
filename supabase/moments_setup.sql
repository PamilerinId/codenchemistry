-- Create the table for storing photo metadata
create table public.moments (
  id uuid default gen_random_uuid() primary key,
  image_path text not null,
  caption text,
  guest_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.moments enable row level security;

-- Create a policy to allow anyone to insert (upload)
create policy "Anyone can upload moments"
  on public.moments for insert
  with check (true);

-- Create a policy to allow anyone to view (gallery)
create policy "Anyone can view moments"
  on public.moments for select
  using (true);

-- Create the storage bucket for photos
insert into storage.buckets (id, name, public)
values ('wedding-moments', 'wedding-moments', true);

-- Create a policy to allow public access to the bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'wedding-moments' );

-- Create a policy to allow anyone to upload to the bucket
create policy "Anyone can upload"
  on storage.objects for insert
  with check ( bucket_id = 'wedding-moments' );
