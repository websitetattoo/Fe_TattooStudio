"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/http";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/forgot-password`,
        { email },
      );
      if (response.status >= 200 && response.status < 300) {
        setSuccessMessage("Password reset link sent to your email.");
        setError("");
      } else {
        const errorMessage = await response.toString();
        setError(errorMessage);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to reset password. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm rounded-md bg-white p-8 shadow-2xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Forgot Password</h1>
        <p className="mb-4 text-center">
          Enter your email to receive a password reset link.
        </p>
        {successMessage && (
          <p className="mb-4 text-green-500">{successMessage}</p>
        )}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-400"
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
}
