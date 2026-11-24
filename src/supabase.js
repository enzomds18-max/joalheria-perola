import { createClient } from '@supabase/supabase-js';

// Troque pelos dados do SEU projeto (Supabase > Project Settings > API)
const SUPABASE_URL = 'https://khgkaqaakowzczhluxgr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_WE87AfU-Qp4WmhsAKJfMuQ_EWJr3w_b';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
