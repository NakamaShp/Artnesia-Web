import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Kalau ada parameter ?next=/profile, kita redirect kesana, kalau tidak ke /
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    
    // Tukar kode dengan session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Sukses! Redirect user masuk
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Kalau gagal, balikin ke login
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}