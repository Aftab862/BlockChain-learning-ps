"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Box, Typography, Stack, Card, CardContent, Grid, Divider } from "@mui/material";
import useMetaMask from "@/hooks/useMetaMask";
import Cookies from "js-cookie";
import { Wallet } from "@mui/icons-material";

export default function UserDashboard() {
  const router = useRouter();
  const { account, connectWallet } = useMetaMask();

  return (
    <Box sx={{ bgcolor: "#f5f7fa", py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Card sx={{ p: 5, bgcolor: "#1976d2", color: "white", mb: 5, borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            👋 Welcome Back!
          </Typography>
          <Typography variant="h6">
            Manage your wallet, stay connected, and start chatting securely with Web3 users.
          </Typography>
          <Stack direction="row" spacing={2} mt={4}>
            {!account && (
              <Button variant="contained" onClick={connectWallet} sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                Connect MetaMask
              </Button>
            )}
            <Button
              variant="outlined"
              sx={{ borderColor: "#fff", color: "#fff" }}
              onClick={() => router.push(`/User/chat-box/${Cookies.get("user-id")}`)}
            >
              Open Chat
            </Button>
          </Stack>
        </Card>

        {/* Dashboard Overview */}
        <Grid container spacing={3}>
          {account && (
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, bgcolor: "#fff", boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Wallet sx={{ verticalAlign: "middle", mr: 1 }} />
                    Wallet Status
                  </Typography>
                  <Typography variant="body1">✅ Connected: {account}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="outlined" onClick={() => router.push("/User/chat-box/" + Cookies.get("user-id"))}>
                    💬 Go to Chat
                  </Button>
                  <Button variant="outlined" onClick={connectWallet}>
                    🔗 {account ? "Reconnect Wallet" : "Connect Wallet"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity or Placeholder Section */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>📋 Recent Activity</Typography>
                <Typography variant="body2" color="text.secondary">No recent activity to display. Interact to see updates.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


      </Container>
    </Box>
  );
}
