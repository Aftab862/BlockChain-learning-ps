// app/layout.js or layout.tsx
import "./globals.css";
import { CssBaseline, Container } from "@mui/material";
import Providers from "./Providers"; // should include ThemeProvider, Redux, etc.
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Your App Title",
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CssBaseline />
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 3 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
