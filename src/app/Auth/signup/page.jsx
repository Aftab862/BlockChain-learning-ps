"use client"
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import config from './../../../../config';


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.baseUrl}/signup`, { name, email, password });
      alert(res.data.message);
      router.push("/Auth/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <AuthForm
      isSignup={true}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSignup}
    />
  );
}

