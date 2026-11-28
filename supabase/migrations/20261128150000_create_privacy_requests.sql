create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null,
  email text not null,
  request_type text not null check (request_type in ('access', 'correction', 'deletion')),
  details text not null,
  status text not null default 'pending' check (status in ('pending', 'in_review', 'completed', 'rejected'))
);

alter table public.privacy_requests enable row level security;

revoke all on table public.privacy_requests from anon, authenticated;

create index if not exists privacy_requests_created_at_idx
  on public.privacy_requests (created_at desc);

create index if not exists privacy_requests_status_idx
  on public.privacy_requests (status, created_at desc);
