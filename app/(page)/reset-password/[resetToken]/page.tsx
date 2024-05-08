"use client";
// Import useState and useRouter
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { post } from "@/lib/http"; // Assuming you have a post function for making HTTP requests
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = params.resetToken;

  const handleResetPassword = async () => {
    try {
      // Perform password validation here
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        setSuccessMessage("");
        return;
      }

      // Extract token from the URL query parameters

      // Make API call to reset password with the token
      const response = await post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/reset-password`,
        { newPassword, token },
      );

      if (response.status >= 200 && response.status < 300) {
        setSuccessMessage("Password reset successful.");
        setError("");
        // Redirect to login page after successful password reset
        router.push("/login");
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
        <h1 className="mb-4 text-center text-2xl font-bold">Reset Password</h1>
        <div className="mb-4">
          {successMessage && (
            <p className="mb-4 text-green-500">{successMessage}</p>
          )}
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
    </div>
  );
}
