"use client"

import { useState }  from "react";
import AuthForm from "@/components/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import config from "../../../config";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.baseUrl}/login`, { email, password });
      alert(res.data.message);
      // Optionally store token: localStorage.setItem("token", res.data.token)
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <AuthForm
      isSignup={false}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
    />
  );
}
