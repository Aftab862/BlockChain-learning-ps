"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./User/UserTable";
import { Button, Container, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import useMetaMask from "@/hooks/useMetaMask";
import config from "../../config";
import { useDeleteUserMutation, useGetUsersQuery } from '../store/slices/user';


export default function Home() {
  const router = useRouter();
  const { account, connectWallet } = useMetaMask();
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  console.log("data stores", usersData)

  const [deleteUser, { deleteLoading = isLoading, isError }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log("error", error.message)
    }
  };

  const handleLogout = () => {
    // Clear token or user data from storage
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-role");

    router.push("/Auth/login");
  };



  return (
    <>

      <AppBar position="static" >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">User Dashboard</Typography>
          <Button color="white" sx={{ textTransform: "none" }}
            variant="outlined"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ py: 5 }}>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Users</h1>
            <Button variant="contained" onClick={() => router.push("/User/create-user")}>Add User</Button>
          </Box>

          <Box py={5}>
            {account ? (
              <Typography variant="h6">Connected: {account}</Typography>
            ) : (
              <Button variant="contained" onClick={connectWallet}>
                Connect MetaMask
              </Button>
            )}
          </Box>


          <UserTable usersData={usersData} isLoading={isLoading} deleteLoading={deleteLoading} onDelete={handleDelete} />
        </Box>

      </Container>
    </>
  );
}
