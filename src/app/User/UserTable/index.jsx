"use client";
import { useRouter } from "next/navigation";
import { Table, TableHead, Box, TableRow, TableCell, TableBody, Button, Container, CircularProgress } from "@mui/material";

export default function UserTable({ deleteLoading,usersData, onDelete, isLoading }) {
  const router = useRouter();
console.log("deleteloading ,", deleteLoading)
console.log("loading ,", isLoading)

  return (
    <Container>
      <Box py={4}>
        {isLoading || deleteLoading? (
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
              {usersData && usersData?.users.map((user, key) => (
                <TableRow key={user.user_id}>
                  <TableCell>{key+1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>
                    <Button onClick={() => {console.log("clicked");router.push(`/User/edit-user/${user.user_id}`)}}>Edit</Button>
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
