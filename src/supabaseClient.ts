// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

// Initialisation du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
