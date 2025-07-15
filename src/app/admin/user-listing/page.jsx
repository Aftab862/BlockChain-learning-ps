'use client';

import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  CircularProgress,
  Box
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useGetUsersListingQuery } from "@/store/slices/admin";

export default function AdminUserListing() {
  const { data: usersData, error, isLoading } = useGetUsersListingQuery();
  const router = useRouter();

  const handleLogout = () => {
    // Clear token or user data from storage
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-role");

    router.push("/Auth/login");
  };

  const onDelete = (id) => {
    // Add delete functionality here
    console.log("Delete user:", id);
  };




  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="static" >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin Dashboard</Typography>
         <Button color="white" sx={{textTransform:"none"}}
           variant="outlined"
            onClick={()=>handleLogout()}            
         >
          Logout
         </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h4" gutterBottom>User Listings</Typography>

          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData?.users?.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        // onClick={() => router.push(`/User/edit-user/${user.user_id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Container>
    </>
  );
}
