"use client";
import { useRouter } from "next/navigation";
import { Table, TableHead, Box, TableRow, TableCell, TableBody, Button, Container ,CircularProgress } from "@mui/material";

export default function UserTable({ usersData, onDelete ,isLoading }) {
  const router = useRouter();

  return (
    <Container>
      <Box py={4}>
        {isLoading ? (
  <Box display="flex" justifyContent="center" alignItems="center" height="300px">
    <CircularProgress />
  </Box>
) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
               <TableCell>Gender</TableCell>     
              <TableCell>Email</TableCell>
               <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData && usersData?.users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.name}</TableCell>
                 <TableCell>{user.gender}</TableCell>
                <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                   <TableCell>{user.city}</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/User/edit-user/${user.user_id}`)}>Edit</Button>
                  <Button color="error" onClick={() => onDelete(user.user_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
)}
      </Box>
    </Container>

  );
}
