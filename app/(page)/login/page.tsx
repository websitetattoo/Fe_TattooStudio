"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { post } from "@/lib/http";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
        { email, password },
      );
      if (response.status >= 200 && response.status < 300) {
        Cookies.set("isLoggedIn", "true");
        console.log("Login successful");
        // Chuyển hướng sau khi đăng nhập thành công
        router.push("/backend");
      } else {
        // Handle error if response is not ok
        const errorMessage = await response.toString();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setEmail("");
      setPassword("");
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm rounded-md bg-white p-8 shadow-2xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
        <p className="mb-4 text-center">
          Enter your admin email and password to login to the admin page.
        </p>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-400"
            />
          </div>
          <Button className="w-full" type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
