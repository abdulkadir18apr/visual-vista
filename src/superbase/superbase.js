import { createClient } from '@supabase/supabase-js';


const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const superBaseUrl = import.meta.env.VITE_SUPABASE_URL;



export const supabase = createClient(`${superBaseUrl}`, `${apiKey}`);
