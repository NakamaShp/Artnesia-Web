// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // ⭐️ TAMBAHKAN LOG INI ⭐️
  console.log('MEMERIKSA KONEKSI SUPABASE CLIENT:', { 
    url: supabaseUrl, 
    key: supabaseAnonKey 
  });
  // -------------------------

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}