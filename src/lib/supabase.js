import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://arglmhqfrgfxorvayjnh.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZ2xtaHFmcmdmeG9ydmF5am5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0Nzk3ODIsImV4cCI6MjA5MzA1NTc4Mn0.vpgIuMj1KOB51On5acGxzL33kx8VlnNsr4NPKoFe93c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
