"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Container, Box } from "@mui/material";
import config from './../../../../config';
import UserForm from './../../../components/UserForm';
import {useAddUserMutation} from "../../../store/slices/user"
export default function CreateUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
const [addUser, { isLoading, isError, error }] = useAddUserMutation();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   
   await addUser({ name,
      email,
      phone,
      city,
      gender}).unwrap();
      router.push("/");
  };

  return (
    <Container>
      <Box sx={{ p: 5 }}>
        <UserForm name={name}
          email={email}
          phone={phone}
          city={city}
          gender={gender}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setCity={setCity}
          setGender={setGender}
          onSubmit={handleSubmit} />
      </Box>
    </Container>
  )
}
