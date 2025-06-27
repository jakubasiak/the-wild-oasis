// src/supabaseClient.js (lub gdziekolwiek inicjalizujesz klienta)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Błąd: Brak zmiennych środowiskowych SUPABASE_URL lub SUPABASE_KEY.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;