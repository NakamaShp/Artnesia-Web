'use client';

import * as React from 'react';
// ⭐️ PERUBAHAN 1: Impor 'createClient' dan 'useState' (jika belum ada)
import { createClient } from '@/lib/supabase/client';
// ------------------------------------------------------------------
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
import AppTheme from '@/theme/AppTheme';
import ColorModeSelect from '@/theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';

// ... (Kode 'Card' dan 'SignInContainer' Anda tidak berubah) ...
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // ⭐️ PERUBAHAN 2: Tambah state untuk feedback & inisialisasi Supabase
  const [message, setMessage] = React.useState('');
  const supabase = createClient();
  // --------------------------------------------------------------------

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ⭐️ PERUBAHAN 3: Modifikasi 'handleSubmit' untuk Sign In
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Selalu cegah default

    // Jalankan validasi Anda
    if (!validateInputs()) {
      return; // Berhenti jika tidak valid
    }

    setMessage(''); // Bersihkan pesan lama
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    setMessage('Signing in...');
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign in successful! Redirecting...');
      // Arahkan ke dashboard setelah berhasil
      window.location.href = '/dashboard';
    }
  };
  // --------------------------------------------------------------------

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  // ⭐️ PERUBAHAN 4: Tambah fungsi 'handleGoogleLogin'
  const handleGoogleLogin = async () => {
    setMessage('Loading...');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit} // 'handleSubmit' sekarang menangani Sign In
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus // 'autoFocus' ada di kedua field, Anda mungkin ingin menghapus salah satu
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            
            {/* ⭐️ PERUBAHAN 6: Tampilkan pesan feedback */}
            {message && (
              <Typography
                color={message.startsWith('Error') ? 'error' : 'primary'}
                sx={{ textAlign: 'center', fontWeight: 500 }}
              >
                {message}
              </Typography>
            )}
            {/* ------------------------------------------- */}
            
            <ForgotPassword open={open} handleClose={handleClose} />
            
            {/* ⭐️ PERUBAHAN 7: Hapus 'onClick' dari tombol Sign In */}
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            {/* ------------------------------------------- */}

            <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'center' }}>
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            {/* ⭐️ PERUBAHAN 8: Hubungkan 'handleGoogleLogin' */}
            <Button fullWidth variant="outlined" onClick={handleGoogleLogin} startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            {/* ------------------------------------------- */}

            <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Facebook')} startIcon={<FacebookIcon />}>
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              
              {/* ⭐️ PERUBAHAN 9: Hubungkan 'handleSignUp' */}
              <Link
                component={NextLink} // Ubah jadi 'button'
                type="button"
                href="/SignUp" // Panggil fungsi sign up
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
              {/* ------------------------------------------- */}
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}