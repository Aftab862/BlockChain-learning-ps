"use client";
import { Button, TextField, Stack, Box, Typography } from "@mui/material";

export default function UserForm({
  name,
  email,
  phone,
  city,
  gender,
  setName,
  setEmail,
  setPhone,
  setCity,
  setGender,
  onSubmit,
}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <form onSubmit={onSubmit}>
        <Typography my={3} variant="h5" textAlign="center">User Form</Typography>
        <Stack spacing={2} width={500}>
          <TextField label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Email" size="small" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Phone" size="small" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField label="City" size="small" value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField label="Gender" size="small" value={gender} onChange={(e) => setGender(e.target.value)} />
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
}
