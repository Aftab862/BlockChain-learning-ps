"use client"

import { useState } from "react"
import AuthForm from "@/components/AuthForm"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "../../../store/slices/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [login, { isLoading, error }] = useLoginMutation()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please enter both email and password.")
      return
    }

    try {
      const res = await login({ email, password }).unwrap() // <-- RTK Query call

      const { token, message, role } = res

      if (!token) {
        alert("Login failed: No token returned.")
        return
      }

      // ✅ Store auth data
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-role", role)

      console.log("Login successful:", message)

      // ✅ Redirect
      router.push("/")
    } catch (err) {
      const errorMessage =
        err?.data?.error || "User Not Found. Please try again."
      console.error("Login error:", errorMessage)
      alert(errorMessage)
    }
  }

  return (
    <AuthForm
      isSignup={false}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  )
}
