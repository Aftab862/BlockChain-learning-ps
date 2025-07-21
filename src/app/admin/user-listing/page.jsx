'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Divider,
} from '@mui/material';
import { useGetUsersListingQuery } from '@/store/slices/admin';

export default function AdminDashboard() {
  const { data: usersData, error, isLoading } = useGetUsersListingQuery();
  const router = useRouter();

  const totalUsers = usersData?.users?.length || 0;
  const totalAdmins = usersData?.users?.filter((u) => u.role === 'admin').length || 0;
  const totalRegularUsers = totalUsers - totalAdmins;

  return (
    <Box sx={{ py: 5, backgroundColor: '#f5f7fa', }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Admin Dashboard
        </Typography>

        {/* Analytics Summary
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderLeft: '5px solid #1976d2', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Users
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderLeft: '5px solid #43a047', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Admins
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalAdmins}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderLeft: '5px solid #ff9800', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Regular Users
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {totalRegularUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* Divider */}
        <Divider sx={{ mb: 4 }} />

        {/* User Table */}
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>
            User Listing
          </Typography>
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData?.users?.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          bgcolor: user.role === 'admin' ? '#1976d2' : '#e0e0e0',
                          color: user.role === 'admin' ? 'white' : 'black',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        }}
                      >
                        {user.role}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ bgcolor: '#1976d2' }}
                        onClick={() => router.push(`/admin/chat/${user.id}`)}
                      >
                        Chat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>


      </Container>
    </Box>
  );
}
