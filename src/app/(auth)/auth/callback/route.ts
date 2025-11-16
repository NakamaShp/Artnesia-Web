// src/app/(auth)/callback/route.ts

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // 1. Dapatkan cookieStore secara sinkronus
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // 2. Tentukan fungsi 'get'
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          // 3. Tentukan 'set' dengan 'CookieOptions'
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // Menangani error jika terjadi (misal: read-only headers)
            }
          },
          // 4. Tentukan 'remove' dengan 'CookieOptions'
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.delete({ name, ...options });
            } catch (error) {
              // Menangani error jika terjadi
            }
          },
        },
      }
    );

    // 5. 'await' sekarang valid karena 'GET' adalah 'async'
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // Arahkan ke halaman error jika gagal
  console.error('Error exchanging code for session');
  return NextResponse.redirect(`${origin}/SignIn?error=auth_failed`);
}