"use client"

import { useState } from "react"
import Cookies from "js-cookie";
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

      console.log("response ", res)
      const { token, id, role } = res
      console.log("response ", res)

      debugger
      if (!token) {
        alert("Login failed: No token returned.")
        return
      }

      Cookies.set("auth-token", token, {
        path: "/", // required for middleware
        secure: true, // optional but good for production (HTTPS only)
        sameSite: "Lax",
      })

      Cookies.set("user-role", role, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      })

         Cookies.set("user-id", id, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      })

      if (role === "admin") {
        router.push("/admin/user-listing")

      }
      else {
        router.push("/")

      }

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
