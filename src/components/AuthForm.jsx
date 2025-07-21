
"use client";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import NextLink from 'next/link';
import Link from '@mui/material/Link';

export default function AuthForm({ isSignup, name, setName, email, setEmail, password, setPassword, onSubmit, isLoading }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <form onSubmit={onSubmit}>
        <Typography my={3} variant="h5" textAlign="center">
          {isSignup ? "Signup" : "Login"} Form
        </Typography>
        <Stack spacing={2} width={400}>
          {isSignup && (
            <TextField
              label="Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading
              ? isSignup
                ? "Signing up..."
                : "Logging in..."
              : isSignup
                ? "Signup"
                : "Login"}
          </Button>


          <Link component={NextLink} href={isSignup ? "/Auth/login" : "/Auth/signup"} sx={{ textAlign: "center" }}>
            {isSignup ? "Login" : "Signup"}
          </Link>
        </Stack>
      </form>

    </Box>
  );
}
