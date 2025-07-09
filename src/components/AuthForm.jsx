
"use client";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function AuthForm({ isSignup, name, setName, email, setEmail, password, setPassword, onSubmit }) {
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
          <Button type="submit" variant="contained">
            {isSignup ? "Signup" : "Login"}
          </Button>

          <Link href="/signup" sx={{ textAlign:"center" }}>
            Signup
          </Link>
        </Stack>
      </form>

    </Box>
  );
}
