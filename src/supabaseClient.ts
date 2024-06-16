// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'public-anon-key'; // Replace with your Supabase public API key

export const supabase = createClient(supabaseUrl, supabaseKey);
