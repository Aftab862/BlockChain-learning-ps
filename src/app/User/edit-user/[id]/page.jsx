"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import config from './../../../../../config';
import UserForm from './../../../../components/UserForm';
import { useEditUserMutation } from "@/store/slices/user";

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();
  const [editUser, { isLoading, isError, error }] = useEditUserMutation();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`${config.baseUrl}/get-users`).then((res) => {
        const user = res.data.users.find((u) => u.user_id === Number(id));
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone);
          setCity(user.city);
          setGender(user.gender);
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedUser = {
     id: parseInt(id),
      name,
      email,
      phone,
      city,
      gender,
    }

  try {
    await editUser(updatedUser).unwrap();  // Update user
    router.push("/"); // Redirect to homepage
  } catch (err) {
    console.error("Error updating user:", err);
  }
    router.push("/");
  };

  return (
    <UserForm
      name={name}
      email={email}
      phone={phone}
      city={city}
      gender={gender}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      setCity={setCity}
      setGender={setGender}
      onSubmit={handleSubmit}
    />
  );
}
