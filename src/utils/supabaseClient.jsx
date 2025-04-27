import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey);

// const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: false,
//   },
// });

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;