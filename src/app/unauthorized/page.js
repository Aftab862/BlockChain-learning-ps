"use client";
import { Container, Box, Typography, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {

  const router = useRouter();
  const handleGoHome = () => {
    router.push("/"); // or "/admin" if needed
  };

  return (
    <Container maxWidth="sm"> 
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <BlockIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom color="error">
          Unauthorized Access
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You do not have permission to view this page.
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
        >
          Go to Dashboard
        </Button> */}
      </Box>
    </Container>
  );
}
