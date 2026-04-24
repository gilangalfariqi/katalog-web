import { createClient } from '@supabase/supabase-js';

// Supabase Client requires the base URL without /rest/v1/
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wxpadhnnawisiuztpkox.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZR49_kzl7eRKRBmu4Be1tg_ilc5uorD';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
