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

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
 

  try {
    const response = await axios.post(`${config.baseUrl}/login`, {
      email,
      password,
    });
    const { token, message } = response.data;

    if (!token) {
      alert("Login failed: No token returned.");
      return;
    }

    // Store token (consider using a constant key)
    localStorage.setItem("auth-token", token);

    // Optional: log success
    console.log("Login successful:", message);

    // Redirect to home page
    router.push("/");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "User Not Found. Please try again.";
    console.error("Login error:", errorMessage);
    alert(errorMessage);
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
