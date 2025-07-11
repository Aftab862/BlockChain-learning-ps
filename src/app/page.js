"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import { Button, Container, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useMetaMask from "@/hooks/useMetaMask";
import config from "../../config";
import { useGetUsersQuery } from '../store/slices/user';


export default function Home() {
  const router = useRouter();
  const { account, connectWallet } = useMetaMask();
 const { data: usersData, error, isLoading } = useGetUsersQuery();
 console.log("data stores", usersData)
 
   const deleteUser = async (id) => {
    await axios.delete(`${config.baseUrl}/delete-user/${id}`);
  };

 

  return (
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


        <UserTable usersData={usersData} isLoading={isLoading} onDelete={deleteUser} />
      </Box>

    </Container>
  );
}
