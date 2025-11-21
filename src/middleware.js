import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Buat response dulu
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Inisialisasi Supabase client DI SINI (di middleware)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          // Ambil cookies dari request
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // Saat set, kita harus update request DAN response
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          // Saat remove, kita harus update request DAN response
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // WAJIB: Refresh session. Ini yang akan menjaga user tetap login
  // Ini juga yang akan membuat session-mu terbaca di Navbar
  await supabase.auth.getSession()

  // Kembalikan response yang sudah di-update
  return response
}

// Config matcher (Jalankan di semua halaman)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}